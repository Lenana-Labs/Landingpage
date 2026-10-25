"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialCard, { TestimonialItem } from "@/components/cards/Testimonial";

const testimonials: TestimonialItem[] = [
  {
    id: "t1",
    quote:
      "Lenana Labs took our cross-border payment settlement engine from intermittent 4-hour batch reconciliations down to verified sub-second finality. Their mathematical rigor is unparalleled.",
    author: "Tariq Ndege",
    role: "Chief Technology Officer",
    organization: "Apex Horizon Financial",
    metric: "4-HOUR BATCHES → 42MS FINALITY",
  },
  {
    id: "t2",
    quote:
      "Unlike conventional consultancies that drop slides and vanish, Lenana embedded their systems architects into our kernel code. They eliminated our memory drift bottlenecks in under three weeks.",
    author: "Sarah Lindqvist",
    role: "VP of Engineering",
    organization: "Kestrel Telemetry Networks",
    metric: "0 MEMORY DRIFT INCIDENTS OVER 18 MONTHS",
  },
  {
    id: "t3",
    quote:
      "Deploying quantized local models across off-grid telemetry towers in rural regions seemed commercially unfeasible until we compiled on Lenana's Kilima Mesh framework.",
    author: "Eng. Moses Mutua",
    role: "Director of Infrastructure",
    organization: "Equator Power Grid Alliance",
    metric: "84% COMPUTE COST REDUCTION",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? testimonials.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1));
  };

  return (
    <Section id="testimonials" variant="paper" topRule>
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <SectionHeader
            index="08"
            label="PEER TESTIMONIALS"
            title="What engineering leaders say after running our systems in production."
            className="mb-0 sm:mb-0"
          />

          {/* Carousel controls */}
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-12 h-12 border border-ink bg-paper text-ink font-mono hover:bg-ink hover:text-paper transition-colors flex items-center justify-center cursor-pointer"
            >
              ←
            </button>
            <span className="font-mono text-xs text-ink/70">
              {currentIndex + 1} / {testimonials.length}
            </span>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-12 h-12 border border-ink bg-paper text-ink font-mono hover:bg-ink hover:text-paper transition-colors flex items-center justify-center cursor-pointer"
            >
              →
            </button>
          </div>
        </div>

        {/* Carousel slide display */}
        <div
          role="region"
          aria-live="polite"
          aria-label="Testimonial carousel"
          className="p-8 sm:p-12 border border-ink bg-paper shadow-[4px_4px_0_0_#0D0D0D] transition-all duration-300"
        >
          <TestimonialCard testimonial={testimonials[currentIndex]} />
        </div>
      </Container>
    </Section>
  );
}
