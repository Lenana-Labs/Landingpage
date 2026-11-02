import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import SkipLink from "@/components/ui/SkipLink";
import ClosingCta from "@/components/layout/ClosingCta";
import ProjectsContent from "@/components/projects/ProjectsContent";
import { site } from "@/config/site";
import "./projects.css";

export const metadata: Metadata = {
  title: "Projects — LenanaLabs",
  description: "Client engineering, internal products and technical experiments from LenanaLabs. Only approved public work appears in the archive.",
  ...(site.url ? { alternates: { canonical: "/projects" } } : {}),
  openGraph: { title: "Projects — LenanaLabs", description: "Things we’re building, testing, and exploring.", ...(site.url ? { url: "/projects" } : {}) },
  twitter: { card: "summary_large_image", title: "Projects — LenanaLabs", description: "Things we’re building, testing, and exploring." },
};

export default function ProjectsPage() {
  return <><SkipLink /><Header activePage="/projects" /><main id="main-content" tabIndex={-1} className="projects-page">
    <ProjectsContent /><ClosingCta title="Have a problem worth exploring?" />
  </main><Footer /></>;
}
