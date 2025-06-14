'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Import your icons
import RainfallIcon from '../Sidebar/RainfallIcon';
import FloodModelIcon from '../Sidebar/FloodModelIcon';
import WaterLevelIcon from '../Sidebar/WaterLevelIcon';
import RailwayIcon from '../Sidebar/RailwayIcon';
import FloodReportIcon from '../Sidebar/FloodReportIcon';
import InfoIcon from '../Sidebar/InfoIcon';
import LanguageIcon from '../Sidebar/LanguageIcon';

const navItems = [
  { href: '/', label: 'Rainfall', icon: RainfallIcon },
  { href: '/flood-model', label: 'Flood Model', icon: FloodModelIcon },
  { href: '/water-level', label: 'Water Level', icon: WaterLevelIcon },
  { href: '/transport-stress', label: 'Transport Stress', icon: RailwayIcon },
  { href: '/reported-floods', label: 'Reported Floods', icon: FloodReportIcon },
  { href: '/about', label: 'About', icon: InfoIcon },
  { href: '/language', label: 'Language', icon: LanguageIcon },
];

const mobileLogos = [
  { src: "/img/iitb.svg", alt: "IIT Bombay" },
  { src: "/img/ccs.svg", alt: "CCS" },
  { src: "/img/imd.svg", alt: "IMD" },
  { src: "/img/bmc.svg", alt: "BMC" },
  { src: "/img/hdfc.svg", alt: "HDFC Ergo" },
  { src: "/img/partner-vector.svg", alt: "Partner Vector" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element).closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  // Prevent body scroll when dropdown is open
  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDropdownOpen]);

  return (
    <div className="lg:hidden">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black border-b border-[#2D2D2D] z-[300]">
        <div className="h-full flex justify-between items-center px-4">
          {/* Logos left of title */}
          <div className="flex items-center gap-2">
            {mobileLogos.map((logo, i) => (
              <Image
                key={i}
                src={logo.src.replace('.png', '.svg')}
                alt={logo.alt}
                width={28}
                height={18}
                className="object-contain"
                priority={i === 0}
              />
            ))}
          </div>

          <div className="dropdown relative">
            <button
              className="dropdown-btn p-2 rounded-lg hover:bg-[#2D2D2D] transition-colors duration-200"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Menu"
            >
              <motion.div
                animate={isDropdownOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 90 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/50 z-[-1]"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  
                  {/* Dropdown Menu */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="dropdown-content absolute bg-[#1E1E1E] rounded-lg right-0 mt-2 shadow-lg overflow-hidden min-w-[200px] border border-[#2D2D2D] z-[301]"
                  >
                    {navItems.map((item, index) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;
                      
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`dropdown-item hover:bg-[#2D2D2D] transition-colors duration-200
                            ${isActive ? 'bg-[#2D2D2D]' : ''}`}
                        >
                          <Link
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 text-sm ${
                              isActive ? 'text-white' : 'text-[#8dadff]'
                            }`}
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <Icon open={false} />
                            <span>{item.label}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
      
      {/* Add padding to main content to account for mobile header */}
      <div className="pt-16" />
    </div>
  );
} 