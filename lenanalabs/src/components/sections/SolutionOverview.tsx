import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import SolutionOverviewCard, { Pillar } from "@/components/cards/SolutionOverview";

const pillars: Pillar[] = [
  {
    index: "01",
    label: "FOUNDATIONAL RIGOR",
    title: "Deterministic Systems Architecture",
    description:
      "We design state machines and runtime fabrics that execute predictably under high contention, degraded network topologies, and asynchronous events.",
  },
  {
    index: "02",
    label: "LOCAL EXECUTION",
    title: "Edge-Native & Offline-First Intelligence",
    description:
      "Compute where data originates. By deploying low-footprint quantized models and local-first synchronization, our platforms eliminate single points of global failure.",
  },
  {
    index: "03",
    label: "CONTINUOUS OBSERVABILITY",
    title: "Formal Verification & Telemetry",
    description:
      "Every module ships with mathematical proofs, end-to-end tracing, and zero-drift invariant testing built directly into the compilation pipeline.",
  },
  {
    index: "04",
    label: "LONG-HORIZON UTILITY",
    title: "Open Protocols & Sovereign Control",
    description:
      "No proprietary silos. We champion modular interfaces, open specifications, and full cryptographic sovereignty for institutional operators.",
  },
];

export default function SolutionOverview() {
  return (
    <Section id="solution-overview" variant="paper" topRule>
      <Container>
        <SectionHeader
          index="02"
          label="SOLUTION OVERVIEW"
          title="The Lenana Framework: Four architectural pillars."
          description="A disciplined engineering discipline designed to replace chaotic complexity with deterministic simplicity."
        />

        <div className="pt-4">
          <SolutionOverviewCard pillars={pillars} />
        </div>
      </Container>
    </Section>
  );
}
