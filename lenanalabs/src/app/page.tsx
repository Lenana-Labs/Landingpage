import React from "react";
import { Header } from "@/components/sections/header";
import { Intro } from "@/components/sections/intro";
import { StatBlock } from "@/components/cards/stat-block";
import { Products } from "@/components/sections/products";
import { Solutions } from "@/components/sections/solutions";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

const heroStats = [
  {
    value: "4+",
    label: "Core Systems",
    subtext: "High-throughput engines",
  },
  {
    value: "99.99%",
    label: "Target Reliability",
    subtext: "Mission-critical SLAs",
  },
  {
    value: "<5ms",
    label: "Stream Latency",
    subtext: "Edge-optimized routing",
  },
  {
    value: "NBO",
    label: "Nairobi, KE",
    subtext: "0°09'S 37°18'E",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper)]">
      <Header />
      <main id="main-content" className="flex-grow">
        {/* 01 / Introduction (Hero) */}
        <Intro />

        {/* Technical Metric Strip directly below hero */}
        <StatBlock stats={heroStats} />

        {/* 02 / Products (Ruled List) */}
        <Products />

        {/* 03 / Solutions (3 Columns with Square Bullets) */}
        <Solutions />

        {/* 04 / Contact Card (Sulphur Block) */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
