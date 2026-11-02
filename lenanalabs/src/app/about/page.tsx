import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import SkipLink from "@/components/ui/SkipLink";
import AboutHero from "@/components/about/AboutHero";
import Story from "@/components/about/Story";
import Beliefs from "@/components/about/Beliefs";
import Method from "@/components/about/Method";
import ExplorationDiagram from "@/components/about/ExplorationDiagram";
import TeamSection from "@/components/about/TeamSection";
import ClosingCta from "@/components/layout/ClosingCta";
import { site } from "@/config/site";
import "./about.css";

export const metadata: Metadata = {
  title: "About — LenanaLabs",
  description: "An early-stage technology engineering studio in Nairobi, Kenya. How we think, what we believe, and how client engineering, internal products and research feed each other.",
  ...(site.url ? { alternates: { canonical: "/about" } } : {}),
  openGraph: { title: "About — LenanaLabs", description: "Built on curiosity. Grounded in engineering.", ...(site.url ? { url: "/about" } : {}) },
  twitter: { card: "summary_large_image", title: "About — LenanaLabs", description: "Built on curiosity. Grounded in engineering." },
};

export default function AboutPage() {
  return <><SkipLink /><Header activePage="/about" /><main id="main-content" tabIndex={-1} className="about-page">
    <AboutHero /><Story /><Beliefs /><Method /><ExplorationDiagram /><TeamSection />
    <ClosingCta title="Interesting problems deserve curious minds." label="06 / Next" about />
  </main><Footer /></>;
}
