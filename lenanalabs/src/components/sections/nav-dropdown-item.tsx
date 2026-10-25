import React from "react";
import Link from "next/link";
import { NavDropdownItemData } from "@/data/navigation";

export interface NavDropdownItemProps {
  item: NavDropdownItemData;
  onSelect?: () => void;
}

export function NavDropdownItem({ item, onSelect }: NavDropdownItemProps) {
  return (
    <Link
      href={item.href}
      onClick={onSelect}
      className="group block p-4 border-b border-[var(--color-ink)] hover:bg-[var(--color-sulphur)] transition-colors duration-150 text-left focus:bg-[var(--color-sulphur)]"
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="font-mono text-xs font-bold text-[var(--color-carmine)]"
          aria-hidden="true"
        >
          {item.index}
        </span>
        <span className="font-sans text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-carmine)] transition-colors duration-150">
          {item.title}
        </span>
      </div>
      <p className="font-sans text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed">
        {item.description}
      </p>
    </Link>
  );
}
