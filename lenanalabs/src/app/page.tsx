import SkipLink from "@/components/ui/SkipLink";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/products";
import Solutions from "@/components/sections/solutions";
import Introduction from "@/components/sections/Introduction";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Products />
        <Solutions />
        <Introduction />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
