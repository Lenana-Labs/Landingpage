import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { TextLink } from "../ui/text-link";

export function ContactCard() {
  return (
    <div className="bg-[var(--color-sulphur)] p-8 md:p-16 border-t-2 border-[var(--color-ink)]">
      <div className="swiss-grid">
        {/* Label (cols 1–3) */}
        <div className="grid-col-label">
          <Label variant="default">04 / Contact</Label>
        </div>

        {/* Content (cols 4–12) */}
        <div className="grid-col-content">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            <div>
              <h2 className="type-h1 font-bold text-[var(--color-ink)]">
                Let&apos;s build something.
              </h2>
              <p className="type-body-lg text-[var(--color-ink)] mt-6 max-w-[44ch]">
                Whether you have an ambitious platform to architect or a complex distributed system to scale, we engineer solutions that perform.
              </p>
              <div className="mt-8">
                <Button
                  variant="primary"
                  arrow
                  href="mailto:hello@lenanalabs.com?subject=Project%20Inquiry%20via%20Lenana%20Labs"
                >
                  Start a project
                </Button>
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="border-t lg:border-t-0 lg:border-l border-[var(--color-ink)]/20 pt-8 lg:pt-0 lg:pl-12 flex flex-col space-y-4">
              <span className="type-label text-[var(--color-ink)] opacity-70">
                Direct Inquiries
              </span>
              <TextLink
                href="mailto:hello@lenanalabs.com"
                className="type-body-lg font-medium text-[var(--color-ink)]"
              >
                hello@lenanalabs.com
              </TextLink>
              <TextLink
                href="tel:+254700000000"
                className="type-body-lg font-medium text-[var(--color-ink)]"
              >
                +254 (0) 700 000 000
              </TextLink>
              <div className="pt-2">
                <span className="type-label text-[var(--color-ink)] opacity-70 block mb-1">
                  Location
                </span>
                <span className="type-body font-mono text-[var(--color-ink)]">
                  Nairobi, Kenya
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
