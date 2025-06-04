"use client";
import { useState } from 'react';
import SidebarOpen from './SidebarOpen';
import SidebarClosed from './SidebarClosed';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // default: open

  return isOpen ? (
    <SidebarOpen onToggle={() => setIsOpen(false)} />
  ) : (
    <SidebarClosed onToggle={() => setIsOpen(true)} />
  );
};

export default Sidebar;