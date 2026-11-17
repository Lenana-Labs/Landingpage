import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import SkipLink from "@/components/ui/SkipLink";
import { site } from "@/config/site";
import "./legal.css";

export type LegalSection = { id: string; title: string; content: ReactNode };
export default function LegalPage({ title, introduction, sections, related }: {
  title: string; introduction: string; sections: LegalSection[]; related: { href: string; label: string };
}) {
  return <><SkipLink /><Header activePage="" />
    <main id="main-content" tabIndex={-1} className="legal-page">
      <div className="shell">
        <header className="legal-hero">
          <h1>{title}</h1>
          <div className="legal-deck"><p>{introduction}</p><p className="legal-version">Interim draft · prepared <time dateTime="2026-11-10">10 November 2026</time></p></div>
        </header>
        <aside className="legal-notice" aria-label="Document status">
          <strong>A working draft, clearly stated.</strong>
          <p>This detailed placeholder is available while LenanaLabs prepares its own approved policy. It has not been adopted as a final legal document. Company details and operational practices still need confirmation; your statutory rights are unaffected.</p>
        </aside>
        <div className="legal-layout">
          <aside className="legal-rail">
            <nav aria-label="On this page"><h2>On this page</h2><ul>{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ul></nav>
            <Link className="legal-related" href={related.href}>{related.label}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </aside>
          <article className="legal-article" aria-label={title}>
            {sections.map(section => <section className="legal-section" id={section.id} aria-labelledby={`${section.id}-heading`} key={section.id}><h2 id={`${section.id}-heading`}>{section.title}</h2>{section.content}</section>)}
            <section className="legal-contact" aria-labelledby="legal-contact-heading"><h2 id="legal-contact-heading">Let&apos;s clear it up.</h2><p>Have a question about this document or a request for the studio? Email us directly.</p><a href={`mailto:${site.email}`}>{site.email}<ArrowUpRight size={20} aria-hidden="true" /></a></section>
          </article>
        </div>
      </div>
    </main><Footer /></>;
}
