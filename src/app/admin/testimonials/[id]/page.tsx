"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import {
  TestimonialForm,
  type TestimonialData,
} from "@/components/admin/testimonial-form";

export default function EditTestimonialPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<TestimonialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "testimonials", params.id));
      if (snap.exists()) setData(snap.data() as TestimonialData);
      setLoading(false);
    }
    load();
  }, [params.id]);

  async function handleSubmit(updated: TestimonialData) {
    await updateDoc(doc(db, "testimonials", params.id), { ...updated });
    router.push("/admin/testimonials");
  }

  async function handleDelete() {
    if (!confirm("Delete this testimonial?")) return;
    await deleteDoc(doc(db, "testimonials", params.id));
    router.push("/admin/testimonials");
  }

  if (loading) return <p className="text-fg-muted">Loading…</p>;
  if (!data) return <p className="text-fg-muted">Not found.</p>;

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-bold text-fg">
        Edit testimonial
      </h1>
      <div className="mt-6">
        <TestimonialForm
          initial={data}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
