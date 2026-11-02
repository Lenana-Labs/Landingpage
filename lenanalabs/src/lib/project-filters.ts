import type { ProjectCategory, PublicProject } from "@/data/projects";

export type ProjectFilter = ProjectCategory | "all";
export function filterProjects(entries: readonly PublicProject[], filter: ProjectFilter) {
  return filter === "all" ? [...entries] : entries.filter(project => project.category === filter);
}
