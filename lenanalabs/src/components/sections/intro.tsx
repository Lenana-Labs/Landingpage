import React from "react";
import { HeroImage } from "./hero-image";
import { HeroPanel } from "./hero-panel";

export function Intro() {
  return (
    <section
      id="intro"
      aria-labelledby="hero-title"
      className="relative isolation-auto min-h-[max(80vh,560px)] max-sm:min-h-[70svh] flex items-end bg-[var(--color-ink)] overflow-hidden"
    >
      {/* Background B&W Mount Kenya landscape image */}
      <HeroImage />

      {/* Main Container - full width, block flush to bottom */}
      <div className="w-full mx-auto max-w-[var(--max-width)] px-0 sm:px-[var(--margin)]">
        <div className="swiss-grid">
          <HeroPanel
            indexLabel="01 / INTRODUCTION"
            title="We build technology that works."
            text="Lenana Labs is a technology solutions company based in Nairobi. We engineer high-performance distributed systems, data intelligence pipelines, and resilient digital products."
            primaryCtaText="Our work"
            primaryCtaHref="#products"
            secondaryCtaText="Contact"
            secondaryCtaHref="#contact"
          />
        </div>
      </div>
    </section>
  );
}
