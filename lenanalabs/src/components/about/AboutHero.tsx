import {site} from "@/config/site";
import Link from "next/link";
export default function AboutHero() { return (
<section className="about-hero" aria-labelledby="about-heading">
    <div className="shell">
      <div className="mono-row mono"><span>About / 01</span><span>{site.name} · {site.location}</span></div>
      <div className="ah-grid">
        <h1 id="about-heading">Built on <em>curiosity</em>.<br /><span className="thin">Grounded in engineering.</span></h1>
        <nav className="ah-index" aria-label="On this page">
          <p className="mono">On this page</p>
          <ol>
            <li><Link href="#story"><span className="n">01</span> A studio taking shape</Link></li>
            <li><Link href="#beliefs"><span className="n">02</span> What we believe</Link></li>
            <li><Link href="#method"><span className="n">03</span> How we think</Link></li>
            <li><Link href="#explore"><span className="n">04</span> What we explore</Link></li>
            <li><Link href="#team"><span className="n">05</span> The team</Link></li>
          </ol>
        </nav>
      </div>

      <div className="ah-lower">
        <p className="ah-lede">LenanaLabs is a Kenya-based technology engineering studio. We work where the problem is still unclear, the constraints are real, and the honest answer takes more than one attempt.</p>
        <dl className="studio-card">
          <div><dt className="mono">Practice</dt><dd>Engineering · Products · Research</dd></div>
          <div><dt className="mono">Studio</dt><dd>{site.location} · {site.coordinates}</dd></div>
          <div><dt className="mono">Time</dt><dd>EAT / UTC+3</dd></div>
        </dl>
      </div>
    </div>
  </section>
); }
