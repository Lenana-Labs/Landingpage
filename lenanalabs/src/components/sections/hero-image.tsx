import React from "react";

export interface HeroImageProps {
  className?: string;
}

export function HeroImage({ className = "" }: HeroImageProps) {
  return (
    <div
      className={`absolute inset-0 z-0 bg-cover bg-center filter grayscale contrast-[1.1] ${className}`.trim()}
      style={{
        backgroundImage: 'var(--hero-image), linear-gradient(135deg, #c4c6c7 0%, #77797a 45%, #2b2d2e 100%)',
      }}
      aria-hidden="true"
    />
  );
}
