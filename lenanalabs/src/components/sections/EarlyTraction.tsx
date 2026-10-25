import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import StatBlock, { Stat } from "@/components/cards/StatBlock";
import Grid from "@/components/ui/Grid";

const stats: Stat[] = [
  {
    value: "$140M+",
    annotation: "MONTHLY PROCESSED VOLUME",
    label: "Total value routed through Lenana transaction kernels across 6 emerging economies.",
  },
  {
    value: "99.999%",
    annotation: "HISTORICAL UPTIME SLA",
    label: "Deterministic execution uptime across edge-partitioned nodes in 2024–2026.",
  },
  {
    value: "42ms",
    annotation: "MEDIAN SETTLEMENT LATENCY",
    label: "End-to-end consensus time achieved across trans-African optical transit networks.",
  },
  {
    value: "4",
    annotation: "INDEPENDENT SPIN-OUT VENTURES",
    label: "Production companies operating autonomously from the Lenana Labs incubation portfolio.",
  },
];

export default function EarlyTraction() {
  return (
    <Section id="early-traction" variant="sulphur" topRule>
      <Container>
        <SectionHeader
          index="06"
          label="EARLY TRACTION"
          title="Empirical telemetry from systems running under live pressure."
          description="We measure our success not in vanity engagement, but in raw computational throughput, uptime guarantees, and institutional capital preserved."
        />

        <div className="pt-8">
          <Grid>
            {stats.map((stat) => (
              <div
                key={stat.annotation}
                className="col-span-12 sm:col-span-4 lg:col-span-3"
              >
                <StatBlock stat={stat} />
              </div>
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
