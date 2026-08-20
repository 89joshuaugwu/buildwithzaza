"use client";

import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase/client";
import { ProductForm, type ProductData } from "@/components/admin/product-form";

export default function NewProductPage() {
  const router = useRouter();

  async function handleSubmit(data: ProductData) {
    const { accessCode, ...product } = data;
    if (product.restricted && !accessCode) throw new Error("An access code is required for restricted products.");
    const ref = await addDoc(collection(db, "products"), product);
    if (accessCode) await fetch("/api/product-access/admin", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${await auth.currentUser?.getIdToken()}` }, body: JSON.stringify({ productId: ref.id, accessCode, restricted: product.restricted }) });
    router.push("/admin/products");
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-bold text-fg">
        New product
      </h1>
      <div className="mt-6">
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
