"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { AdminNav } from "@/components/admin/admin-nav";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // undefined = still checking, null = confirmed signed out / not admin
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && u.email !== ADMIN_EMAIL) {
        // Signed in with Google or email/password successfully, but it's
        // not the one allowed account — doesn't matter which method got
        // them this far, they're not getting further than this.
        signOut(auth);
        setUser(null);
        return;
      }
      setUser(u);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (user === undefined) return;
    if (!user && !isLoginPage) router.replace("/admin/login");
    if (user && isLoginPage) router.replace("/admin");
  }, [user, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-sm text-fg-muted">
        Checking access…
      </div>
    );
  }

  if (!user) {
    return null; // redirecting to /admin/login
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg sm:flex-row">
      <AdminNav />
      <div className="flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</div>
    </div>
  );
}
