import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";
import TopLoadingBarProvider from "@/components/layout/TopLoadingBarProvider";
import "github-markdown-css/github-markdown-light.css";
import { Suspense } from "react";
import { getLastUpdated } from "@/lib/getLastUpdated";
import { ppMori } from "@/app/fonts/fonts";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "kylezhao101",
  description: "Kyle's Portfolio site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lastUpdated = getLastUpdated();

  return (
    <html lang="en">
      <body className={ppMori.className}>
        <Navbar />

        <Suspense fallback={null}>
          <TopLoadingBarProvider>
            <div className="w-full">{children}</div>
          </TopLoadingBarProvider>
        </Suspense>

        <Separator />
        <Footer lastUpdated={lastUpdated} />
      </body>
    </html>
  );
}