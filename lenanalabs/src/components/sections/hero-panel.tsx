import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export interface HeroPanelProps {
  indexLabel?: string;
  title?: string;
  text?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function HeroPanel({
  indexLabel = "01 / INTRODUCTION",
  title = "We build technology that works.",
  text = "Lenana Labs is a technology solutions company based in Nairobi. We engineer high-performance distributed systems, data intelligence pipelines, and resilient digital products.",
  primaryCtaText = "Our work",
  primaryCtaHref = "#products",
  secondaryCtaText = "Contact",
  secondaryCtaHref = "#contact",
}: HeroPanelProps) {
  return (
    <div className="z-10 bg-[var(--color-sulphur)] text-[var(--color-ink)] p-6 sm:p-10 lg:p-12 w-full lg:max-w-[640px] col-span-12 lg:col-span-6">
      <Label variant="default">{indexLabel}</Label>
      <h1
        id="hero-title"
        className="type-h1 mt-6 lg:mt-8 font-bold text-[var(--color-ink)]"
      >
        {title}
      </h1>
      <p className="type-body-lg mt-6 max-w-[44ch] text-[var(--color-ink)]">
        {text}
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button variant="primary" arrow href={primaryCtaHref}>
          {primaryCtaText}
        </Button>
        <Button variant="outline" href={secondaryCtaHref}>
          {secondaryCtaText}
        </Button>
      </div>
    </div>
  );
}
