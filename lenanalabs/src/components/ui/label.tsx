import { ReactNode } from "react";

type LabelVariant = "default" | "carmine";

interface LabelProps {
  children: ReactNode;
  variant?: LabelVariant;
  className?: string;
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function Label({
  children,
  variant = "default",
  className = "",
  as: Tag = "span",
}: LabelProps) {
  return (
    <Tag
      className={`font-mono text-xs uppercase tracking-[0.12em] leading-none ${
        variant === "carmine" ? "text-carmine" : "text-ink"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
