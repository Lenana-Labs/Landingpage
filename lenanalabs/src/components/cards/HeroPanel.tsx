import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import Tag from "@/components/ui/tag";

interface HeroPanelProps {
  index?: string;
  tagline?: string;
  headline?: string;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  tags?: string[];
  className?: string;
}

export default function HeroPanel({
  index = "00",
  tagline = "INDEPENDENT RESEARCH & VENTURE LAB",
  headline = "Engineering computational systems that endure.",
  description = "Lenana Labs operates at the intersection of distributed systems, applied intelligence, and foundational tooling — building enduring infrastructure for high-scale challenges.",
  primaryAction = { label: "Explore Products", href: "#products" },
  secondaryAction = { label: "Our Thesis", href: "#problem" },
  tags = ["SYSTEMS", "ALGORITHMS", "INFRASTRUCTURE"],
  className = "",
}: HeroPanelProps) {
  return (
    <div
      className={`bg-paper border border-ink p-8 md:p-12 max-w-2xl shadow-[8px_8px_0_0_#0D0D0D] ${className}`}
    >
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-ink/20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-carmine">[{index}]</span>
          <Label variant="default">{tagline}</Label>
        </div>
        <div className="hidden sm:flex gap-1.5">
          {tags.map((tag) => (
            <Tag key={tag} variant="outline">
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink leading-[1.08] text-balance">
          {headline}
        </h1>
        <p className="mt-6 text-base sm:text-lg text-ink/75 leading-relaxed font-sans max-w-xl">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Button as="a" href={primaryAction.href} variant="primary">
            {primaryAction.label}
          </Button>
          <Button as="a" href={secondaryAction.href} variant="secondary">
            {secondaryAction.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
