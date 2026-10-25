import Image from "next/image";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <Container>
        <div className="hero-copy">
          <h1 id="hero-heading">Built for<br />the real world.</h1>
          <div className="hero-intro">
            <p>We help teams design and build web products, AI tools, and backend systems. Based in Nairobi. Built around your users.</p>
            <a className="action action-primary" href="#products">Explore our work <span aria-hidden="true">↗</span></a>
            <a className="hero-secondary" href="#contact">Have a project in mind?</a>
          </div>
        </div>
        <div className="hero-photograph">
          <Image src="/images/hero-bg.jpg" alt="Nairobi skyline and roads" fill loading="eager" fetchPriority="high" quality={60} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 80px), (max-width: 1279px) calc(100vw - 128px), (max-width: 1439px) calc(100vw - 160px), 1280px" className="object-cover grayscale" />
          <div className="image-caption"><span>Nairobi, Kenya</span><span>Local perspective. Wider possibilities.</span></div>
        </div>
      </Container>
    </section>
  );
}
