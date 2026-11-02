import type { ProjectCategory, PublicProject } from "@/data/projects";

export type ArchiveCategory = { key: ProjectCategory; label: string; description: string };
export default function ArchiveIndex({ entries, categories, preview, onPreview, placeholderCounts }: {
  entries: readonly PublicProject[];
  categories: readonly ArchiveCategory[];
  preview?: string;
  onPreview?: (text: string) => void;
  placeholderCounts?: Partial<Record<ProjectCategory, number>>;
}) {
  const used = categories.filter(category => entries.some(project => project.category === category.key)).length;
  const showPlaceholders = entries.length === 0 && Boolean(placeholderCounts);
  return <figure className="index-plate" aria-labelledby="archive-index-title">
    <div className="ip-head mono"><span id="archive-index-title">Fig. 01 — Archive index</span>{showPlaceholders ? <span>Layout placeholders</span> : entries.length > 0 && <span>{entries.length} {entries.length === 1 ? "entry" : "entries"} · {used} of {categories.length} categories</span>}</div>
    <div className="ip-body">{categories.map(category => {
      const projects = entries.filter(project => project.category === category.key);
      const placeholderCount = showPlaceholders ? Math.max(0, Math.floor(placeholderCounts?.[category.key] || 0)) : 0;
      return <div className="ip-row" key={category.key} data-category={category.key}><span className="ip-cat mono">{category.label}</span><div className="ip-cells">
        {projects.length ? projects.map(project => <a className="ip-mark" key={project.slug} href={`#project-${project.slug}`} aria-label={`${project.title}, ${project.statusLabel}`} title={project.title}
          onPointerEnter={onPreview ? () => onPreview(project.title) : undefined} onFocus={onPreview ? () => onPreview(project.title) : undefined} />) : placeholderCount ? Array.from({ length: placeholderCount }, (_, index) => <span className="ip-placeholder" key={index} aria-hidden="true" />) : <span className="ip-none" aria-hidden="true" />}
      </div><span className="ip-count mono" aria-label={showPlaceholders ? `${placeholderCount} placeholders` : undefined}>{String(showPlaceholders ? placeholderCount : projects.length).padStart(2, '0')}</span></div>;
    })}</div>
    <figcaption className="ip-foot mono"><span className="ip-readout" role="status">{showPlaceholders ? "Illustrative marks, not published projects" : preview || "Each mark is one public entry"}</span><span>{entries.length ? "Indexed by category" : "Nothing indexed yet"}</span></figcaption>
  </figure>;
}
