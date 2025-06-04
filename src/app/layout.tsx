// src/app/layout.tsx
import React, { ReactNode } from "react";
import Sidebar from '@/components/Sidebar/Sidebar';
import './globals.css'; // if you have global styles

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}