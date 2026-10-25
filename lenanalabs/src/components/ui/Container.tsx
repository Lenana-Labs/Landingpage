import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-page px-6 md:px-10 lg:px-16 xl:px-20 ${className}`}
    >
      {children}
    </div>
  );
}
