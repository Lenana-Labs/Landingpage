import Image from "next/image";
import Label from "@/components/ui/label";

interface MediaFrameProps {
  src: string;
  alt: string;
  aspectRatio?: "4/5" | "1/1" | "16/9" | "3/4";
  caption?: string;
  index?: string;
  className?: string;
}

const aspectClasses = {
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "16/9": "aspect-video",
  "3/4": "aspect-[3/4]",
};

export default function MediaFrame({
  src,
  alt,
  aspectRatio = "4/5",
  caption,
  index,
  className = "",
}: MediaFrameProps) {
  return (
    <figure className={`border border-ink bg-paper ${className}`}>
      <div className={`relative w-full overflow-hidden ${aspectClasses[aspectRatio]} bg-ink/5`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover grayscale contrast-110 hover:contrast-125 transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {index && (
          <div className="absolute top-3 left-3 bg-paper border border-ink px-2 py-0.5 z-10">
            <span className="font-mono text-xs text-carmine font-semibold">[{index}]</span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="p-3 border-t border-ink bg-paper flex items-center justify-between">
          <Label className="text-ink/80 truncate">{caption}</Label>
          <span className="w-1.5 h-1.5 bg-carmine inline-block shrink-0 ml-2" />
        </figcaption>
      )}
    </figure>
  );
}
