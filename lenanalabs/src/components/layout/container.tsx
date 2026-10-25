import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "nav" | "header" | "footer" | "section";
}

export function Container({
  children,
  className = "",
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component className={`site-container ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
