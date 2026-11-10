import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PublicProject } from "@/data/projects";

export default function ProjectEntry({ project, index, featured = false, mirrored = false }: { project: PublicProject; index: number; featured?: boolean; mirrored?: boolean }) {
  const destination = project.caseStudy?.url || project.url;
  return <article id={`p-${project.slug}`} className={`work-plate${featured ? " plate--featured" : ""}${mirrored ? " plate--flip" : ""}`}>
    <div className="plate-meta"><span className="plate-no">{String(index + 1).padStart(2, "0")}</span><span className="plate-kind">{featured ? "Selected" : project.categoryLabel}</span>{project.year && <span className="plate-year">{project.year}</span>}</div>
    <div className="plate-body">
      {featured && <p className="plate-label">Selected work</p>}
      <span className={`plate-status plate-status--${project.status}`}>{project.statusLabel}</span>
      <h3>{destination ? <a href={destination} target="_blank" rel="noopener noreferrer">{project.title}<span className="sr-only"> (opens in a new tab)</span></a> : project.title}</h3>
      <p>{project.description}</p>
      {project.client?.name && <p className="project-client">For {project.client.website ? <a href={project.client.website} target="_blank" rel="noopener noreferrer">{project.client.name}<span className="sr-only"> (opens in a new tab)</span></a> : project.client.name}</p>}
      {project.client?.logo && <Image className="client-logo" src={project.client.logo.src} alt={project.client.logo.alt} width={120} height={48} unoptimized={project.client.logo.src.startsWith("http")} />}
      {project.technologies?.length ? <ul className="plate-tags" aria-label="Technologies">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul> : null}
      {project.services?.length ? <p className="project-services">Services: {project.services.join(", ")}</p> : null}
      {project.caseStudy?.outcomes?.length ? <ul className="project-outcomes" aria-label="Verified outcomes">{project.caseStudy.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul> : null}
      {destination && <a className="plate-link" href={destination} target="_blank" rel="noopener noreferrer">{project.caseStudy?.url ? "Read case study" : "View project"}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
    </div>
    <div className={`plate-visual${project.image ? " plate-visual--image" : ""}`} aria-hidden={project.image ? undefined : true}>
      {project.image ? <Image src={project.image.src} alt={project.image.alt} fill sizes="(max-width: 768px) 90vw, 25vw" unoptimized={project.image.src.startsWith("http")} /> : <span className="mark">No preview</span>}
    </div>
  </article>;
}
