import IndexNumber from "@/components/ui/IndexNumber";
import Tag from "@/components/ui/tag";
import TextLink from "@/components/ui/TextLink";

export interface Product {
  index: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  href: string;
  status?: "LIVE" | "BETA" | "RESEARCH";
}

interface ProductRowProps {
  product: Product;
  className?: string;
}

export default function ProductRow({ product, className = "" }: ProductRowProps) {
  return (
    <article
      className={`py-8 sm:py-10 border-b border-ink transition-colors hover:bg-sulphur/10 group ${className}`}
    >
      <div className="grid grid-cols-12 gap-y-4 gap-x-6 items-start">
        {/* Col 1: Index Number */}
        <div className="col-span-12 sm:col-span-2 lg:col-span-1">
          <IndexNumber value={product.index} size="sm" />
        </div>

        {/* Col 2: Title & Status */}
        <div className="col-span-12 sm:col-span-4 lg:col-span-3 space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-ink group-hover:text-carmine transition-colors">
              {product.name}
            </h3>
            {product.status && (
              <span className="font-mono text-2xs uppercase tracking-wider px-1.5 py-0.5 border border-ink bg-paper font-semibold">
                {product.status}
              </span>
            )}
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink/60">
            {product.tagline}
          </p>
        </div>

        {/* Col 3: Description & Tags */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-6 space-y-4">
          <p className="text-base text-ink/75 leading-relaxed font-sans">
            {product.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {product.tags.map((tag) => (
              <Tag key={tag} variant="outline">
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        {/* Col 4: Action link */}
        <div className="col-span-12 lg:col-span-2 flex lg:justify-end items-center pt-2 lg:pt-0">
          <TextLink href={product.href} className="font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-1">
            <span>Explore Architecture</span>
            <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
          </TextLink>
        </div>
      </div>
    </article>
  );
}
