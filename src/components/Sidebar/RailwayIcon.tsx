import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const RailwayIcon = ({ open }: { open?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === '/transport-stress';

  return open ? (
    <Link href="/transport-stress">
      <div className="relative w-[200px] h-[56px] cursor-pointer">
        <div className="absolute top-0 left-0 w-[200px] h-[56px] bg-black rounded-[8px] backdrop-blur-[25px]" />
        <span className={`absolute top-[19px] left-[58.04px] font-medium ${isActive ? 'text-white' : 'text-[#8dadff]'}`}>Transport Stress</span>
        <Image
          src={isActive ? '/icons/railway-open-white.svg' : '/icons/railway-open.svg'}
          alt="Railway"
          width={24.1}
          height={36}
          className="absolute left-[8%] top-1/2 -translate-y-1/2 w-[12.05%] h-[36px] object-contain"
        />
      </div>
    </Link>
  ) : (
    <Link href="/transport-stress">
      <div className="w-[56px] h-[56px] flex items-center justify-center bg-black rounded-[8px] backdrop-blur-[25px] relative cursor-pointer">
        <Image
          width={24.1}
          height={36}
          alt="Railway"
          src={isActive ? '/icons/railway-closed-white.svg' : '/icons/railway.svg'}
          className="object-contain absolute top-[10px] left-[16px] w-[24.1px] h-[36px]"
        />
      </div>
    </Link>
  );
};

export default RailwayIcon;