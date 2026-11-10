import type { PublicProject, ProjectCategory } from "@/data/projects";
export type ArchiveCategory = { key: ProjectCategory; label: string; description: string };

export default function ArchiveContents({ entries, categories, selected }: {
  entries: readonly PublicProject[]; categories: readonly ArchiveCategory[]; selected?: PublicProject;
}) {
  const used = categories.filter(category => entries.some(project => project.category === category.key)).length;
  return <nav className="contents" aria-label="Archive contents"><ol>
    {categories.map(category => {
      const items = entries.filter(project => project.category === category.key);
      const target = items.some(project => project.slug !== selected?.slug) ? category.key : selected ? `p-${selected.slug}` : undefined;
      const content = <><span className="n">{category.label}</span><span className="c">{String(items.length).padStart(2, "0")}</span></>;
      return <li key={category.key}>{items.length && target ? <a href={`#${target}`}>{content}</a> : <span className="contents-empty">{content}</span>}</li>;
    })}
  </ol><p className="section-note">Three categories · {entries.length ? `${used} in use · ${entries.length} ${entries.length === 1 ? "entry" : "entries"}` : "no published entries yet"}</p></nav>;
}
