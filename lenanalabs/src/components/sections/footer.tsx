"use client";

import React from "react";
import { Container } from "../layout/container";
import { Rule } from "../layout/rule";
import { FooterColumn } from "./footer-column";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateLinks = [
    { label: "Products", href: "#products" },
    { label: "Solutions", href: "#solutions" },
    { label: "Contact", href: "#contact" },
  ];

  const connectLinks = [
    { label: "GitHub", href: "https://github.com/lenanalabs", isExternal: true },
    { label: "LinkedIn", href: "https://linkedin.com", isExternal: true },
    { label: "Email", href: "mailto:hello@lenanalabs.com" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/privacy#terms" },
  ];

  return (
    <footer className="bg-[var(--color-ink)] text-white pt-20 pb-12">
      <Container>
        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          {/* Brand Info (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 bg-[var(--color-carmine)] inline-block flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="font-bold text-xl tracking-tight uppercase">
                  Lenana Labs
                </span>
              </div>
              <p className="type-body text-white/70 mt-6 max-w-[32ch]">
                Technology solutions company based in Nairobi, Kenya. We engineer high-performance systems and digital infrastructure.
              </p>
            </div>
            <div className="mt-8 font-mono text-xs text-white/40">
              0°09&apos;S 37°18&apos;E — MOUNT KENYA RIDGE
            </div>
          </div>

          {/* Navigate (Cols 6-7) */}
          <div className="lg:col-span-2">
            <FooterColumn label="Navigate" links={navigateLinks} />
          </div>

          {/* Connect (Cols 8-9) */}
          <div className="lg:col-span-2">
            <FooterColumn label="Connect" links={connectLinks} />
          </div>

          {/* Legal (Cols 10-12) */}
          <div className="lg:col-span-3">
            <FooterColumn label="Legal" links={legalLinks} />
          </div>
        </div>

        {/* Divider */}
        <Rule weight="thin" variant="dark" />

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/60">
          <span>© 2026 Lenana Labs. All rights reserved.</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-[var(--color-sulphur)] transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </Container>
    </footer>
  );
}
