import Label from "@/components/ui/label";

export interface FactItem {
  label: string;
  value: string;
  meta?: string;
}

interface FactRowProps {
  facts: FactItem[];
  className?: string;
}

export default function FactRow({ facts, className = "" }: FactRowProps) {
  return (
    <div className={`divide-y divide-ink border-t border-b border-ink ${className}`}>
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="py-5 grid grid-cols-12 gap-4 items-baseline"
        >
          <div className="col-span-12 sm:col-span-4">
            <Label as="span" className="text-ink/65">
              {fact.label}
            </Label>
          </div>
          <div className="col-span-12 sm:col-span-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <span className="text-xl sm:text-2xl font-medium text-ink font-sans tracking-tight">
              {fact.value}
            </span>
            {fact.meta && (
              <span className="font-mono text-xs text-carmine uppercase tracking-wider">
                {fact.meta}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
