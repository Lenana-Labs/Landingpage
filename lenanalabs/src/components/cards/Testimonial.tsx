import Label from "@/components/ui/label";

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  metric?: string;
}

interface TestimonialProps {
  testimonial: TestimonialItem;
  className?: string;
}

export default function Testimonial({ testimonial, className = "" }: TestimonialProps) {
  return (
    <figure
      className={`border-l-4 border-carmine pl-6 sm:pl-8 py-3 space-y-6 ${className}`}
    >
      {testimonial.metric && (
        <span className="font-mono text-2xs uppercase tracking-widest text-carmine font-semibold block">
          {testimonial.metric}
        </span>
      )}
      <blockquote className="text-xl sm:text-2xl font-medium text-ink leading-relaxed font-sans text-balance">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="pt-2 border-t border-ink/15 space-y-1">
        <div className="font-medium text-sm text-ink">{testimonial.author}</div>
        <Label as="p" className="text-ink/65 text-2xs">
          {testimonial.role} — {testimonial.organization}
        </Label>
      </figcaption>
    </figure>
  );
}
