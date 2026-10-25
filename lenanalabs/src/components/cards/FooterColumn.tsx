import Label from "@/components/ui/label";
import TextLink from "@/components/ui/TextLink";

export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
  className?: string;
}

export default function FooterColumn({ title, links, className = "" }: FooterColumnProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <Label as="h4" className="text-paper/50 tracking-widest text-2xs block">
        {title}
      </Label>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <TextLink
              href={link.href}
              variant="inverse"
              className="text-xs sm:text-sm font-sans block"
              {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
