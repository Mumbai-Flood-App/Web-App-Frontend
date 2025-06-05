// src/app/layout.tsx
import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import MobileNav from "@/components/MobileNav/MobileNav";

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
        <div className="flex min-h-screen">
          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          
          {/* Main content */}
          <main className="flex-1 p-4 lg:p-8">
            {children}
          </main>

          {/* Mobile Navigation - shown only on mobile */}
          <MobileNav />
        </div>
      </body>
    </html>
  );
}