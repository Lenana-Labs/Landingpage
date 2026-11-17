import Image from "next/image";
import Link from "next/link";
import { lenske } from "@/data/lenske";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getPublicProjects, safeProjectUrl, type LabProject } from "@/data/projects";
export default function Lab({ entries }: {
    entries?: LabProject[];
}) {
    const publicEntries = getPublicProjects(entries);
    return <section className="band band--tight" id="lab" aria-labelledby="lab-heading">
    <div className="shell lab-grid">
    <div>
    <p className="section-label mono">04 / Lab</p>
    <h2 className="h2" id="lab-heading">Room for what<br />comes next.</h2>
    <p className="body">Experiments, tools, and products — shared when there is something real to show.</p>
    {publicEntries.some(project => project.id === "lenske") && <p className="body">Meet Lenske, our visual archive for Kenyan photography. For the stories you want to tell, and the perspectives worth sharing.</p>}
    </div>
    <div className="log">
    <div className="log-head mono">
    <span>Lab log</span>
    <span>{publicEntries.length} {publicEntries.length === 1 ? "entry" : "entries"}</span>
    </div>
      {publicEntries.length ? publicEntries.map(project => <article className="project-entry" key={project.id}>
        {project.id === "lenske" && <Link className="lab-product-image" href={lenske.href} aria-label="Explore Lenske"><Image src={lenske.image.src} alt={lenske.image.alt} width={1024} height={1024} sizes="(max-width: 1100px) 90vw, 45vw" /></Link>}
        <p className="mono">{project.categoryLabel} / {project.statusLabel}</p>
        <h3>{project.productPage ? <Link href={project.productPage}>{project.title}<ArrowUpRight size={18} aria-hidden="true" /></Link> : safeProjectUrl(project.url) ? <a href={safeProjectUrl(project.url)} target="_blank" rel="noopener noreferrer">{project.title} <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
            </a> : project.title}</h3>
        <p>{project.description}</p>
        {project.productPage && <Link className="link-arrow" href={project.productPage}>Explore {project.title}<ArrowUpRight size={18} aria-hidden="true" /></Link>}
        </article>) : <div className="log-body">
        <p className="empty-title">No public entries yet.</p>
        <p>We are an early-stage studio. Our public log will grow with work we can share.</p>
        </div>}
      <div className="log-foot">
    <a className="link-arrow" href="/contact">Ask what we are exploring <ArrowRight size={18} aria-hidden="true" />
    </a>
    </div>
    </div>
  </div>
    </section>;
}
