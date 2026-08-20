"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";
import { ProductForm, type ProductData } from "@/components/admin/product-form";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "products", params.id));
      if (snap.exists()) setData(snap.data() as ProductData);
      setLoading(false);
    }
    load();
  }, [params.id]);

  async function handleSubmit(updated: ProductData) {
    const { accessCode, ...product } = updated;
    if (product.restricted && accessCode === "" && !data?.restricted) throw new Error("An access code is required for restricted products.");
    await updateDoc(doc(db, "products", params.id), product);
    if (accessCode || product.restricted !== data?.restricted) await fetch("/api/product-access/admin", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${await auth.currentUser?.getIdToken()}` }, body: JSON.stringify({ productId: params.id, accessCode, restricted: product.restricted }) });
    router.push("/admin/products");
  }

  async function handleDelete() {
    if (!confirm("Delete this product? Existing buyers keep their download link either way.")) return;
    await deleteDoc(doc(db, "products", params.id));
    router.push("/admin/products");
  }

  if (loading) return <p className="text-fg-muted">Loading…</p>;
  if (!data) return <p className="text-fg-muted">Not found.</p>;

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-bold text-fg">
        Edit product
      </h1>
      <div className="mt-6">
        <ProductForm initial={data} onSubmit={handleSubmit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
