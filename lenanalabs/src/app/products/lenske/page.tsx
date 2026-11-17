import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import SkipLink from "@/components/ui/SkipLink";
import { lenske } from "@/data/lenske";
import { site } from "@/config/site";
import "./lenske.css";

export const metadata: Metadata = {
  title: "Lenske — Kenyan photography by LenanaLabs", description: lenske.description,
  ...(site.url ? { alternates: { canonical: lenske.href } } : {}),
  openGraph: { title: "Lenske — Kenya, in focus", description: lenske.shortDescription, images: [{ url: lenske.image.src, width: 1024, height: 1024, alt: lenske.image.alt }] },
  twitter: { card: "summary_large_image", title: "Lenske — Kenya, in focus", description: lenske.shortDescription, images: [lenske.image.src] },
};
export default function LenskePage() {
  return <><SkipLink /><Header activePage="/projects" /><main id="main-content" tabIndex={-1} className="lenske-page">
    <section className="lenske-hero shell" aria-labelledby="lenske-heading">
      <div className="lenske-intro"><Link className="lenske-back" href="/projects">A LenanaLabs product</Link><h1 id="lenske-heading">Lenske.</h1><p className="lenske-tagline">{lenske.tagline}</p><p className="lenske-description">{lenske.description}</p><a className="btn" href={`mailto:${site.email}?subject=Lenske%20product%20inquiry`}>Ask about Lenske<ArrowUpRight size={20} aria-hidden="true" /></a><p className="lenske-status">In development</p></div>
      <Image className="lenske-hero-image" src={lenske.image.src} alt={lenske.image.alt} width={1024} height={1024} sizes="(max-width: 900px) 90vw, 50vw" priority />
    </section>
    <section className="shell lenske-purpose" aria-labelledby="lenske-purpose-heading"><h2 id="lenske-purpose-heading">A local perspective.</h2><p>Kenya is more than a backdrop. Lenske brings its landscapes, wildlife, city life and culture into a visual archive for people who want to tell a story with a sense of place.</p></section>
    <section className="shell lenske-features" aria-labelledby="lenske-features-heading"><div><h2 id="lenske-features-heading">For finding.<br />For sharing.</h2><p>For the person searching for an image, and the photographer with a perspective to share.</p></div><div className="lenske-feature-list">{lenske.features.map(feature => <article key={feature.title}><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div></section>
    <section className="lenske-close" aria-labelledby="lenske-close-heading"><div className="shell"><div><h2 id="lenske-close-heading">Be part of the picture.</h2><p>Interested in Lenske as a photographer, creative team or collaborator? Start a conversation with the studio.</p></div><a className="btn" href={`mailto:${site.email}?subject=Lenske%20product%20inquiry`}>Talk to us about Lenske<ArrowUpRight size={20} aria-hidden="true" /></a></div></section>
  </main><Footer /></>;
}
