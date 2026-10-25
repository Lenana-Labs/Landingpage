type RuleVariant = "thin" | "heavy";

interface RuleProps {
  variant?: RuleVariant;
  className?: string;
}

export default function Rule({ variant = "thin", className = "" }: RuleProps) {
  return (
    <hr
      className={`border-0 border-t ${variant === "heavy" ? "border-t-2" : "border-t"} border-ink ${className}`}
    />
  );
}
