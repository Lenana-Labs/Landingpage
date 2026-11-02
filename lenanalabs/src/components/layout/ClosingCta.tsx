import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import "./ClosingCta.css";

export default function ClosingCta({ title, label = "Next", about = false }: { title: string; label?: string; about?: boolean }) {
  return <section className="closing-cta" id="page-contact" aria-labelledby="closing-heading"><div className="shell closing-grid">
    <p className="section-label mono closing-label">{label}</p><h2 id="closing-heading">{title}</h2>
    <div className="closing-actions"><Link className="btn" href="/#contact">Start a conversation <ArrowUpRight size={18} aria-hidden="true" /></Link>
      <a className="closing-mail" href={`mailto:${site.email}`}>{site.email}</a>{about && <p className="closing-place">{site.location} · {site.timezone}</p>}
    </div>
  </div></section>;
}
