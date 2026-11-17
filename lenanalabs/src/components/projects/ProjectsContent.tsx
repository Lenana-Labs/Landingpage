import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getPublicProjects, projectCategories, type Project } from "@/data/projects";
import ArchiveContents from "./ArchiveContents";
import ProjectArchive from "./ProjectArchive";

export default function ProjectsContent({ entries }: { entries?: readonly Project[] }) {
  const publicProjects = getPublicProjects(entries);
  const selected = publicProjects.find(project => project.featured);
  return <>
    <section className="work-hero" aria-labelledby="projects-heading"><div className="shell">
      <div className="mono-row mono"><span>Projects / Archive</span><span>Index {String(publicProjects.length).padStart(3, "0")} · Nairobi, Kenya</span></div>
      <div className="wh-grid">
        <div className="wh-head"><h1 id="projects-heading">Work, <em>in progress</em>.</h1></div>
        <div className="wh-status"><p>Only approved work is published.<br />Everything else stays in the studio.</p></div>
        <p className="wh-lede">Client engineering, internal products, and experiments that have not decided what they are yet. Each entry carries its status — because building and shipping are different things.</p>
      </div>
      <ArchiveContents entries={publicProjects} categories={projectCategories} selected={selected} />
    </div></section>
    <div className="shell work-body">
      {publicProjects.length ? <ProjectArchive entries={publicProjects} categories={projectCategories} /> :
        <section className="work-empty" aria-labelledby="empty-heading">
          <p className="section-label mono">Archive / 0 entries</p><h2 id="empty-heading">Nothing published yet.</h2>
          <p>Work appears here once it is real and approved for publication. Until then the archive stays empty — a studio that publishes filler has told you less than one that waits.</p>
          <div className="actions"><Link className="btn" href="/contact">Talk about a problem <ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="link-arrow" href="/about">Read how we work <ArrowRight size={18} aria-hidden="true" /></Link></div>
        </section>}
    </div>
  </>;
}
