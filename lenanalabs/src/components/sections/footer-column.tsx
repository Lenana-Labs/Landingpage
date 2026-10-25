import React from "react";
import { Label } from "../ui/label";
import { TextLink } from "../ui/text-link";

export interface FooterLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterColumnProps {
  label: string;
  links: FooterLinkItem[];
}

export function FooterColumn({ label, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col space-y-4">
      <Label variant="sulphur">{label}</Label>
      <ul className="space-y-3 list-none p-0 m-0">
        {links.map((link) => (
          <li key={link.label}>
            <TextLink
              href={link.href}
              variant="inverse"
              isExternal={link.isExternal}
              className="text-sm"
            >
              {link.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
