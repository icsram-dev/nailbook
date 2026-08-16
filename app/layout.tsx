import type { Metadata } from "next";

import AuthSessionProvider from "@/components/providers/SessionProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className="h-full">
      <body className="min-h-screen bg-[#fffdfa] text-stone-800 antialiased">
        <AuthSessionProvider>
          <QueryProvider>
            <Navbar />

            <main>{children}</main>

            <Footer />

            <Toaster position="top-right" richColors closeButton />
          </QueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
