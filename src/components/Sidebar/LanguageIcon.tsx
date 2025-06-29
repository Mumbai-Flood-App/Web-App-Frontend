import Image from 'next/image';

const LanguageIcon = ({ open }: { open?: boolean }) => {
  return open ? (
    <div className="relative w-[200px] h-[36px]">
      <span className="absolute top-[8px] left-[49px] font-medium text-[#8dadff]">Language</span>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[28.57%] h-[36px] overflow-hidden">
        <Image
          src="/icons/language-open.svg"
          alt="Language"
          width={36}
          height={36}
          className="object-contain"
        />
      </div>
    </div>
  ) : (
    <div className="w-[36px] h-[36px] flex items-center justify-center relative">
      <Image
        width={36}
        height={36}
        alt="Language"
        src="/icons/language-open.svg"
        className="object-contain absolute top-0 left-0 w-[36px] h-[36px]"
      />
    </div>
  );
};

export default LanguageIcon;