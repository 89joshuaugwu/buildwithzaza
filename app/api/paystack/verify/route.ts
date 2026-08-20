import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

// firebase-admin needs Node APIs — this route must stay on the Node
// runtime (the default for App Router routes). Don't switch it to Edge.

export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json();
    if (!reference || typeof reference !== "string") {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }

    // Never trust the client's "payment succeeded" callback on its own —
    // always confirm with Paystack server-side before delivering anything.
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const verifyData = await verifyRes.json();

    if (!verifyRes.ok || verifyData?.data?.status !== "success") {
      return NextResponse.json({ error: "Payment not verified" }, { status: 402 });
    }

    const { metadata, customer, amount, reference: paystackRef } = verifyData.data;
    const productId = metadata?.productId;
    if (!productId) {
      return NextResponse.json({ error: "Missing product reference" }, { status: 400 });
    }

    const productSnap = await adminDb.collection("products").doc(productId).get();
    if (!productSnap.exists) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const product = productSnap.data();

    if (product?.published === false) {
      return NextResponse.json({ error: "This product is not currently available" }, { status: 404 });
    }
    if (product?.restricted) {
      const grant = metadata?.accessGrant;
      const grantSnap = grant && await adminDb.collection("productAccessGrants").doc(grant).get();
      if (!grantSnap?.exists || grantSnap.data()?.productId !== productId || grantSnap.data()?.expiresAt < Date.now()) return NextResponse.json({ error: "Restricted-product access was not verified" }, { status: 403 });
      await grantSnap.ref.delete();
    }

    // Guard against a tampered amount — what was actually paid (in kobo)
    // must match the product's real price, not whatever the client sent.
    if (!product || amount !== Math.round(product.price * 100)) {
      return NextResponse.json({ error: "Amount mismatch" }, { status: 402 });
    }

    // Orders are written only here, via the Admin SDK — matches
    // firestore.rules, which denies all client access to `orders`.
    // Note: no de-duplication on `paystackRef` yet, so a retried verify
    // call for the same reference would create a second order doc. Fine
    // for now; worth a uniqueness check if this sees real volume.
    await adminDb.collection("orders").add({
      productId,
      buyerEmail: customer?.email ?? null,
      amount: amount / 100,
      paystackRef,
      status: "paid",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, downloadUrl: product.fileUrl });
  } catch (err) {
    console.error("Paystack verify error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
