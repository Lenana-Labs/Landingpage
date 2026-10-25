"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavDropdown } from "./nav-dropdown";
import { MobileMenu } from "./mobile-menu";
import { navigationItems } from "@/data/navigation";

export function NavBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav aria-label="Main Navigation" className="w-full">
      <div className="site-container">
        <div className="flex items-center justify-between h-[var(--header-height)]">
          {/* Logo / Wordmark Left */}
          <Link
            href="/"
            className="flex items-center gap-3 text-lg lg:text-xl font-bold tracking-tight text-[var(--color-ink)] hover:text-[var(--color-carmine)] transition-colors focus-visible:outline-2"
          >
            <span
              className="w-3 h-3 bg-[var(--color-carmine)] inline-block flex-shrink-0"
              aria-hidden="true"
            />
            <span>Lenana Labs</span>
          </Link>

          {/* Desktop Navigation Items Right */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => {
                if (item.hasDropdown && item.dropdownItems) {
                  return (
                    <NavDropdown
                      key={item.label}
                      id={item.label.toLowerCase()}
                      label={item.label}
                      items={item.dropdownItems}
                      footerLink={item.footerLink}
                      isOpen={openDropdown === item.label}
                      onOpen={() => setOpenDropdown(item.label)}
                      onClose={() => setOpenDropdown(null)}
                    />
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="type-label inline-flex items-center gap-1 py-6 text-[var(--color-ink)] hover:text-[var(--color-carmine)] border-b-2 border-transparent hover:border-[var(--color-carmine)] transition-colors"
                  >
                    <span>{item.label}</span>
                    {item.isExternal && (
                      <span aria-hidden="true" className="text-[10px]">
                        ↗
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Gap before Contact button (48px) */}
            <div className="pl-4">
              <Button variant="primary" size="sm" href="#contact">
                Contact
              </Button>
            </div>
          </div>

          {/* Mobile Menu Text Button Right */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="type-label px-3 py-1.5 border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </nav>
  );
}
