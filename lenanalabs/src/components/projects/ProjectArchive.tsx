"use client";

import { useState } from "react";
import type { PublicProject } from "@/data/projects";
import { filterProjects, type ProjectFilter } from "@/lib/project-filters";
import ArchiveIndex, { type ArchiveCategory } from "./ArchiveIndex";
import ProjectEntry from "./ProjectEntry";

export default function ProjectArchive({ entries, categories }: { entries: readonly PublicProject[]; categories: readonly ArchiveCategory[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [preview, setPreview] = useState("");
  const visible = filterProjects(entries, filter);
  const meaningfulCategories = categories.filter(category => entries.some(project => project.category === category.key));
  const choices = [{ key: "all" as const, label: "All" }, ...meaningfulCategories];
  // Featured placement is explicit. No array-position inference, even for one entry.
  const ordered = [...visible.filter(project => project.featured), ...visible.filter(project => !project.featured)];

  return <>
    <ArchiveIndex entries={visible} categories={categories} preview={preview} onPreview={setPreview} />
    {meaningfulCategories.length > 1 && <div className="filters" role="group" aria-label="Filter projects by category"><span className="mono lbl">Filter</span>{choices.map(choice => <button className="filter" key={choice.key} type="button" aria-pressed={filter === choice.key} onClick={() => { setFilter(choice.key); setPreview(''); }}>
      {choice.label}<span className="count">{filterProjects(entries, choice.key).length}</span>
    </button>)}</div>}
    <div className="entries" id="project-entries">{ordered.map((project, index) => <ProjectEntry key={project.slug} project={project} index={index} featured={project.featured} />)}</div>
    <p className="sr-only" role="status">{visible.length} {visible.length === 1 ? 'project' : 'projects'} shown.</p>
  </>;
}
