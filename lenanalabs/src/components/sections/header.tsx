import { ArrowUpRight } from "lucide-react";
import { navigation, site } from "@/config/site";
import MobileNavigation from "@/components/layout/MobileNavigation";
import BrandMark from "@/components/visuals/BrandMark";
export default function Header() {
    return <header className="site-header">
  <div className="shell header-bar">
   <a className="brand" href="#top" aria-label="LenanaLabs - back to top">
    <BrandMark />
    <span>LenanaLabs</span>
    </a>
   <nav className="nav" aria-label="Primary">{navigation.slice(0, 4).map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
   <div className="header-end">
    <span className="header-loc mono">{site.location}</span>
    <a className="btn btn--sm" href="#contact">Start a conversation <ArrowUpRight size={18} aria-hidden="true" />
    </a>
    <MobileNavigation />
    </div>
  </div>
  <div className="measure" aria-hidden="true"/>
  <noscript>
    <nav className="shell no-script-nav" aria-label="Page navigation">{navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
    </noscript>
 </header>;
}
