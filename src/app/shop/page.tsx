"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { CheckCircle2, Download } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, "products"));
        setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product));
      } catch {
        // Firestore not configured yet, or rules not published — fail quiet.
      } finally {
        setLoaded(true);
      }
    }
    load();
  }, []);

  function startCheckout(product: Product) {
    setActiveProduct(product);
    setDownloadUrl(null);
    setBuyerEmail("");
    setError("");
  }

  function pay() {
    if (!activeProduct || !buyerEmail.trim()) {
      setError("Enter your email to continue.");
      return;
    }
    if (!window.PaystackPop) {
      setError("Payment isn't ready yet — give it a second and try again.");
      return;
    }

    window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: buyerEmail.trim(),
      amount: Math.round(activeProduct.price * 100),
      currency: "NGN",
      metadata: { productId: activeProduct.id },
      callback: (response) => {
        verify(response.reference);
      },
      onClose: () => {},
    }).openIframe();
  }

  async function verify(reference: string) {
    setVerifying(true);
    setError("");
    try {
      const res = await fetch("/api/paystack/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Verification failed");
      }
      setDownloadUrl(data.downloadUrl);
    } catch {
      setError(
        "Payment went through but verification failed — email me the reference and I'll sort it manually."
      );
    } finally {
      setVerifying(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />

      <p className="font-mono text-xs uppercase tracking-widest text-gold">
        Shop
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-fg sm:text-5xl">
        Templates &amp; starter kits
      </h1>
      <p className="mt-3 max-w-xl text-fg-muted">
        Production-ready code from projects I&apos;ve actually shipped —
        download it, open it, build on it.
      </p>

      {loaded && products.length === 0 && (
        <div className="mt-16 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="font-display text-lg font-semibold text-fg">
            Shop opening soon
          </p>
          <p className="mt-2 text-sm text-fg-muted">
            First templates are on the way. Check back shortly, or{" "}
            <a href="/hire" className="text-accent hover:underline">
              tell me what you need
            </a>
            .
          </p>
        </div>
      )}

      {products.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6"
            >
              <h2 className="font-display text-lg font-bold text-fg">
                {product.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-fg-muted">
                {product.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-lg font-bold text-fg">
                  ₦{product.price.toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => startCheckout(product)}
                  className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.03]"
                >
                  Buy now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-surface p-6">
            {downloadUrl ? (
              <div className="text-center">
                <CheckCircle2 size={36} className="mx-auto text-ok" />
                <h3 className="mt-3 font-display text-lg font-bold text-fg">
                  Payment confirmed
                </h3>
                <a
                  href={downloadUrl}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg"
                >
                  <Download size={16} /> Download {activeProduct.title}
                </a>
                <button
                  type="button"
                  onClick={() => setActiveProduct(null)}
                  className="mt-4 block w-full text-sm text-fg-muted hover:text-fg"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-lg font-bold text-fg">
                  {activeProduct.title}
                </h3>
                <p className="mt-1 font-mono text-sm text-fg-muted">
                  ₦{activeProduct.price.toLocaleString()}
                </p>
                <label className="mt-4 block text-sm font-semibold text-fg">
                  Your email
                </label>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg outline-none focus:border-accent"
                />
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                <button
                  type="button"
                  onClick={pay}
                  disabled={verifying}
                  className="mt-4 w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg disabled:opacity-60"
                >
                  {verifying ? "Verifying..." : "Pay now"}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveProduct(null)}
                  className="mt-2 block w-full text-sm text-fg-muted hover:text-fg"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
