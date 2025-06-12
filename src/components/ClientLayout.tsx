// src/components/ClientLayout.tsx
"use client";
import { useState } from "react";
import HeadBanner from "./HeadBanner";
import Sidebar from "./Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import PlotContainer from "./Rainfall/PlotContainer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const showBanner = !pathname.startsWith("/about");
  const showPlotContainer = pathname === "/" || pathname === "/rainfall";

  return (
    <>
      {showBanner && <HeadBanner sidebarOpen={isSidebarOpen} />}
      {showPlotContainer && <PlotContainer sidebarOpen={isSidebarOpen} />}
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