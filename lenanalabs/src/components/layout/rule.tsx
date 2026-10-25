import React from "react";

export interface RuleProps extends React.HTMLAttributes<HTMLHRElement> {
  weight?: "thin" | "heavy";
  variant?: "default" | "dark" | "subtle";
  className?: string;
}

export function Rule({
  weight = "thin",
  variant = "default",
  className = "",
  ...props
}: RuleProps) {
  const weightClass = weight === "heavy" ? "rule-heavy" : "rule-thin";
  const variantClass = {
    default: "",
    dark: "rule-dark",
    subtle: "border-t-[var(--color-rule-subtle)]",
  }[variant];

  return (
    <hr
      className={`${weightClass} ${variantClass} ${className}`.trim()}
      {...props}
    />
  );
}
