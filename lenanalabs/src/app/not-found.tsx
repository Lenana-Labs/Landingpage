import { ArrowUpRight, ArrowRight, ArrowUp } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/visuals/BrandMark";
import { contours } from "@/lib/terrain";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found — LenanaLabs",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="not-found">
      <header className="shell error-header">
        <Link className="brand" href="/" aria-label="LenanaLabs home">
          <BrandMark /><span>LenanaLabs</span>
        </Link>
        <span className="mono">A small course correction</span>
      </header>
      <main className="shell error-layout" id="main-content">
        <div className="error-copy">
          <p className="mono error-code">404 / Page not found</p>
          <h1>Off the<br />plotted route.</h1>
          <p>The page you’re looking for may have moved, or the address may be incorrect. There’s a way back.</p>
          <div className="hero-actions">
            <Link className="btn" href="/">Back to the studio <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link className="link-arrow" href="/#contact">Get in touch <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
        <figure className="plate error-plate">
          <div className="plate-head mono"><span>Survey plate / 404</span><span>Route missing</span></div>
          <svg viewBox="0 0 400 470" aria-hidden="true">
            {contours.map(contour => <path key={contour.id} d={contour.d} className={contour.className} />)}
            <path className="route" d="M42 428L96 392L128 348L150 300L164 280" />
            <circle cx="164" cy="280" r="8" fill="var(--chalk)" stroke="var(--signal)" />
            <path d="m160 276 8 8m-8 0 8-8" stroke="var(--signal)" strokeWidth="1.5" />
          </svg>
          <figcaption className="terrain-help">An illustrative map. A route back to the studio.</figcaption>
        </figure>
      </main>
      <footer className="shell error-footer"><span className="mono">{site.name} / {site.location}</span><Link href="/">Return home <ArrowUp size={16} aria-hidden="true" /></Link></footer>
    </div>
  );
}
