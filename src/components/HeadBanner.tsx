// src/components/HeadBanner.tsx
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
        <span className={`font-bold text-white ${fontSize}`}>Mumbai Flood Experiment</span>
      </div>
    </div>
  );
}