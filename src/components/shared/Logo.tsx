import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <Image
        src="/agrodyke_logo.png"
        alt="AGRODYKE logo"
        width={size}
        height={size}
        priority
      />
      <span className="text-lg font-semibold text-green-900">AGRODYKE</span>
    </div>
  );
}
