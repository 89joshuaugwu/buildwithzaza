import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { getBrandAssets } from "@/lib/data/get-brand";
import "./globals.css";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandAssets();
  return { title: "buildwithzaza | Joshua Ugwu — Product engineer, Enugu NG", description: "Joshua Ugwu is a product-minded software engineer building useful platforms for the Nigerian market.", icons: brand.faviconUrl ? { icon: brand.faviconUrl } : undefined };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const brand = await getBrandAssets();
  return <html lang="en" suppressHydrationWarning><body className="bg-bg text-fg antialiased"><ThemeProvider attribute="class" defaultTheme="system" enableSystem><Nav logoUrl={brand.logoUrl} />{children}</ThemeProvider></body></html>;
}
