import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, safeProjectUrl, type LabProject } from "@/data/projects";
export default function Lab({ entries = projects }: {
    entries?: LabProject[];
}) {
    return <section className="band band--tight" id="lab" aria-labelledby="lab-heading">
    <div className="shell lab-grid">
    <div>
    <p className="section-label mono">04 / Lab</p>
    <h2 className="h2" id="lab-heading">Room for what<br />comes next.</h2>
    <p className="body">Experiments, tools, and products — shared when there is something real to show.</p>
    </div>
    <div className="log">
    <div className="log-head mono">
    <span>Lab log</span>
    <span>{entries.length} {entries.length === 1 ? "entry" : "entries"}</span>
    </div>
      {entries.length ? entries.map(project => <article className="project-entry" key={project.id}>
        <p className="mono">{project.category} / {project.status}</p>
        <h3>{safeProjectUrl(project.url) ? <a href={safeProjectUrl(project.url)} target="_blank" rel="noopener noreferrer">{project.title} <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
            </a> : project.title}</h3>
        <p>{project.description}</p>
        </article>) : <div className="log-body">
        <p className="empty-title">No public entries yet.</p>
        <p>We are an early-stage studio. Our public log will grow with work we can share.</p>
        </div>}
      <div className="log-foot">
    <a className="link-arrow" href="#contact">Ask what we are exploring <ArrowRight size={18} aria-hidden="true" />
    </a>
    </div>
    </div>
  </div>
    </section>;
}
