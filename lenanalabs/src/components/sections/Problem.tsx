import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ProblemBlock from "@/components/cards/ProblemBlock";
import Grid from "@/components/ui/Grid";

export default function Problem() {
  return (
    <Section id="problem" variant="paper" topRule>
      <Container>
        <SectionHeader
          index="01"
          label="THE PROBLEM"
          title="Fragile software paradigms are failing modern critical systems."
          description="Most software architectures are built on layers of ephemeral abstractions that collapse under real-world latency, regional partition, and mission-critical scale."
        />

        <div className="pt-6 sm:pt-10">
          <Grid>
            <div className="col-span-12 lg:col-span-10">
              <ProblemBlock
                label="STRUCTURAL SYSTEMIC BOTTLENECKS"
                statement="High-velocity enterprises and frontier markets need resilient, deterministic computational infrastructure — not brittle cloud bloat."
                subtext="Between rising cloud vendor lock-in, unverified black-box models, and brittle microservices networks, engineering teams spend 70% of engineering cycles defending against runtime failure rather than delivering breakthrough core product capability."
              />
            </div>
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
