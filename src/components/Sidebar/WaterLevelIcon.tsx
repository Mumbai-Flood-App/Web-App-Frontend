import Image from "next/image";

const WaterLevelIcon = ({ open }: { open?: boolean }) => (
  open ? (
    <div className="relative w-[200px] h-[56px] text-left text-[16px] font-medium text-[#8dadff] font-['Open_Sauce_Sans']">
      <div className="absolute top-0 left-0 w-[200px] h-[56px] bg-black rounded-[8px] backdrop-blur-[25px]" />
      <span className="absolute top-[19px] left-[58.04px]">Water Level</span>
      <Image src="/icons/water-level-open.svg" alt="Water Level" width={36} height={26} className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[18%] h-[26px] object-contain" />
    </div>
  ) : (
    <div className="w-[56px] h-[56px] flex items-center justify-center bg-black rounded-[8px] backdrop-blur-[25px] relative cursor-pointer">
      <Image width={56} height={56} alt="Water Level" src="/icons/water-level.svg" className="object-contain absolute top-0 left-0 w-[56px] h-[56px]" />
    </div>
  )
);

export default WaterLevelIcon;