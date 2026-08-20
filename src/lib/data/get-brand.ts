import { adminDb } from "@/lib/firebase/admin";

export interface BrandAssets {
  logoUrl?: string;
  faviconUrl?: string;
  resumeUrl?: string;
  logoScale?: number;
  logoRadius?: number;
  bio?: string;
  currentlyBuilding?: string;
  buildLog?: { cmd: string; status: "live" | "shipping"; detail: string }[];
}

export async function getBrandAssets(): Promise<BrandAssets> {
  try {
    const snapshot = await adminDb.collection("profile").doc("main").get();
    if (!snapshot.exists) return {};
    const data = snapshot.data();
    return { logoUrl: data?.logoUrl, faviconUrl: data?.faviconUrl, resumeUrl: data?.resumeUrl, logoScale: data?.logoScale, logoRadius: data?.logoRadius, bio: data?.bio, currentlyBuilding: data?.currentlyBuilding, buildLog: data?.buildLog };
  } catch {
    return {};
  }
}
