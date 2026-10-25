import React from "react";
import { Rule } from "./rule";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "paper" | "paper-alt" | "sulphur" | "ink";
  topRule?: boolean;
  ruleWeight?: "thin" | "heavy";
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  variant = "paper",
  topRule = false,
  ruleWeight = "heavy",
  id,
  className = "",
  children,
  ...props
}: SectionProps) {
  const variantClass = {
    paper: "site-section--paper",
    "paper-alt": "site-section--paper-alt",
    sulphur: "site-section--sulphur",
    ink: "site-section--ink",
  }[variant];

  return (
    <section
      id={id}
      className={`site-section ${variantClass} ${className}`.trim()}
      {...props}
    >
      {topRule && (
        <div className="absolute top-0 left-0 right-0">
          <Rule
            weight={ruleWeight}
            variant={variant === "ink" ? "dark" : "default"}
          />
        </div>
      )}
      {children}
    </section>
  );
}
