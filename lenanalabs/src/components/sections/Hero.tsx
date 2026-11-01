import { ArrowUpRight, ArrowRight } from "lucide-react";
import TerrainVisualization from "@/components/visuals/TerrainVisualization";
export default function Hero() {
    return (<section className="hero" id="top" aria-labelledby="hero-heading">
    <div className="shell">
      <div className="hero-meta">
        <div className="mono-row mono">
    <span>Technology engineering studio</span>
    <span>Nairobi, Kenya</span>
    </div>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-heading">Technology built around <em>real</em> problems.</h1>
          <p className="hero-lede">LenanaLabs is a Kenya-based technology engineering studio. We explore the problem, test what is possible, and build the version that survives contact with reality.</p>
          <div className="hero-actions">
            <a className="btn" href="#contact">Start a conversation <ArrowUpRight className="arrow" size={18} aria-hidden="true" />
    </a>
            <a className="link-arrow" href="#capabilities">Explore what we do <ArrowRight size={18} aria-hidden="true" />
    </a>
          </div>
          <p className="hero-note mono">No deck required. Bring the problem.</p>
        </div>

        <TerrainVisualization />
      </div>

      <ol className="hero-index">
        <li>
    <span className="mono">01</span>
    <span>Engineering solutions</span>
    </li>
        <li>
    <span className="mono">02</span>
    <span>Product development</span>
    </li>
        <li>
    <span className="mono">03</span>
    <span>Research &amp; experimentation</span>
    </li>
      </ol>
    </div>
  </section>);
}
