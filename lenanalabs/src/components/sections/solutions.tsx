import Container from "@/components/ui/Container";
import { capabilities } from "@/content/site";

export default function Solutions() {
  return (
    <section id="solutions" className="capabilities-section" aria-labelledby="capabilities-heading">
      <Container>
        <div className="capabilities-layout">
          <div>
            <h2 id="capabilities-heading" className="section-title">The thinking.<br />And the building.</h2>
            <p className="section-lead">Good software starts with understanding the problem. We connect product thinking with the engineering needed to make it work.</p>
            <a href="#contact" className="inline-link">Find the right approach <span aria-hidden="true">↗</span></a>
          </div>
          <div className="capability-list">
            {capabilities.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p><p className="capability-details">{item.details}</p></article>)}
          </div>
        </div>
      </Container>
    </section>
  );
}
