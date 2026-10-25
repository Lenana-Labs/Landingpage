import React from "react";
import Link from "next/link";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Label } from "@/components/ui/label";
import { Rule } from "@/components/layout/rule";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper)]">
      <Header />
      <main id="main-content" className="flex-grow flex items-center">
        <Section variant="paper" className="w-full py-24">
          <Container>
            <div className="swiss-grid">
              <div className="grid-col-label">
                <Label variant="carmine">ERROR / 404</Label>
              </div>
              <div className="grid-col-content">
                <h1 className="type-display text-[var(--color-carmine)] font-bold tracking-tighter">
                  404
                </h1>
                <Rule weight="heavy" className="my-8" />
                <h2 className="type-h2 font-bold text-[var(--color-ink)] mb-4">
                  Page not found.
                </h2>
                <p className="type-body-lg text-[var(--color-muted)] max-w-[48ch] mb-8">
                  The coordinates you requested do not exist within our system topology or have been relocated.
                </p>
                <div>
                  <Link
                    href="/"
                    className="btn btn--primary"
                  >
                    Return to Home →
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
