import React from "react";
import Link from "next/link";

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "inverse";
  arrow?: boolean;
  isExternal?: boolean;
}

export function TextLink({
  href,
  variant = "default",
  arrow = false,
  isExternal = false,
  className = "",
  children,
  ...props
}: TextLinkProps) {
  const variantClass = variant === "inverse" ? "text-link--inverse" : "";
  const classes = `text-link ${variantClass} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      {arrow && <span aria-hidden="true" className="select-none font-sans font-normal">→</span>}
      {isExternal && <span aria-hidden="true" className="select-none text-[11px] font-normal">↗</span>}
    </>
  );

  if (isExternal || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
