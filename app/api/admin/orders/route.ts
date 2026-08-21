import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/admin";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const user = await adminAuth.verifyIdToken(token);
    if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const snapshot = await adminDb.collection("orders").orderBy("createdAt", "desc").limit(100).get();
    const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate?.().toISOString() ?? null })) as Array<{ id: string; amount?: number; status?: string; [key: string]: unknown }>;
    const revenue = orders.reduce((sum, order) => sum + (typeof order.amount === "number" ? order.amount : 0), 0);
    return NextResponse.json({ orders, revenue, paidOrders: orders.filter((order) => order.status === "paid").length });
  } catch (error) { console.error("Admin orders error", error); return NextResponse.json({ error: "Could not load orders" }, { status: 500 }); }
}
