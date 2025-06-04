import Image from "next/image";

const SlideIcon = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="w-[29.5px] h-[28px] flex items-center justify-center rounded transition hover:bg-white/10"
    onClick={onClick}
    aria-label="Toggle sidebar"
    type="button"
  >
    <Image
      width={29.5}
      height={28}
      alt="Slide"
      src="/icons/slide-icon.svg"
      className="object-contain"
    />
  </button>
);

export default SlideIcon;