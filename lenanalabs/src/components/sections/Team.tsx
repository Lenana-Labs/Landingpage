import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import TeamMember, { Member } from "@/components/cards/TeamMember";
import Grid from "@/components/ui/Grid";

const members: Member[] = [
  {
    name: "Dr. Kaelo Mwangi",
    role: "CHIEF SCIENTIST & CO-FOUNDER",
    bio: "Former Principal Distributed Systems Researcher at MIT CSAIL. 15+ years engineering deterministic consensus protocols and cryptographic state proofs.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    focusArea: "DISTRIBUTED CONSENSUS",
    link: { label: "Read Research Papers", href: "#" },
  },
  {
    name: "Amina Al-Mansoor",
    role: "HEAD OF SYSTEMS & ARCHITECTURE",
    bio: "Ex-Staff Infrastructure Architect at AWS and Cloudflare. Specializes in low-latency Linux kernels, eBPF telemetry, and high-contention memory models.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    focusArea: "KERNEL TELEMETRY",
    link: { label: "Architecture Notes", href: "#" },
  },
  {
    name: "David Ochieng",
    role: "DIRECTOR OF APPLIED INTELLIGENCE",
    bio: "Pioneered neural edge quantization for low-power telecommunications towers. Published compiler optimizations at NeurIPS and MLSys.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    focusArea: "EDGE COMPILERS",
    link: { label: "Model Benchmarks", href: "#" },
  },
  {
    name: "Elena Rostova",
    role: "HEAD OF VENTURE SYNTHESIS",
    bio: "Previously General Partner at Deep Horizon Ventures and FinTech advisor to Central Bank innovation sandboxes across Emerging Markets.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    focusArea: "CAPITAL STRATEGY",
    link: { label: "Venture Portfolio", href: "#" },
  },
];

export default function Team() {
  return (
    <Section id="team" variant="paper" topRule>
      <Container>
        <SectionHeader
          index="07"
          label="TEAM SNAPSHOT"
          title="Engineers and scientists from the world's most demanding environments."
          description="We are a focused collective of builders who favor deep technical ownership over organizational bureaucracy."
        />

        <div className="pt-6">
          <Grid>
            {members.map((member) => (
              <div
                key={member.name}
                className="col-span-12 sm:col-span-4 lg:col-span-3"
              >
                <TeamMember member={member} />
              </div>
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
