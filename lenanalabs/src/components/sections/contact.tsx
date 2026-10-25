import Container from "@/components/ui/Container";
import ProjectBrief from "@/components/cards/ProjectBrief";

export default function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <Container>
        <div className="contact-layout">
          <div><h2 id="contact-heading">What are<br />you building?</h2><p>A new product, a difficult integration, or a system that needs a fresh approach. Start with the problem.</p></div>
          <ProjectBrief />
        </div>
      </Container>
    </section>
  );
}
