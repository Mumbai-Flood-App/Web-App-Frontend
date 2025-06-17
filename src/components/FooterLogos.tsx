// src/components/FooterLogos.tsx
import Image from "next/image";

const logos = [
  { src: "/img/iitb.svg", alt: "IIT Bombay" },
  {src: "/img/ccs.svg", alt: "CCS" },
  { src: "/img/imd.svg", alt: "IMD" },
  { src: "/img/bmc.svg", alt: "BMC" },
  { src: "/img/hdfc.svg", alt: "HDFC Ergo" },
  { src: "/img/partner-vector.svg", alt: "Partner Vector" },
];

export default function FooterLogos() {
  return (
    <>
      {/* Desktop View - Top Right Vertical */}
      <div className="hidden md:flex fixed top-0 right-0 z-30 bg-white rounded-bl-lg px-4 py-3 flex-col items-center gap-4 shadow-lg"
           style={{ minWidth: 80 }}>
        {logos.map((logo, i) => (
          <Image
              key={i}
              src={logo.src}
              alt={logo.alt}
              width={
              logo.alt === "CCS" ? 60 :
              logo.alt === "IMD" ? 25 :
              35
              }
              height={
              logo.alt === "CCS" ? 35 :
              logo.alt === "IMD" ? 15 :
              20
              }
              className="object-contain"
              priority={i === 0}
          />
        ))}
      </div>
    </>
  );
}