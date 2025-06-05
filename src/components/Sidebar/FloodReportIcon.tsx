import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const FloodReportIcon = ({ open }: { open?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === '/reported-floods';

  return open ? (
    <Link href="/reported-floods">
      <div className="relative w-[200px] h-[56px] cursor-pointer">
        <div className="absolute top-0 left-0 w-[200px] h-[56px] bg-black rounded-[8px] backdrop-blur-[25px]" />
        <span className={`absolute top-[19px] left-[58.04px] font-medium ${isActive ? 'text-white' : 'text-[#8dadff]'}`}>Reported Floods</span>
        <div className="absolute top-[10px] left-[12px] w-[31.1px] h-[36px] overflow-hidden">
          <Image
            src={isActive ? '/icons/flood-report-open-white.svg' : '/icons/flood-report-open.svg'}
            alt="Flood Report"
            width={31.1}
            height={36}
            className="object-contain"
          />
        </div>
      </div>
    </Link>
  ) : (
    <Link href="/reported-floods">
      <div className="w-[56px] h-[56px] flex items-center justify-center bg-black rounded-[8px] backdrop-blur-[25px] relative cursor-pointer">
        <Image
          width={31.1}
          height={36}
          alt="Flood Report"
          src={isActive ? '/icons/flood-report-closed-white.svg' : '/icons/flood-report.svg'}
          className="object-contain absolute top-[10px] left-[12px] w-[31.1px] h-[36px]"
        />
      </div>
    </Link>
  );
};

export default FloodReportIcon;