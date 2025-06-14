// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileNav from "@/components/MobileNav/MobileNav";
import FooterLogos from "@/components/FooterLogos";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mumbai Flood",
  description: "Mumbai Flood Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0F0F0F] text-white`}>
        <ClientLayout>
          <div className="flex min-h-screen w-screen md:overflow-hidden">
            {/* Main content */}
            <main className="flex-1 w-full md:h-screen md:overflow-hidden">
              {children}
            </main>
            {/* Mobile Navigation - shown only on mobile */}
            <MobileNav />
          </div>
          <FooterLogos />
        </ClientLayout>
      </body>
    </html>
  );
}