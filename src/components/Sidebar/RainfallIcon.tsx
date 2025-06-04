import Image from "next/image";

const RainfallIcon = ({ open }: { open?: boolean }) => (
  open ? (
    <div className="relative w-[200px] h-[56px] text-left text-[16px] font-medium text-white font-['Open_Sauce_Sans']">
      <div className="absolute top-0 left-0 w-[200px] h-[56px] bg-black rounded-[8px] backdrop-blur-[25px]" />
      <div className="absolute top-[10px] left-[10px] w-[37.5px] h-[36px] overflow-hidden">
        <Image src="/icons/rainfall-open.svg" alt="Rainfall" width={37.5} height={36} className="object-contain" />
      </div>
      <span className="absolute top-[19px] left-[58.04px]">Rainfall</span>
    </div>
  ) : (
    <div className="w-[56px] h-[56px] flex items-center justify-center bg-black rounded-[8px] backdrop-blur-[25px] relative cursor-pointer">
      <Image width={37.5} height={36} alt="Rainfall" src="/icons/rainfall.svg" className="object-contain absolute top-[10px] left-[10px] w-[37.5px] h-[36px]" />
    </div>
  )
);

export default RainfallIcon;