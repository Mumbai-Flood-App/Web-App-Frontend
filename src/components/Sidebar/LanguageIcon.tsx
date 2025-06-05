import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const LanguageIcon = ({ open }: { open?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === '/language';

  return open ? (
    <Link href="/language">
      <div className="relative w-[200px] h-[36px] cursor-pointer">
        <span className={`absolute top-[8px] left-[49px] font-medium ${isActive ? 'text-white' : 'text-[#8dadff]'}`}>Language</span>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[28.57%] h-[36px] overflow-hidden">
          <Image
            src={isActive ? '/icons/language-open-white.svg' : '/icons/language-open.svg'}
            alt="Language"
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
      </div>
    </Link>
  ) : (
    <Link href="/language">
      <div className="w-[36px] h-[36px] flex items-center justify-center relative cursor-pointer">
        <Image
          width={36}
          height={36}
          alt="Language"
          src={isActive ? '/icons/language-closed-white.svg' : '/icons/language.svg'}
          className="object-contain absolute top-0 left-0 w-[36px] h-[36px]"
        />
      </div>
    </Link>
  );
};

export default LanguageIcon;