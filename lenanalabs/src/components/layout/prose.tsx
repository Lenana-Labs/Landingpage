import React from "react";

export interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className = "" }: ProseProps) {
  return (
    <article
      className={`max-w-[64ch] space-y-6 text-[var(--color-ink)] type-body ${className}`.trim()}
    >
      {children}
    </article>
  );
}
