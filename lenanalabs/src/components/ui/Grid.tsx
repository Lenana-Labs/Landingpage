import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  className?: string;
}

export default function Grid({ children, className = "" }: GridProps) {
  return (
    <div
      className={`grid grid-cols-12 gap-x-6 gap-y-10 ${className}`}
    >
      {children}
    </div>
  );
}
