export const navigation = [
  { label: "Products", href: "#products" },
  { label: "Capabilities", href: "#solutions" },
  { label: "About", href: "#introduction" },
  { label: "Contact", href: "#contact" },
];

// Product placeholders retained at the owner's request. Replace these records with real products.
export const products = [
  { id: "aethelgard", name: "Aethelgard Runtime", category: "Distributed systems", description: "An execution environment for coordinating transaction events across distributed systems.", useCase: "For teams designing event-driven infrastructure.", stages: ["Receive", "Validate", "Coordinate", "Record"], color: "red", image: "/images/pexels-brett-sayles-4373997.jpg" },
  { id: "kilima", name: "Kilima Vector Mesh", category: "Edge intelligence", description: "Tools for running local intelligence where a continuous connection to the cloud cannot be assumed.", useCase: "For products that need to operate closer to their data.", stages: ["Collect", "Prepare", "Run locally", "Sync"], color: "yellow", image: "/images/pexels-roman-odintsov-11025019.jpg" },
  { id: "mara", name: "Mara Settlement Bridge", category: "Financial infrastructure", description: "A protocol approach to connecting payment events and reconciliation across financial systems.", useCase: "For teams exploring cross-system payment workflows.", stages: ["Initiate", "Verify", "Reconcile", "Confirm"], color: "gray", image: "/images/pexels-shutter-rwanda-2157056879-37797428.jpg" },
  { id: "sentry", name: "SentryOS Kernel", category: "System observability", description: "Runtime auditing tools for understanding execution behavior and investigating system integrity.", useCase: "For engineering teams working with complex runtimes.", stages: ["Observe", "Inspect", "Trace", "Review"], color: "ink", image: "/images/pexels-cookiecutter-17489151.jpg" },
] as const;

export const capabilities = [
  { title: "Digital products", description: "Web applications and interfaces that make complex workflows feel straightforward.", details: "Product engineering · Design systems · Accessible interfaces" },
  { title: "AI & data systems", description: "Search, retrieval, and data pipelines built around the information your team actually uses.", details: "Semantic search · Data pipelines · Applied AI" },
  { title: "Software infrastructure", description: "APIs, backend services, and distributed systems designed around real operating constraints.", details: "Backend architecture · Integrations · System modernization" },
];

// Temporary contact mailbox selected by the owner. Replace here when the business mailbox is ready.
export const contactEmail = "ngigemwaniki2004@gmail.com";
export const projectEmail = (subject: string, body = "") => `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
