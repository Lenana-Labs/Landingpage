import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Label } from "@/components/ui/label";
import { Prose } from "@/components/layout/prose";

export const metadata: Metadata = {
  title: "Privacy Policy — Lenana Labs",
  description: "Privacy policy and data governance practices at Lenana Labs.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper)]">
      <Header />
      <main id="main-content" className="flex-grow">
        <Section variant="paper" topRule ruleWeight="heavy">
          <Container>
            <div className="swiss-grid">
              {/* Left label: columns 1–3 */}
              <div className="grid-col-label">
                <Label variant="default">LEGAL / PRIVACY</Label>
                <div className="mt-8">
                  <Link
                    href="/"
                    className="font-mono text-xs text-[var(--color-ink)] hover:text-[var(--color-carmine)] transition-colors inline-flex items-center gap-1"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </div>

              {/* Right content: columns 4–12 */}
              <div className="grid-col-content">
                <h1 className="type-h1 font-bold text-[var(--color-ink)] mb-8">
                  Privacy Policy
                </h1>
                <p className="font-mono text-xs text-[var(--color-muted)] mb-12">
                  EFFECTIVE DATE: OCTOBER 25, 2026
                </p>

                <Prose>
                  <p className="type-body-lg text-[var(--color-ink)]">
                    Lenana Labs (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to transparent, principled data handling. This document details how we treat information collected through our website and client engagements.
                  </p>

                  <h2 className="type-h2 font-bold text-[var(--color-ink)] pt-6 border-t border-[var(--color-ink)]">
                    1. Information We Collect
                  </h2>
                  <p>
                    When you contact us via email, inquiry forms, or telephone, we collect your name, email address, company affiliation, and project scope details. We do not use third-party invasive trackers, session replay recorders, or behavioural ad pixels.
                  </p>

                  <h2 className="type-h2 font-bold text-[var(--color-ink)] pt-6 border-t border-[var(--color-ink)]">
                    2. Purpose of Processing
                  </h2>
                  <p>
                    We process your information exclusively to:
                  </p>
                  <ul className="list-square space-y-2 pl-5 text-[var(--color-ink)]">
                    <li>Evaluate and respond to engineering inquiries and project proposals.</li>
                    <li>Fulfill contractual obligations and execute client technical deliverables.</li>
                    <li>Maintain network security, prevent fraudulent abuse, and protect system integrity.</li>
                  </ul>

                  <h2 className="type-h2 font-bold text-[var(--color-ink)] pt-6 border-t border-[var(--color-ink)]">
                    3. Data Retention & Sovereignty
                  </h2>
                  <p>
                    Client correspondence and project records are retained only as long as necessary to complete commercial transactions and satisfy statutory compliance obligations under Kenyan and international law. We never sell, lease, or monetize your contact details.
                  </p>

                  <h2 className="type-h2 font-bold text-[var(--color-ink)] pt-6 border-t border-[var(--color-ink)]">
                    4. Contact & Inquiries
                  </h2>
                  <p>
                    For inquiries regarding data privacy or to exercise your right to access, rectify, or purge personal records, please reach us directly at{" "}
                    <a
                      href="mailto:privacy@lenanalabs.com"
                      className="text-link font-medium"
                    >
                      privacy@lenanalabs.com
                    </a>.
                  </p>
                </Prose>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
