import { ReactNode } from "react";

type TagVariant = "outline" | "sulphur";

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}

export default function Tag({ children, variant = "outline", className = "" }: TagProps) {
  return (
    <span
      className={`inline-block border border-ink px-2 py-0.5 text-xs font-mono leading-none rounded-none ${
        variant === "sulphur" ? "bg-sulphur" : "bg-transparent"
      } ${className}`}
    >
      {children}
    </span>
  );
}
