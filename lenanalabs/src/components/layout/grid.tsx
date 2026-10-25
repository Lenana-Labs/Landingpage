import React from "react";

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
}

export function Grid({
  children,
  className = "",
  as: Component = "div",
  ...props
}: GridProps) {
  return (
    <Component className={`swiss-grid ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
