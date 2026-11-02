import type { ProjectCategory } from "./projects";

// Owner-requested layout marks, not project records or published-work counts.
export const archivePlaceholderCounts: Record<ProjectCategory, number> = {
  client: 2,
  product: 4,
  experiment: 3,
};
