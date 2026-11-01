import { ArrowUp } from "lucide-react";
import BrandMark from "@/components/visuals/BrandMark";
import { site } from "@/config/site";
export default async function Footer() {
    "use cache";
    return (<footer className="site-footer">
  <div className="shell">
    <div className="footer-top">
      <div>
        <a className="footer-brand" href="#top">
          <BrandMark />
          <span>LenanaLabs</span>
        </a>
        <p className="mono" style={{ marginTop: "14px", color: "rgba(251,248,241,.5)" }}>Early-stage studio · {site.location}</p>
      </div>
      <div className="footer-cols">
        <div>
          <h2>Studio</h2>
          <ul>
            <li>
    <a href="#about">About</a>
    </li>
            <li>
    <a href="#capabilities">Capabilities</a>
    </li>
            <li>
    <a href="#approach">Approach</a>
    </li>
            <li>
    <a href="#lab">Lab</a>
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
    <a href="#contact">Start a conversation</a>
    </li>
          </ul>
        </div>

      </div>
    </div>
    <p className="footer-word" aria-hidden="true">LENANALABS</p>
    <div className="footer-bottom">
      <span>© <span id="year">{new Date().getFullYear()}</span> LenanaLabs</span>
      <span>Built with curiosity. Grounded in engineering.</span>
      <a href="#top">Back to top <ArrowUp size={16} aria-hidden="true" /></a>
    </div>
  </div>
    </footer>);
}
