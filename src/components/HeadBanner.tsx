// src/components/HeadBanner.tsx
import Image from "next/image";

const mobileLogos = [
  { src: "/img/iitb.svg", alt: "IIT Bombay" },
  { src: "/img/ccs.svg", alt: "CCS" },
];

export default function HeadBanner({ sidebarOpen = true }: { sidebarOpen?: boolean }) {
  // Responsive width for banner
  const width = "w-[98vw] sm:w-[340px] md:w-[360px] lg:w-[445px]";
  const fontSize = "text-lg";
  const marginLeft = sidebarOpen ? "lg:ml-[248px]" : "lg:ml-[90px]";

  return (
    <div className={`fixed top-4 z-20 transition-all duration-0 ease-in-out ${marginLeft} left-0`}>
      <div
        className={`${width} h-[44px] rounded-xl bg-[#326afd] flex items-center justify-center shadow-lg`}
        style={{ fontFamily: "'Open Sauce Sans', sans-serif" }}
      >
        {/* Mobile: show logos left of hamburger, desktop: nothing */}
        <div className="absolute left-3 flex items-center gap-2 md:hidden">
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
        <span className={`font-bold text-white ${fontSize}`}>MUMBAI FLOOD EXPERIMENT</span>
      </div>
    </div>
  );
}