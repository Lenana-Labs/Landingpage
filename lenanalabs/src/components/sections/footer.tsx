import Link from "next/link";
import { ArrowUp } from "lucide-react";
import BrandMark from "@/components/visuals/BrandMark";
import { site } from "@/config/site";
export default async function Footer() {
    "use cache";
    return (<footer className="site-footer">
  <div className="shell">
    <div className="footer-top">
      <div>
        <Link className="footer-brand" href="/">
          <BrandMark />
          <span>LenanaLabs</span>
        </Link>
        <p className="mono" style={{ marginTop: "14px", color: "rgba(251,248,241,.5)" }}>Early-stage studio · {site.location}</p>
      </div>
      <div className="footer-cols">
        <div>
          <h2>Studio</h2>
          <ul>
            <li>
    <Link href="/about">About</Link>
    </li>
            <li>
    <Link href="/projects">Projects</Link></li><li><Link href="/#capabilities">Capabilities</Link>
    </li>
            <li>
    <Link href="/#approach">Approach</Link>
    </li>
            <li>
    <Link href="/#lab">Lab</Link>
    </li>
          </ul>
        </div>
        <div>
          <h2>Contact</h2>
          <ul>
            <li>
    <a href={`mailto:${site.email}`}>Email</a>
    </li>
            <li>
    <Link href="/#contact">Start a conversation</Link>
    </li>
          </ul>
        </div>

      </div>
    </div>
    <p className="footer-word" aria-hidden="true">LENANALABS</p>
    <div className="footer-bottom">
      <span>© <span id="year">{new Date().getFullYear()}</span> LenanaLabs</span>
      <span>Built with curiosity. Grounded in engineering.</span>
      <Link href="#main-content">Back to top <ArrowUp size={16} aria-hidden="true" /></Link>
    </div>
  </div>
    </footer>);
}
