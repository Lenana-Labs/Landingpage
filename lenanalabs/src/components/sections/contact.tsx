import ContactForm from "@/components/forms/ContactForm";
import EmailContact from "@/components/ui/EmailContact";
import { site } from "@/config/site";
export default function Contact() {
    return <section className="contact" id="contact" aria-labelledby="contact-heading">
    <div className="shell contact-grid">
    <div>
    <p className="section-label mono">05 / Contact</p>
    <h2 id="contact-heading">Have something<br />in mind?</h2>
    <p className="contact-lede">Tell us what is happening, what you have tried, and what would make this worth doing. Start with the problem.</p>
    <EmailContact email={site.email} />
    <dl className="contact-meta">
    <dt className="mono">Studio</dt>
    <dd>{site.location} — {site.timezone}</dd>
    <dt className="mono">Hours</dt>
    <dd>{site.hours}</dd>
    </dl>
    </div>
    <ContactForm />
    </div>
    </section>;
}
