import React from "react";
import { SkipLink } from "../ui/skip-link";
import { NavBar } from "./nav-bar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-paper)] border-b border-[var(--color-ink)] w-full">
      <SkipLink targetId="main-content" />
      <NavBar />
    </header>
  );
}
