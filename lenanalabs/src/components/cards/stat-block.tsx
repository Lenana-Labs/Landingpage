import React from "react";
import { Label } from "../ui/label";

export interface StatItem {
  value: string;
  label: string;
  subtext?: string;
}

export interface StatBlockProps {
  stats: StatItem[];
  className?: string;
}

export function StatBlock({ stats, className = "" }: StatBlockProps) {
  return (
    <div
      className={`border-b border-[var(--color-ink)] bg-[var(--color-paper-alt)] py-8 ${className}`.trim()}
    >
      <div className="site-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col border-l border-[var(--color-ink)] pl-6">
              <span className="type-h1 font-bold text-[var(--color-ink)] tracking-tight">
                {stat.value}
              </span>
              <Label variant="default" className="mt-2">
                {stat.label}
              </Label>
              {stat.subtext && (
                <span className="font-mono text-[11px] text-[var(--color-muted)] mt-1">
                  {stat.subtext}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
