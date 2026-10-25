import Image from "next/image";

interface HeroImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function HeroImage({
  src = "/images/hero-bg.jpg",
  alt = "Architectural grid and structure",
  className = "",
}: HeroImageProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-ink ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover grayscale contrast-125 brightness-90 mix-blend-luminosity"
        sizes="100vw"
      />
      {/* Swiss graphic grid overlay subtle guides */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
    </div>
  );
}
