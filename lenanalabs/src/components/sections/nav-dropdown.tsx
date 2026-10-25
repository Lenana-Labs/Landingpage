"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { NavDropdownItem } from "./nav-dropdown-item";
import { NavDropdownItemData } from "@/data/navigation";

export interface NavDropdownProps {
  label: string;
  items: NavDropdownItemData[];
  footerLink?: {
    label: string;
    href: string;
  };
  id: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function NavDropdown({
  label,
  items,
  footerLink,
  id,
  isOpen,
  onOpen,
  onClose,
}: NavDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onOpen();
    }, 150);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 150);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        id={`btn-${id}`}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        aria-haspopup="true"
        onClick={() => (isOpen ? onClose() : onOpen())}
        className={`type-label inline-flex items-center gap-1.5 py-6 text-[var(--color-ink)] transition-colors duration-150 cursor-pointer border-b-2 ${
          isOpen
            ? "border-[var(--color-carmine)] text-[var(--color-carmine)]"
            : "border-transparent hover:border-[var(--color-carmine)]"
        }`}
      >
        <span>{label}</span>
        <span
          className={`text-[9px] transition-transform duration-150 ${
            isOpen ? "rotate-180 text-[var(--color-carmine)]" : ""
          }`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          id={`panel-${id}`}
          role="region"
          aria-labelledby={`btn-${id}`}
          className="absolute top-full left-0 w-80 bg-[var(--color-paper)] border border-[var(--color-ink)] z-50 transition-opacity duration-150 animate-in fade-in"
          style={{ marginTop: "-1px" }}
        >
          <div className="flex flex-col">
            {items.map((item) => (
              <NavDropdownItem
                key={item.index}
                item={item}
                onSelect={onClose}
              />
            ))}

            {footerLink && (
              <div className="p-3 bg-[var(--color-paper-alt)] border-t border-[var(--color-ink)] text-right">
                <Link
                  href={footerLink.href}
                  onClick={onClose}
                  className="font-mono text-xs font-semibold text-[var(--color-ink)] hover:text-[var(--color-carmine)] transition-colors inline-flex items-center gap-1"
                >
                  {footerLink.label}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
