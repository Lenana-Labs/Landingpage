import React from "react";

export interface LabelProps {
  variant?: "default" | "carmine" | "muted" | "sulphur";
  as?: "span" | "p" | "div";
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export function Label({
  variant = "default",
  as: Component = "span",
  className = "",
  children,
  id,
}: LabelProps) {
  const colorMap = {
    default: "text-[var(--color-ink)]",
    carmine: "text-[var(--color-carmine)]",
    muted: "text-[var(--color-muted)]",
    sulphur: "text-[var(--color-sulphur)]",
  };

  return (
    <Component
      id={id}
      className={`type-label ${colorMap[variant]} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
