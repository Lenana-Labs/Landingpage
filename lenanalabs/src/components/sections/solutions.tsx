import React from "react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { SectionHeader } from "../layout/section-header";
import { SolutionItem } from "../cards/solution-item";
import { solutions } from "@/data/solutions";

export function Solutions() {
  return (
    <Section
      id="solutions"
      variant="paper-alt"
      topRule
      ruleWeight="heavy"
    >
      <Container>
        <SectionHeader
          index="03"
          label="SOLUTIONS"
          title="What we can build for you."
          description="We partner with ambitious enterprises and startups to solve high-stakes engineering problems with rigor and speed."
          id="solutions-title"
        />

        {/* 3 columns on desktop, stacked on mobile */}
        <div className="swiss-grid mt-12">
          {solutions.map((item) => (
            <div
              key={item.id}
              className="col-span-12 md:col-span-4"
            >
              <SolutionItem item={item} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
