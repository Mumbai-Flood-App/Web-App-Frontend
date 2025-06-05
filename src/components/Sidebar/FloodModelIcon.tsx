import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const FloodModelIcon = ({ open }: { open?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === '/flood-model';

  return open ? (
    <Link href="/flood-model">
      <div className="relative w-[200px] h-[56px] cursor-pointer">
        <div className="absolute top-0 left-0 w-[200px] h-[56px] bg-black rounded-[8px] backdrop-blur-[25px]" />
        <div className="absolute top-[10px] left-[10px] w-[36px] h-[38px] overflow-hidden">
          <Image
            src={isActive ? '/icons/flood-model-open-white.svg' : '/icons/flood-model-open.svg'}
            alt="Flood Model"
            width={36}
            height={38}
            className="object-contain"
          />
        </div>
        <span className={`absolute top-[19px] left-[58.04px] font-medium ${isActive ? 'text-white' : 'text-[#8dadff]'}`}>
          Flood Model
        </span>
      </div>
    </Link>
  ) : (
    <Link href="/flood-model">
      <div className="w-[56px] h-[56px] flex items-center justify-center bg-black rounded-[8px] backdrop-blur-[25px] relative cursor-pointer">
        <Image
          width={36}
          height={38}
          alt="Flood Model"
          src={isActive ? '/icons/flood-model-closed-white.svg' : '/icons/flood-model.svg'}
          className="object-contain absolute top-[10px] left-[10px] w-[36px] h-[38px]"
        />
      </div>
    </Link>
  );
};

export default FloodModelIcon;