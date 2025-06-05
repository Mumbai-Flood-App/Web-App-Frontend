import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const InfoIcon = ({ open }: { open?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === '/about';

  return open ? (
    <Link href="/about">
      <div className="relative w-[200px] h-[36px] cursor-pointer">
        <span className={`absolute top-[8px] left-[49px] font-medium ${isActive ? 'text-white' : 'text-[#8dadff]'}`}>About</span>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[28.57%] h-[36px] overflow-hidden">
          <Image
            src={isActive ? '/icons/info-white.svg' : '/icons/info.svg'}
            alt="About"
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
      </div>
    </Link>
  ) : (
    <Link href="/about">
      <div className="w-[36px] h-[36px] flex items-center justify-center relative cursor-pointer">
        <Image
          width={36}
          height={36}
          alt="About"
          src={isActive ? '/icons/info-white.svg' : '/icons/info.svg'}
          className="object-contain absolute top-0 left-0 w-[36px] h-[36px]"
        />
      </div>
    </Link>
  );
};

export default InfoIcon;