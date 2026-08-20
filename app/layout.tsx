import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "buildwithzaza | Joshua Ugwu — Product engineer, Enugu NG",
  description: "Joshua Ugwu is a product-minded software engineer building useful platforms for the Nigerian market.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className="bg-bg text-fg antialiased"><ThemeProvider attribute="class" defaultTheme="system" enableSystem><Nav />{children}</ThemeProvider></body></html>;
}
