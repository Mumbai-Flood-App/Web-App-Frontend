import Image from "next/image";

const InfoIcon = ({ open }: { open?: boolean }) => (
  open ? (
    <div className="relative w-full h-[36px] text-left text-[16px] font-medium text-[#8dadff] font-['Open_Sauce_Sans']">
      <span className="absolute top-[8px] left-[49px]">About</span>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[28.57%] h-[36px] overflow-hidden">
        <Image src="/icons/info-open.svg" alt="About" width={36} height={36} className="object-contain" />
      </div>
    </div>
  ) : (
    <div className="w-[36px] h-[36px] flex items-center justify-center relative cursor-pointer">
      <Image width={36} height={36} alt="About" src="/icons/info.svg" className="object-contain absolute top-0 left-0 w-[36px] h-[36px]" />
    </div>
  )
);

export default InfoIcon;