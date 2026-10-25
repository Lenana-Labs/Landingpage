import { ReactNode } from "react";
import Label from "./label";
import IndexNumber from "./IndexNumber";

interface SectionHeaderProps {
  index: string;        // e.g. "01"
  label: string;        // e.g. "PROBLEM"
  title: string;
  description?: ReactNode;
  className?: string;
}

export default function SectionHeader({
  index,
  label,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`grid grid-cols-12 gap-x-6 gap-y-6 mb-10 md:mb-14 ${className}`}>
      {/* Left column — index + label */}
      <div className="col-span-12 lg:col-span-3 flex items-center lg:items-start lg:flex-col gap-3 pt-1">
        <IndexNumber value={index} size="sm" />
        <Label as="p">{label}</Label>
      </div>

      {/* Right column — heading + optional description */}
      <div className="col-span-12 lg:col-span-9">
        <h2 className="section-title">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-ink/70 max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
