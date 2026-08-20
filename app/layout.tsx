import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { getBrandAssets } from "@/lib/data/get-brand";
import "./globals.css";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandAssets();
  // Favicons render on an opaque browser canvas in several browsers. Keep the
  // transformed PNG full-bleed instead of padding a rounded transparent image,
  // which is what caused the visible white halo around the uploaded mark.
  const faviconZoom = Math.round(128 * ((brand.faviconScale ?? 100) / 100));
  const faviconUrl = brand.faviconUrl ? brand.faviconUrl.replace("/upload/", `/upload/c_fill,w_${faviconZoom},h_${faviconZoom},g_auto/r_${brand.faviconRadius ?? 0}/c_fill,w_128,h_128,g_center/f_png/`) : undefined;
  return { title: "buildwithzaza | Joshua Ugwu — Product engineer, Enugu NG", description: "Joshua Ugwu is a product-minded software engineer building useful platforms for the Nigerian market.", icons: faviconUrl ? { icon: faviconUrl } : undefined };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const brand = await getBrandAssets();
  return <html lang="en" suppressHydrationWarning><body className="bg-bg text-fg antialiased"><ThemeProvider attribute="class" defaultTheme="system" enableSystem><Nav logoUrl={brand.logoUrl} logoScale={brand.logoScale} logoRadius={brand.logoRadius} />{children}</ThemeProvider></body></html>;
}
