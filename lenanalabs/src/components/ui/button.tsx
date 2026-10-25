import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ink";

type ButtonAsButton = {
  as?: "button";
  href?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchor = {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & (ButtonAsButton | ButtonAsAnchor);

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-carmine text-paper hover:bg-carmine/90 focus-visible:outline-carmine",
  secondary:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper focus-visible:outline-ink",
  ink: "bg-ink text-paper hover:bg-ink/80 focus-visible:outline-ink",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  as,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center h-12 px-6 text-sm font-medium rounded-none transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer";

  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (as === "a") {
    const { href, target, rel, ...rest } = props as ButtonAsAnchor;
    return (
      <a href={href} target={target} rel={rel} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
