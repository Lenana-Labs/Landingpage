type IndexSize = "sm" | "lg";

interface IndexNumberProps {
  value: string; // e.g. "01", "02"
  size?: IndexSize;
  className?: string;
}

export default function IndexNumber({ value, size = "lg", className = "" }: IndexNumberProps) {
  return (
    <span
      aria-hidden="true"
      className={`font-mono text-carmine leading-none select-none ${
        size === "sm" ? "text-xl" : "text-7xl"
      } ${className}`}
    >
      {value}
    </span>
  );
}
