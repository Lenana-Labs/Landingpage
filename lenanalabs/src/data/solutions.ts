export interface SolutionCategory {
  id: string;
  index: string;
  title: string;
  description: string;
  capabilities: string[];
  href: string;
}

export const solutions: SolutionCategory[] = [
  {
    id: "web-product",
    index: "01",
    title: "Web & Product",
    description: "We architect resilient digital experiences and responsive web platforms built for speed, accessibility, and strict brand fidelity.",
    capabilities: [
      "Modern Web Applications",
      "Design Systems & Component Libraries",
      "Performance & Core Web Vitals Optimization",
      "Progressive Web Apps & Offline Support",
    ],
    href: "#contact",
  },
  {
    id: "ai-data",
    index: "02",
    title: "AI & Data",
    description: "We build tailored retrieval systems, predictive intelligence, and streaming data pipelines that transform raw data into operational leverage.",
    capabilities: [
      "Custom LLM & RAG Pipelines",
      "Event-Driven Streaming Architectures",
      "Semantic Search & Vector Indexing",
      "Automated Decision Engines",
    ],
    href: "#contact",
  },
  {
    id: "custom-software",
    index: "03",
    title: "Custom Software",
    description: "We engineer robust distributed backends, developer tools, and critical infrastructure designed to scale reliably under intense demand.",
    capabilities: [
      "High-Throughput Distributed Systems",
      "API Design & Cloud Infrastructure",
      "Financial & Payment Protocols",
      "Legacy Modernization & Code Audits",
    ],
    href: "#contact",
  },
];
