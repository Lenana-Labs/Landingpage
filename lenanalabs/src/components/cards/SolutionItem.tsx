import IndexNumber from "@/components/ui/IndexNumber";
import Label from "@/components/ui/label";

export interface Solution {
  index: string;
  title: string;
  description: string;
  capabilities: string[];
}

interface SolutionItemProps {
  solution: Solution;
  className?: string;
}

export default function SolutionItem({ solution, className = "" }: SolutionItemProps) {
  return (
    <div className={`py-10 border-b border-ink last:border-0 ${className}`}>
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left column: Index & Title */}
        <div className="col-span-12 md:col-span-5 space-y-3">
          <div className="flex items-center gap-3">
            <IndexNumber value={solution.index} size="sm" />
            <Label>PRACTICE AREA</Label>
          </div>
          <h3 className="text-2xl sm:text-3xl font-medium text-ink tracking-tight">
            {solution.title}
          </h3>
        </div>

        {/* Right column: Description & Capabilities */}
        <div className="col-span-12 md:col-span-7 space-y-6">
          <p className="text-base sm:text-lg text-ink/75 leading-relaxed font-sans">
            {solution.description}
          </p>
          <div className="space-y-3 pt-2">
            <Label as="p" className="text-ink/60">CORE CAPABILITIES</Label>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 border-t border-ink/20 pt-3">
              {solution.capabilities.map((cap) => (
                <li key={cap} className="flex items-center gap-2 text-sm text-ink/80 font-mono">
                  <span className="w-1.5 h-1.5 bg-carmine shrink-0 inline-block" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
