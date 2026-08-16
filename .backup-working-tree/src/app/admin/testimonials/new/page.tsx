"use client";

import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase/client";
import {
  TestimonialForm,
  type TestimonialData,
} from "@/components/admin/testimonial-form";

export default function NewTestimonialPage() {
  const router = useRouter();

  async function handleSubmit(data: TestimonialData) {
    await addDoc(collection(db, "testimonials"), data);
    router.push("/admin/testimonials");
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-bold text-fg">
        New testimonial
      </h1>
      <div className="mt-6">
        <TestimonialForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
