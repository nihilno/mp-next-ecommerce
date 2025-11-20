import Footer from "@/components/global/Footer";
import Navbar from "@/components/navbar/Navbar";
import Providers from "@/components/providers/providers";
import { inter } from "@/lib/fonts";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Next Ecommerce",
    default: "Home | Next Ecommerce",
  },
  description:
    "An ecommerce website built with Next.js, TypeScript, and Prisma.",
  openGraph: {
    title: "Next Ecommerce",
    description:
      "An ecommerce website built with Next.js, TypeScript, and Prisma.",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "Next Ecommerce",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
        <body
          className={`${inter.className} flex min-h-dvh flex-col antialiased`}
        >
          <Providers>
            <Navbar />
            <main className="container mx-auto flex-1 px-4 py-6">
              {children}
            </main>
            <Footer />
          </Providers>
        </body>
      </html>
    </Suspense>
  );
}
