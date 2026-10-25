import Label from "@/components/ui/label";

interface ProblemBlockProps {
  label?: string;
  statement: string;
  subtext?: string;
  className?: string;
}

export default function ProblemBlock({
  label = "SYSTEM FAILURE MODES",
  statement,
  subtext,
  className = "",
}: ProblemBlockProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {label && (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-carmine inline-block" />
          <Label variant="carmine">{label}</Label>
        </div>
      )}
      <p className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-[1.15] text-balance max-w-4xl">
        {statement}
      </p>
      {subtext && (
        <p className="text-base sm:text-lg text-ink/70 leading-relaxed max-w-2xl font-sans pt-2">
          {subtext}
        </p>
      )}
    </div>
  );
}
