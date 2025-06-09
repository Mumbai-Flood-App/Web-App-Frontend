// src/components/ClientLayout.tsx
"use client";
import { useState } from "react";
import HeadBanner from "./HeadBanner";
import Sidebar from "./Sidebar/Sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <HeadBanner sidebarOpen={isSidebarOpen} />
      <div className="flex min-h-screen w-screen overflow-hidden">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden lg:block h-screen z-10">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
        {children}
      </div>
    </>
  );
}