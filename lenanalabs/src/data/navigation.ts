export interface NavDropdownItemData {
  index: string;
  title: string;
  description: string;
  href: string;
}

export interface NavItemData {
  label: string;
  href: string;
  isExternal?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: NavDropdownItemData[];
  footerLink?: {
    label: string;
    href: string;
  };
}

export const navigationItems: NavItemData[] = [
  {
    label: "Products",
    href: "#products",
    hasDropdown: true,
    dropdownItems: [
      {
        index: "01",
        title: "Strata Engine",
        description: "High-throughput transactional event processing runtime",
        href: "#products",
      },
      {
        index: "02",
        title: "Atlas Pulse",
        description: "Real-time logistics and telemetry intelligence platform",
        href: "#products",
      },
      {
        index: "03",
        title: "Rift Vector",
        description: "Private semantic search and sovereign LLM orchestrator",
        href: "#products",
      },
      {
        index: "04",
        title: "Safiri Mesh",
        description: "Decentralized offline-first synchronization protocol",
        href: "#products",
      },
    ],
    footerLink: {
      label: "All products →",
      href: "#products",
    },
  },
  {
    label: "Solutions",
    href: "#solutions",
    hasDropdown: true,
    dropdownItems: [
      {
        index: "01",
        title: "Web & Product",
        description: "Resilient digital products, web platforms, and design systems",
        href: "#solutions",
      },
      {
        index: "02",
        title: "AI & Data",
        description: "Intelligent automation, RAG pipelines, and data infrastructure",
        href: "#solutions",
      },
      {
        index: "03",
        title: "Custom Software",
        description: "High-throughput backends, APIs, and mission-critical systems",
        href: "#solutions",
      },
    ],
    footerLink: {
      label: "All capabilities →",
      href: "#solutions",
    },
  },
  {
    label: "Devs",
    href: "https://github.com/lenanalabs",
    isExternal: true,
    hasDropdown: false,
  },
];
