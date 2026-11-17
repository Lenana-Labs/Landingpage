import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import SkipLink from "@/components/ui/SkipLink";
import InquiryForm from "@/components/forms/InquiryForm";
import { site } from "@/config/site";
import "./contact.css";

const description = "Tell us about the problem, idea, or project you're working on. No elaborate brief required.";
export const metadata: Metadata = {
  title: "Contact — LenanaLabs", description,
  ...(site.url ? { alternates: { canonical: "/contact" } } : {}),
  openGraph: { title: "Contact — LenanaLabs", description, ...(site.url ? { url: "/contact" } : {}) },
  twitter: { card: "summary_large_image", title: "Contact — LenanaLabs", description },
};

export default function ContactPage() {
  return <><SkipLink /><Header activePage="/contact" />
    <main id="main-content" tabIndex={-1} className="inquiry-page">
      <section className="inquiry-main" aria-labelledby="inquiry-heading">
        <div className="shell inquiry-grid">
          <div className="inquiry-intro">
            <p className="mono inquiry-label">04 / Contact</p>
            <h1 id="inquiry-heading">Let&apos;s<br />talk<span>.</span></h1>
            <h2>Have something in mind?</h2>
            <p>Tell us about the problem, idea, or project you&apos;re working on.</p>
            <p>No elaborate brief required.</p>
          </div>
          <div className="inquiry-form-column" id="contact-form"><InquiryForm /></div>
        </div>
      </section>
      <section className="inquiry-direct" aria-label="Direct contact">
        <div className="shell inquiry-direct-row">
          <div><h2 className="mono">Prefer email?</h2>
            <a className="inquiry-mail" href={`mailto:${site.email}`}>{site.email}<ArrowUpRight size={24} aria-hidden="true" /></a>
          </div>
          <div><h2 className="mono">Based in</h2><p className="inquiry-place">Kenya</p><p>Nairobi · {site.timezone}</p></div>
        </div>
      </section>
    </main><Footer /></>;
}
