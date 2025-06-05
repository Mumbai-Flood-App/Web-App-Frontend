import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const WaterLevelIcon = ({ open }: { open?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === '/water-level';

  return open ? (
    <Link href="/water-level">
      <div className="relative w-[200px] h-[56px] cursor-pointer">
        <div className="absolute top-0 left-0 w-[200px] h-[56px] bg-black rounded-[8px] backdrop-blur-[25px]" />
        <span className={`absolute top-[19px] left-[58.04px] font-medium ${isActive ? 'text-white' : 'text-[#8dadff]'}`}>Water Level</span>
        <Image
          src={isActive ? '/icons/water-level-open-white.svg' : '/icons/water-level-open.svg'}
          alt="Water Level"
          width={36}
          height={26}
          className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[18%] h-[26px] object-contain"
        />
      </div>
    </Link>
  ) : (
    <Link href="/water-level">
      <div className="w-[56px] h-[56px] flex items-center justify-center bg-black rounded-[8px] backdrop-blur-[25px] relative cursor-pointer">
        <Image
          width={56}
          height={56}
          alt="Water Level"
          src={isActive ? '/icons/water-level-closed-white.svg' : '/icons/water-level.svg'}
          className="object-contain absolute top-0 left-0 w-[56px] h-[56px]"
        />
      </div>
    </Link>
  );
};

export default WaterLevelIcon;