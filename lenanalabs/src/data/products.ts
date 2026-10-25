export interface Product {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  href: string;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "strata-core",
    index: "01",
    name: "Strata Engine",
    tagline: "High-throughput transactional event processing engine",
    description: "Distributed ledger and event-sourcing runtime engineered for high-concurrency African financial corridors.",
    tags: ["Distributed Systems", "Rust", "Event Streaming"],
    href: "#contact",
    isFeatured: true,
  },
  {
    id: "atlas-pulse",
    index: "02",
    name: "Atlas Pulse",
    tagline: "Real-time logistics and telemetry intelligence",
    description: "Low-latency spatial data stream processor and routing optimizer for pan-African fleet operators.",
    tags: ["Telemetry", "Geospatial", "IoT"],
    href: "#contact",
  },
  {
    id: "rift-vector",
    index: "03",
    name: "Rift Vector",
    tagline: "Private retrieval and contextual intelligence platform",
    description: "Enterprise-grade semantic search and LLM orchestrator running fully within compliant sovereign cloud boundaries.",
    tags: ["AI & Search", "Vector Store", "Security"],
    href: "#contact",
  },
  {
    id: "safiri-mesh",
    index: "04",
    name: "Safiri Mesh",
    tagline: "Decentralized offline-first sync protocol",
    description: "Peer-to-peer data synchronization protocol designed for intermittent connectivity in emerging market field operations.",
    tags: ["Edge Computing", "CRDT", "Offline-first"],
    href: "#contact",
  },
];
