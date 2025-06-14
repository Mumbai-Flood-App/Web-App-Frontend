'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

  return (
    <div className="lg:hidden">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#1E1E1E] border-b border-[#2D2D2D] z-50">
        <div className="h-full flex justify-between items-center px-4">
          {/* Logos left of title */}
          <div className="flex items-center gap-2">
            {mobileLogos.map((logo, i) => (
              <Image
                key={i}
                src={logo.src}
                alt={logo.alt}
                width={logo.alt === "CCS" ? 36 : 24}
                height={logo.alt === "CCS" ? 20 : 16}
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
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="dropdown-content absolute bg-[#1E1E1E] rounded-lg right-0 mt-2 shadow-lg overflow-hidden min-w-[200px] border border-[#2D2D2D]">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <div
                      key={item.href}
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
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Add padding to main content to account for mobile header */}
      <div className="pt-16" />
    </div>
  );
} 