import { ReactNode } from "react";

type SectionVariant = "paper" | "sulphur" | "ink";

interface SectionProps {
  children: ReactNode;
  variant?: SectionVariant;
  topRule?: boolean;
  className?: string;
  id?: string;
}

const variantClasses: Record<SectionVariant, string> = {
  paper: "bg-paper text-ink",
  sulphur: "bg-sulphur text-ink",
  ink: "bg-ink text-paper",
};

export default function Section({
  children,
  variant = "paper",
  topRule = false,
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 lg:py-28 ${topRule ? "border-t border-current/20" : ""} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </section>
  );
}
