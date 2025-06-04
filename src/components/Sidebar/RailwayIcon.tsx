import Image from "next/image";

const RailwayIcon = ({ open }: { open?: boolean }) => (
  open ? (
    <div className="relative w-[200px] h-[56px] text-left text-[16px] font-medium text-[#8dadff] font-['Open_Sauce_Sans']">
      <div className="absolute top-0 left-0 w-[200px] h-[56px] bg-black rounded-[8px] backdrop-blur-[25px]" />
      <span className="absolute top-[19px] left-[58.04px]">Transport Stress</span>
      <Image src="/icons/railway-open.svg" alt="Railway" width={24.1} height={36} className="absolute left-[8%] top-1/2 -translate-y-1/2 w-[12.05%] h-[36px] object-contain" />
    </div>
  ) : (
    <div className="w-[56px] h-[56px] flex items-center justify-center bg-black rounded-[8px] backdrop-blur-[25px] relative cursor-pointer">
      <Image width={24.1} height={36} alt="Railway" src="/icons/railway.svg" className="object-contain absolute top-[10px] left-[16px] w-[24.1px] h-[36px]" />
    </div>
  )
);

export default RailwayIcon;