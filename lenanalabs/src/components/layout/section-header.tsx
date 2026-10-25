import React from "react";
import { Label } from "../ui/label";

export interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  description?: string;
  id?: string;
  className?: string;
  variant?: "paper" | "ink" | "sulphur";
}

export function SectionHeader({
  index,
  label,
  title,
  description,
  id,
  className = "",
  variant = "paper",
}: SectionHeaderProps) {
  const isDark = variant === "ink";
  const labelColor = isDark ? "sulphur" : "default";

  return (
    <div className={`swiss-grid mb-12 lg:mb-16 ${className}`.trim()}>
      {/* Left label: columns 1–3 on desktop */}
      <div className="grid-col-label">
        <Label variant={labelColor}>
          {index} / {label}
        </Label>
      </div>

      {/* Right content: columns 4–12 on desktop */}
      <div className="grid-col-content">
        <h2
          id={id}
          className={`type-h1 font-bold ${
            isDark ? "text-[var(--color-paper)]" : "text-[var(--color-ink)]"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`type-body-lg mt-6 max-w-[64ch] ${
              isDark ? "text-white/70" : "text-[var(--color-muted)]"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
