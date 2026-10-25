import Container from "@/components/ui/Container";
import { navigation } from "@/content/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-top"><p>Software with a purpose.<br />Built from Nairobi.</p><nav aria-label="Footer navigation">{navigation.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav></div>
        <div className="footer-wordmark" aria-hidden="true">Lenana Labs<span>.</span></div>
        <div className="footer-bottom"><span>© 2026 Lenana Labs</span><a href="#main-content">Back to top ↑</a><span>Nairobi, Kenya · UTC+3</span></div>
      </Container>
    </footer>
  );
}
