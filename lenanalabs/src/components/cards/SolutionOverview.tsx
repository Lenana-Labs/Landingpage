import Label from "@/components/ui/label";
import IndexNumber from "@/components/ui/IndexNumber";

export interface Pillar {
  index: string;
  label: string;
  title: string;
  description: string;
}

interface SolutionOverviewProps {
  pillars: Pillar[];
  className?: string;
}

export default function SolutionOverview({
  pillars,
  className = "",
}: SolutionOverviewProps) {
  return (
    <div className={`divide-y divide-ink border-y border-ink ${className}`}>
      {pillars.map((pillar) => (
        <div
          key={pillar.index}
          className="py-8 grid grid-cols-12 gap-6 items-baseline transition-colors hover:bg-sulphur/20 group"
        >
          <div className="col-span-12 sm:col-span-3 lg:col-span-2 flex items-center gap-3">
            <IndexNumber value={pillar.index} size="sm" />
            <Label variant="default" className="group-hover:text-carmine transition-colors">
              {pillar.label}
            </Label>
          </div>
          <div className="col-span-12 sm:col-span-4 lg:col-span-4">
            <h3 className="text-xl sm:text-2xl font-medium text-ink">
              {pillar.title}
            </h3>
          </div>
          <div className="col-span-12 sm:col-span-5 lg:col-span-6">
            <p className="text-sm sm:text-base text-ink/75 leading-relaxed font-sans">
              {pillar.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
