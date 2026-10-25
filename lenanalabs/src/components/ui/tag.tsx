import React from "react";

export interface TagProps {
  variant?: "outline" | "sulphur";
  className?: string;
  children: React.ReactNode;
}

export function Tag({
  variant = "outline",
  className = "",
  children,
}: TagProps) {
  const variantClass = variant === "sulphur" ? "tag--sulphur" : "";
  return (
    <span className={`tag ${variantClass} ${className}`.trim()}>
      {children}
    </span>
  );
}
