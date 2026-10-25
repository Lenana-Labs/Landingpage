import Container from "@/components/ui/Container";

export default function Introduction() {
  return (
    <section id="introduction" className="about-section" aria-labelledby="about-heading">
      <Container>
        <div className="about-layout">
          <h2 id="about-heading" className="section-title">A clear view.<br />A practical approach.</h2>
          <div className="about-copy">
            <p className="about-statement">Lenana Labs is a software studio based in Nairobi. We work across digital products, data, and infrastructure.</p>
            <p>Our starting point is the environment your software will live in: the people using it, the systems it needs to connect to, and the constraints it needs to handle.</p>
            <p>From there, we focus on a clear scope, useful software, and a foundation your team can build on.</p>
          </div>
        </div>
        <div className="process-section">
          <h3>From the first conversation.</h3>
          <ol className="process-list">
            <li><h4>Understand</h4><p>Map the problem, users, and constraints. Agree on what a useful outcome looks like.</p></li>
            <li><h4>Make</h4><p>Start with the essential workflow. Build, review, and refine with tangible progress.</p></li>
            <li><h4>Carry forward</h4><p>Plan deployment, documentation, and the next steps so the work can keep moving.</p></li>
          </ol>
        </div>
      </Container>
    </section>
  );
}
