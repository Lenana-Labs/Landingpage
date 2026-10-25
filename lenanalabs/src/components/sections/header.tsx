"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { navigation as links } from "@/content/site";


export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sections = [document.getElementById("home"), ...links.map(link => document.getElementById(link.href.slice(1)))].filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(entries => {
      const visible = entries.find(entry => entry.isIntersecting);
      if (visible) setActive(`#${visible.target.id}`);
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
    const focusDestination = (event: MouseEvent) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = anchor?.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      requestAnimationFrame(() => {
        const heading = target.querySelector<HTMLElement>("h1, h2") || target;
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      });
    };
    document.addEventListener("click", focusDestination);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", focusDestination);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!panel.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = window.matchMedia("(min-width: 768px)");
    const resize = () => { if (media.matches) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header className="site-header" ref={panel} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}>
      <Container>
        <div className="header-row">
          <a href="#home" className="wordmark">
            <span className="brand-mark" aria-hidden="true">L</span>
            Lenana Labs<span className="brand-period">.</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.slice(0, 3).map(link => <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined}>{link.label}</a>)}
            <a className="action action-primary" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
          </nav>
          <button ref={trigger} className="menu-trigger" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>
            {open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span>
          </button>
        </div>
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" hidden={!open}>
          {links.map(link => <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">↗</span></a>)}
        </nav>
        <noscript><nav className="no-script-nav" aria-label="Page navigation">{links.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav></noscript>
      </Container>
    </header>
  );
}
