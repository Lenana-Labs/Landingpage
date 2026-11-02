import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getPublicProjects, projectCategories, type Project } from "@/data/projects";
import { archivePlaceholderCounts } from "@/data/archive-placeholders";
import ArchiveIndex from "./ArchiveIndex";
import ProjectArchive from "./ProjectArchive";

export default function ProjectsContent({ entries }: { entries?: readonly Project[] }) {
  // Unpublished source records never cross the client-component boundary.
  const publicProjects = getPublicProjects(entries);
  const usedCategories = new Set(publicProjects.map(project => project.category)).size;
  const dates = publicProjects.map(project => project.updatedAt).filter((date): date is string => Boolean(date && /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(Date.parse(date))));
  const lastUpdated = dates.sort().at(-1);

  return <>
    <section className="projects-hero" aria-labelledby="projects-heading"><div className="shell">
      <div className="mono-row mono"><span>Projects / Archive</span><span>Nairobi, Kenya</span></div>
      <div className="ph-grid"><h1 id="projects-heading">Things we&apos;re building, <em>testing</em>, and exploring.</h1>
        <dl className="archive-meta"><div><dt>Entries</dt><dd>{String(publicProjects.length).padStart(3, '0')}</dd></div><div><dt>Categories</dt><dd>{usedCategories} / {projectCategories.length}</dd></div>
          {lastUpdated && <div><dt>Updated</dt><dd><time dateTime={lastUpdated}>{lastUpdated}</time></dd></div>}<div><dt>Status</dt><dd>Open</dd></div></dl>
      </div><div className="ph-lower"><p className="ph-lede">An archive of the studio&apos;s work as it develops — client engineering, internal products, and experiments that have not decided what they are yet. Only work we are allowed to publish appears here.</p></div>
    </div></section>
    <section className="band archive" id="archive" aria-label="Project archive"><div className="shell">
      {publicProjects.length ? <ProjectArchive entries={publicProjects} categories={projectCategories} /> : <>
        <ArchiveIndex entries={publicProjects} categories={projectCategories} placeholderCounts={archivePlaceholderCounts} />
        <div className="empty-state"><h2>The archive is taking shape.</h2><p>We are building and exploring. Work appears here when there is something meaningful to share — with its category, its status, and an honest note about what it is.</p>
          <div className="empty-actions"><Link className="btn" href="/#contact">Talk about a problem <ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="link-arrow" href="/about">Read how we work <ArrowRight size={18} aria-hidden="true" /></Link></div>
        </div>
      </>}
      <div className="defs">{projectCategories.map((category, index) => <article className="def" key={category.key}><span className="n mono">Cat. {String(index + 1).padStart(2, '0')}</span><h3>{category.label}</h3><p>{category.description}</p></article>)}</div>
    </div></section>
  </>;
}
