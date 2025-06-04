import Image from "next/image";

const FloodModelIcon = ({ open }: { open?: boolean }) => (
  open ? (
    <div className="relative w-[200px] h-[56px] text-left text-[16px] font-medium text-[#8dadff] font-['Open_Sauce_Sans']">
      <div className="absolute top-0 left-0 w-[200px] h-[56px] bg-black rounded-[8px] backdrop-blur-[25px]" />
      <div className="absolute top-[10px] left-[10px] w-[36px] h-[38px] overflow-hidden">
        {/* Place your SVG layers here, or use a single SVG if you have it */}
        <Image src="/icons/flood-model-open.svg" alt="Flood Model" width={36} height={38} className="object-contain" />
      </div>
      <span className="absolute top-[19px] left-[58.04px]">Flood Model</span>
    </div>
  ) : (
    <div className="w-[56px] h-[56px] flex items-center justify-center bg-black rounded-[8px] backdrop-blur-[25px] relative cursor-pointer">
      <Image width={36} height={38} alt="Flood Model" src="/icons/flood-model.svg" className="object-contain absolute top-[10px] left-[10px] w-[36px] h-[38px]" />
    </div>
  )
);

export default FloodModelIcon;