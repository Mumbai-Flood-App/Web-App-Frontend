// src/components/ClientLayout.tsx
"use client";
import { useState } from "react";
import HeadBanner from "./HeadBanner";
import Sidebar from "./Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import PlotContainer from "./Rainfall/PlotContainer";
import { StationProvider } from "../contexts/StationContext";
import WaterLevelPlotContainer from './WaterLevel/WaterLevelPlotContainer';
import { WaterLevelStationProvider } from "../contexts/WaterLevelStationContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const showBanner = !pathname.startsWith("/about") && !pathname.startsWith("/reported-floods");

  return (
    <>
      {showBanner && <HeadBanner sidebarOpen={isSidebarOpen} />}
      <div className="flex min-h-screen w-screen md:overflow-hidden">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden lg:block h-screen z-10">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
        {/* For rainfall and water-level pages, render the appropriate PlotContainer in the sidebar */}
        {(pathname === "/" || pathname === "/rainfall") ? (
          <StationProvider>
            <div className="hidden md:block">
              <PlotContainer sidebarOpen={isSidebarOpen} />
            </div>
            {children}
          </StationProvider>
        ) : pathname === "/water-level" ? (
          <WaterLevelStationProvider>
            <>
              <div className="hidden md:block">
                <WaterLevelPlotContainer sidebarOpen={isSidebarOpen} />
              </div>
              {children}
            </>
          </WaterLevelStationProvider>
        ) : (
          children
        )}
      </div>
    </>
  );
}