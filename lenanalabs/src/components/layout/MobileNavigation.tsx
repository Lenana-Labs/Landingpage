"use client";
import Link from "next/link";
import { ArrowUpRight, Plus, X } from "lucide-react";


import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { navigation, site } from "@/config/site";

export default function MobileNavigation({ activePage = "/" }: { activePage?: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;

    const element = dialog.current;
    const opener = trigger.current;
    const previousOverflow = document.body.style.overflow;
    const desktop = matchMedia("(min-width: 1101px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };

    element?.showModal();
    document.body.style.overflow = "hidden";
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = previousOverflow;
      element?.close();
      opener?.focus();
    };
  }, [open]);

  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
    const first = controls[0];
    const last = controls[controls.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <button className="menu-btn" ref={trigger} aria-expanded={open}
        aria-controls="mobile-menu" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        Menu <Plus size={18} aria-hidden="true" />
      </button>
      <dialog id="mobile-menu" className="mobile-menu" ref={dialog}
        aria-labelledby="menu-title" onCancel={() => setOpen(false)} onKeyDown={containFocus}>
        <div className="mm-top">
          <span className="mono" id="menu-title">LenanaLabs / Menu</span>
          <button className="mm-close" onClick={() => setOpen(false)} autoFocus>Close <X size={18} aria-hidden="true" /></button>
        </div>
        <nav aria-label="Mobile">
          {navigation.map(link => (
            <Link key={link.href} href={link.href} aria-current={activePage === link.href ? "page" : undefined} onClick={() => setOpen(false)}>
              {link.label}<ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <p className="mm-foot mono">{site.location} / {site.timezone}</p>
      </dialog>
    </>
  );
}
