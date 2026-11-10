import type { PublicProject } from "@/data/projects";
import type { ArchiveCategory } from "./ArchiveContents";
import ProjectEntry from "./ProjectEntry";

/** Server-rendered sections. First explicitly featured public record wins. */
export default function ProjectArchive({ entries, categories }: { entries: readonly PublicProject[]; categories: readonly ArchiveCategory[] }) {
  const selected = entries.find(project => project.featured);
  const remaining = entries.filter(project => project.slug !== selected?.slug);
  return <>
    {selected && <section className="selected-work" aria-labelledby="selected-heading"><h2 className="sr-only" id="selected-heading">Selected work</h2><div className="plates"><ProjectEntry project={selected} index={0} featured /></div></section>}
    {categories.map(category => {
      const items = remaining.filter(project => project.category === category.key);
      if (!items.length) return null;
      const selectedCount = selected?.category === category.key ? 1 : 0;
      return <section className="work-section" id={category.key} aria-labelledby={`h-${category.key}`} key={category.key}>
        <div className="ws-head"><div className="ws-title"><span className="n" aria-hidden="true">{category.label.slice(0, 2).toUpperCase()}</span><h2 id={`h-${category.key}`}>{category.label}</h2><span className="ws-count">{String(items.length + selectedCount).padStart(2, "0")}</span>{selectedCount > 0 && <span className="ws-note">· 1 selected above</span>}</div><p className="ws-desc">{category.description}</p></div>
        <div className="plates">{items.map((project, index) => <ProjectEntry key={project.slug} project={project} index={index} mirrored={index % 2 === 1} />)}</div>
      </section>;
    })}
  </>;
}
