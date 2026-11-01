import Reveal from "@/components/ui/Reveal";
import SkipLink from "@/components/ui/SkipLink";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Capabilities from "@/components/sections/Capabilities";
import Approach from "@/components/sections/Approach";
import Lab from "@/components/sections/Lab";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
export default function Home() {
    return <>
    <Reveal />
    <SkipLink />
    <Header />
    <main id="main-content" tabIndex={-1}>
    <Hero />
    <aside className="statement" aria-label="A field note">
    <div className="shell statement-grid">
    <p className="section-label mono">Field note / 00</p>
    <blockquote>Good technology starts with a better question. <b>How does the work actually happen?</b> We begin with the process, the constraint, and the person at the end of it — and build outward.</blockquote>
    </div>
    </aside>
    <About />
    <Capabilities />
    <Approach />
    <Lab />
    <Contact />
    </main>
    <Footer />
    </>;
}
