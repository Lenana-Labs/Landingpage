import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PublicProject } from "@/data/projects";

export default function ProjectEntry({ project, index, featured = false }: { project: PublicProject; index: number; featured?: boolean }) {
  const destination = project.caseStudy?.url || project.url;
  const details = <>
    <div className="tagline"><span className="cat">{project.categoryLabel}</span><span className={`status status--${project.status}`}>{project.statusLabel}</span>{project.year && <span className="mono">{project.year}</span>}</div>
    {project.client?.name && <p className="project-client">For {project.client.website ? <a href={project.client.website} target="_blank" rel="noopener noreferrer">{project.client.name}<span className="sr-only"> (opens in a new tab)</span></a> : project.client.name}</p>}
    {project.client?.logo && <Image className="client-logo" src={project.client.logo.src} alt={project.client.logo.alt} width={120} height={48} unoptimized={project.client.logo.src.startsWith('http')} />}
    {project.technologies?.length ? <ul className="tech" aria-label="Technologies">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul> : null}
    {project.services?.length ? <p className="project-services">Services: {project.services.join(', ')}</p> : null}
    {project.caseStudy?.outcomes?.length ? <ul className="project-outcomes" aria-label="Verified outcomes">{project.caseStudy.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul> : null}
    {destination && <a className="e-link" href={destination} target="_blank" rel="noopener noreferrer">{project.caseStudy?.url ? "Read case study" : "View project"}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
  </>;

  return <article id={`project-${project.slug}`} className={`entry${featured ? " entry--featured" : ""}`}>
    {featured ? <>
      {project.image && <div className="feature-visual"><Image src={project.image.src} alt={project.image.alt} fill sizes="(max-width:1100px) 90vw, 45vw" unoptimized={project.image.src.startsWith('http')} /></div>}
      <div className={`feature-body${!project.image ? " feature-body--full" : ""}`}><p className="mono">Featured / {project.categoryLabel}</p><h3>{project.title}</h3><p>{project.description}</p>{details}</div>
    </> : <>
      <span className="e-index">{String(index + 1).padStart(2, '0')}</span><div className="e-main"><h3>{project.title}</h3><p>{project.description}</p>
        {project.image && <div className="entry-preview"><Image src={project.image.src} alt={project.image.alt} width={640} height={400} sizes="(max-width:720px) 85vw, 40vw" unoptimized={project.image.src.startsWith('http')} /></div>}
      </div><div className="e-meta">{details}</div>{destination && <ArrowUpRight className="e-arrow" size={20} aria-hidden="true" />}
    </>}
  </article>;
}
