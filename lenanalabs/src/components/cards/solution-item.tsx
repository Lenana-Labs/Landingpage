import React from "react";
import { IndexNumber } from "../ui/index-number";
import { SolutionCategory } from "@/data/solutions";

export interface SolutionItemProps {
  item: SolutionCategory;
}

export function SolutionItem({ item }: SolutionItemProps) {
  return (
    <div className="flex flex-col border-t-2 border-[var(--color-ink)] pt-6">
      {/* Index Number */}
      <div className="mb-4">
        <IndexNumber number={item.index} size="sm" />
      </div>

      {/* Title */}
      <h3 className="type-h2 mb-4 font-bold text-[var(--color-ink)]">
        {item.title}
      </h3>

      {/* Description */}
      <p className="type-body text-[var(--color-ink)] mb-8 flex-grow">
        {item.description}
      </p>

      {/* Capabilities with square bullets */}
      <div className="border-t border-[var(--color-ink)]/15 pt-6 mt-auto">
        <p className="type-label text-[var(--color-muted)] mb-4">
          Capabilities
        </p>
        <ul className="space-y-2 list-none p-0 m-0">
          {item.capabilities.map((cap) => (
            <li
              key={cap}
              className="type-body text-sm text-[var(--color-ink)] flex items-start gap-2.5"
            >
              <span
                className="inline-block w-1.5 h-1.5 bg-[var(--color-carmine)] mt-2 flex-shrink-0"
                aria-hidden="true"
              />
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
