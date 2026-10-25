import React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ink";
  size?: "default" | "sm";
  arrow?: boolean;
  href?: string;
  isExternal?: boolean;
}

export function Button({
  variant = "primary",
  size = "default",
  arrow = false,
  href,
  isExternal,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variantClass = {
    primary: "btn--primary",
    secondary: "btn--secondary",
    outline: "btn--outline",
    ink: "btn--ink",
  }[variant];

  const sizeClass = size === "sm" ? "btn--sm" : "";
  const classes = `btn ${variantClass} ${sizeClass} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      {arrow && <span aria-hidden="true" className="select-none font-sans">→</span>}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
