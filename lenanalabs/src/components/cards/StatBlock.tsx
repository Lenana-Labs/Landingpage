import Label from "@/components/ui/label";

export interface Stat {
  value: string;
  label: string;
  annotation?: string;
}

interface StatBlockProps {
  stat: Stat;
  className?: string;
}

export default function StatBlock({ stat, className = "" }: StatBlockProps) {
  return (
    <div
      className={`border-l border-ink pl-6 py-2 flex flex-col justify-between space-y-3 ${className}`}
    >
      <div className="space-y-1">
        <span className="font-mono text-5xl sm:text-6xl lg:text-7xl font-bold text-ink leading-none tracking-tighter">
          {stat.value}
        </span>
        {stat.annotation && (
          <span className="font-mono text-xs text-carmine font-semibold block pt-1">
            {stat.annotation}
          </span>
        )}
      </div>
      <Label as="p" className="text-ink/75">
        {stat.label}
      </Label>
    </div>
  );
}
