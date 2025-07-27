import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <Link
      onClick={onClick}
      href="/"
      className="flex items-center gap-2 md:gap-4 z-10"
    >
      <Image
        src="/logo.png"
        className="h-10 w-10 md:h-16 md:w-16"
        height={60}
        width={60}
        quality={98}
        alt="The Wild Oasis logo"
      />
      <span className="text-base md:text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}
