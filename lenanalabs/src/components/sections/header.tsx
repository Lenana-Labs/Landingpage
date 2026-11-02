import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation, site } from "@/config/site";
import MobileNavigation from "@/components/layout/MobileNavigation";
import BrandMark from "@/components/visuals/BrandMark";
export default function Header({activePage="/"}:{activePage?:string}) {
 return <header className="site-header"><div className="shell header-bar">
  <Link className="brand" href="/" aria-label="LenanaLabs home"><BrandMark/><span>LenanaLabs</span></Link>
  <nav className="nav" aria-label="Primary">{navigation.slice(0,4).map(link=><Link key={link.href} href={link.href} aria-current={activePage===link.href?"page":undefined}>{link.label}</Link>)}</nav>
  <div className="header-end"><span className="header-loc mono">{site.location}</span><Link className="btn btn--sm" href="/#contact">Start a conversation <ArrowUpRight size={18} aria-hidden="true"/></Link><MobileNavigation activePage={activePage}/></div>
 </div><div className="measure" aria-hidden="true"/><noscript><nav className="shell no-script-nav" aria-label="Page navigation">{navigation.map(link=><Link key={link.href} href={link.href}>{link.label}</Link>)}</nav></noscript></header>;
}
