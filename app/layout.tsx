import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { getBrandAssets } from "@/lib/data/get-brand";
import "./globals.css";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandAssets();
  const faviconSize = Math.round(128 * ((brand.faviconScale ?? 100) / 100));
  const faviconUrl = brand.faviconUrl ? brand.faviconUrl.replace("/upload/", `/upload/c_fill,w_${faviconSize},h_${faviconSize},g_auto/c_pad,w_128,h_128,b_transparent,r_${brand.faviconRadius ?? 16}/`) : undefined;
  return { title: "buildwithzaza | Joshua Ugwu — Product engineer, Enugu NG", description: "Joshua Ugwu is a product-minded software engineer building useful platforms for the Nigerian market.", icons: faviconUrl ? { icon: faviconUrl } : undefined };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const brand = await getBrandAssets();
  return <html lang="en" suppressHydrationWarning><body className="bg-bg text-fg antialiased"><ThemeProvider attribute="class" defaultTheme="system" enableSystem><Nav logoUrl={brand.logoUrl} logoScale={brand.logoScale} logoRadius={brand.logoRadius} />{children}</ThemeProvider></body></html>;
}
