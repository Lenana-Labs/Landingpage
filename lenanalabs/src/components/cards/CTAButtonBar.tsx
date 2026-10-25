import Button from "@/components/ui/button";

interface CTAButtonBarProps {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "paper" | "carmine" | "ink";
  className?: string;
}

export default function CTAButtonBar({
  primaryLabel = "Initiate Engagement",
  primaryHref = "#contact",
  secondaryLabel = "Review System Docs",
  secondaryHref = "#products",
  variant = "carmine",
  className = "",
}: CTAButtonBarProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {variant === "carmine" ? (
        <>
          <Button
            as="a"
            href={primaryHref}
            variant="ink"
            className="hover:bg-paper hover:text-ink border border-paper"
          >
            {primaryLabel}
          </Button>
          <Button
            as="a"
            href={secondaryHref}
            variant="secondary"
            className="border-paper text-paper hover:bg-paper hover:text-ink"
          >
            {secondaryLabel}
          </Button>
        </>
      ) : (
        <>
          <Button as="a" href={primaryHref} variant="primary">
            {primaryLabel}
          </Button>
          <Button as="a" href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </Button>
        </>
      )}
    </div>
  );
}
