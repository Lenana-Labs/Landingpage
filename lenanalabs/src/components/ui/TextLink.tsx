import { ReactNode, AnchorHTMLAttributes } from "react";

type TextLinkVariant = "default" | "inverse";

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: TextLinkVariant;
  className?: string;
}

export default function TextLink({
  children,
  variant = "default",
  className = "",
  ...props
}: TextLinkProps) {
  return (
    <a
      className={`underline underline-offset-4 decoration-1 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmine ${
        variant === "inverse"
          ? "text-paper hover:text-sulphur decoration-paper/50"
          : "text-ink hover:text-carmine"
      } ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
