"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { navigationItems } from "@/data/navigation";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleAccordion = (label: string) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-[100] bg-[var(--color-paper)] flex flex-col justify-between overflow-y-auto"
    >
      {/* Top Bar inside menu */}
      <div className="flex items-center justify-between h-14 sm:h-16 px-5 border-b border-[var(--color-ink)] flex-shrink-0">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-[var(--color-ink)]"
        >
          <span
            className="w-3 h-3 bg-[var(--color-carmine)] inline-block flex-shrink-0"
            aria-hidden="true"
          />
          <span>Lenana Labs</span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="type-label py-2 px-3 border border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* Nav List with Accordions */}
      <div className="flex-grow divide-y divide-[var(--color-ink)]">
        {navigationItems.map((item) => {
          const isExpanded = expandedSection === item.label;

          if (!item.hasDropdown) {
            return (
              <div key={item.label} className="p-6">
                <a
                  href={item.href}
                  onClick={onClose}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="type-h2 font-bold text-[var(--color-ink)] hover:text-[var(--color-carmine)] flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  {item.isExternal && <span className="text-xl">↗</span>}
                </a>
              </div>
            );
          }

          return (
            <div key={item.label} className="flex flex-col">
              <button
                type="button"
                onClick={() => toggleAccordion(item.label)}
                className="w-full text-left p-6 type-h2 font-bold text-[var(--color-ink)] hover:text-[var(--color-carmine)] flex items-center justify-between cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="font-mono text-base font-normal">
                  {isExpanded ? "−" : "+"}
                </span>
              </button>

              {isExpanded && item.dropdownItems && (
                <div className="bg-[var(--color-paper-alt)] border-t border-[var(--color-ink)] divide-y divide-[var(--color-ink)]/15">
                  {item.dropdownItems.map((sub) => (
                    <Link
                      key={sub.index}
                      href={sub.href}
                      onClick={onClose}
                      className="block p-5 pl-8 hover:bg-[var(--color-sulphur)] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--color-carmine)]">
                          {sub.index}
                        </span>
                        <span className="font-semibold text-base text-[var(--color-ink)]">
                          {sub.title}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-muted)] mt-1">
                        {sub.description}
                      </p>
                    </Link>
                  ))}
                  {item.footerLink && (
                    <Link
                      href={item.footerLink.href}
                      onClick={onClose}
                      className="block p-4 pl-8 font-mono text-xs font-semibold text-[var(--color-ink)] hover:text-[var(--color-carmine)]"
                    >
                      {item.footerLink.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pinned Contact CTA at bottom */}
      <div className="p-5 border-t border-[var(--color-ink)] bg-[var(--color-paper)] flex-shrink-0">
        <Button
          variant="primary"
          href="#contact"
          className="w-full justify-center"
          onClick={onClose}
        >
          Contact
        </Button>
      </div>
    </div>
  );
}
