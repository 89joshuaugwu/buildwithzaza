"use client";

import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase/client";
import { ProductForm, type ProductData } from "@/components/admin/product-form";

export default function NewProductPage() {
  const router = useRouter();

  async function handleSubmit(data: ProductData) {
    await addDoc(collection(db, "products"), data);
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
