// src/components/Sidebar.tsx
"use client";
import { useState } from "react";
import SidebarOpen from "./SidebarOpen";
import SidebarClosed from "./SidebarClosed";

type SidebarProps = {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
};

export default function Sidebar(props: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(true);
  const isOpen = props.isOpen !== undefined ? props.isOpen : internalOpen;
  const setIsOpen = props.setIsOpen || setInternalOpen;

  return isOpen ? (
    <SidebarOpen onToggle={() => setIsOpen(false)} />
  ) : (
    <SidebarClosed onToggle={() => setIsOpen(true)} />
  );
}