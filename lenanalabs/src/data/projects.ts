export type LabProject = {
  id: string;
  title: string;
  description: string;
  category: "product" | "experiment" | "open-source" | "client";
  status: "exploring" | "prototype" | "active" | "published";
  url?: string;
};

// Add only verified work that the studio has permission to publish.
export const projects: LabProject[] = [];

export function safeProjectUrl(url?: string) {
  if (!url) return undefined;
  try { const parsed = new URL(url); return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : undefined; }
  catch { return undefined; }
}
