export type ProjectCategory = "client" | "product" | "experiment";
export type ProjectStatus = "exploring" | "prototype" | "in-development" | "published";
export type ProjectVisibility = "draft" | "public";
export type ProjectImage = { src: string; alt: string };

export type Project = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  // Legacy categories/status remain accepted; public presentation normalizes them.
  category: ProjectCategory | "open-source";
  status: ProjectStatus | "active";
  visibility?: ProjectVisibility;
  featured?: boolean;
  year?: number;
  updatedAt?: string;
  url?: string;
  image?: ProjectImage;
  services?: string[];
  technologies?: string[];
  client?: { approvedForPublication: boolean; name?: string; logo?: ProjectImage; website?: string };
  caseStudy?: { url?: string; problem?: string; approach?: string; solution?: string; outcomes?: string[]; technicalDetails?: string };
};

// Preserve the existing consumer type. Visibility is opt-in, never inferred from status.
export type LabProject = Project;
export type PublicProject = Omit<Project, "category" | "status" | "visibility" | "slug"> & {
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  visibility: "public";
  categoryLabel: string;
  statusLabel: string;
};

export const projects: Project[] = [];

export const projectCategories: { key: ProjectCategory; label: string; description: string }[] = [
  { key: "client", label: "Client work", description: "Technology built for an external team, published only with their permission and only once it is real." },
  { key: "product", label: "Internal products", description: "Software and tools we own and operate — the decisions in these are ours to live with." },
  { key: "experiment", label: "Experiments", description: "Prototypes and technical investigations, kept even when the answer was ‘not this way’." },
];
export const projectStatuses: Record<ProjectStatus, string> = {
  exploring: "Exploring", prototype: "Prototype", "in-development": "In development", published: "Published",
};

export function safeProjectUrl(url?: string) {
  if (!url || /[\u0000-\u001f\\]/.test(url)) return undefined;
  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol) && !parsed.username && !parsed.password ? parsed.href : undefined;
  } catch { return undefined; }
}

export function safeAssetSource(src?: string) {
  if (!src) return undefined;
  if (/^\/(?!\/)[a-zA-Z0-9/_ .-]+$/.test(src) && !src.split('/').includes('..')) return src;
  return safeProjectUrl(src);
}

function publicImage(image?: ProjectImage): ProjectImage | undefined {
  const src = safeAssetSource(image?.src);
  return image && src ? { src, alt: image.alt } : undefined;
}

/** Call on the server before passing data to any interactive presentation. */
export function getPublicProjects(entries: readonly Project[] = projects): PublicProject[] {
  const eligible = entries.filter(project => project.visibility === "public" &&
    (project.category !== "client" || project.client?.approvedForPublication === true) &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug || project.id));
  const counts = new Map<string, number>();
  eligible.forEach(project => { const slug = project.slug || project.id; counts.set(slug, (counts.get(slug) || 0) + 1); });
  return eligible.filter(project => counts.get(project.slug || project.id) === 1).map(project => ({
    id: project.id, slug: project.slug || project.id, title: project.title, description: project.description,
    category: project.category === "open-source" ? "experiment" : project.category,
    status: project.status === "active" ? "in-development" : project.status,
    categoryLabel: projectCategories.find(category => category.key === (project.category === "open-source" ? "experiment" : project.category))!.label,
    statusLabel: projectStatuses[project.status === "active" ? "in-development" : project.status],
    visibility: "public", featured: project.featured === true, year: project.year, updatedAt: project.updatedAt,
    url: safeProjectUrl(project.url), image: publicImage(project.image),
    services: project.services, technologies: project.technologies,
    client: project.client?.approvedForPublication ? {
      approvedForPublication: true, name: project.client.name, logo: publicImage(project.client.logo), website: safeProjectUrl(project.client.website),
    } : undefined,
    caseStudy: project.caseStudy ? {
      url: safeProjectUrl(project.caseStudy.url), problem: project.caseStudy.problem, approach: project.caseStudy.approach,
      solution: project.caseStudy.solution, outcomes: project.caseStudy.outcomes, technicalDetails: project.caseStudy.technicalDetails,
    } : undefined,
  }));
}
