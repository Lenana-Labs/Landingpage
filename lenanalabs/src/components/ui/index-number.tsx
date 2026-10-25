import React from "react";

export interface IndexNumberProps {
  number: string;
  size?: "sm" | "lg";
  className?: string;
  color?: "carmine" | "ink" | "sulphur";
}

export function IndexNumber({
  number,
  size = "sm",
  className = "",
  color = "carmine",
}: IndexNumberProps) {
  const sizeClass = size === "lg" ? "index-number--lg" : "index-number--sm";
  const colorClass = {
    carmine: "text-[var(--color-carmine)]",
    ink: "text-[var(--color-ink)]",
    sulphur: "text-[var(--color-sulphur)]",
  }[color];

  return (
    <span
      className={`index-number ${sizeClass} ${colorClass} ${className}`.trim()}
      aria-hidden="true"
    >
      {number}
    </span>
  );
}
