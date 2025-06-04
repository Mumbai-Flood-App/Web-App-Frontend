import Image from "next/image";

const FloodReportIcon = ({ open }: { open?: boolean }) => (
  open ? (
    <div className="relative w-[200px] h-[56px] text-left text-[16px] font-medium text-[#8dadff] font-['Open_Sauce_Sans']">
      <div className="absolute top-0 left-0 w-[200px] h-[56px] bg-black rounded-[8px] backdrop-blur-[25px]" />
      <span className="absolute top-[19px] left-[58.04px]">Reported Floods</span>
      <div className="absolute top-[10px] left-[12px] w-[31.1px] h-[36px] overflow-hidden">
        <Image src="/icons/flood-report-open.svg" alt="Flood Report" width={31.1} height={36} className="object-contain" />
      </div>
    </div>
  ) : (
    <div className="w-[56px] h-[56px] flex items-center justify-center bg-black rounded-[8px] backdrop-blur-[25px] relative cursor-pointer">
      <Image width={31.1} height={36} alt="Flood Report" src="/icons/flood-report.svg" className="object-contain absolute top-[10px] left-[12px] w-[31.1px] h-[36px]" />
    </div>
  )
);

export default FloodReportIcon;