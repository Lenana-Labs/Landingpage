import React from "react";
import { Tag } from "../ui/tag";
import { Product } from "@/data/products";

export interface ProductRowProps {
  product: Product;
}

export function ProductRow({ product }: ProductRowProps) {
  return (
    <div
      className={`group relative border-b border-[var(--color-ink)] py-8 transition-colors duration-150 ${
        product.isFeatured ? "bg-[var(--color-sulphur)]/40 hover:bg-[var(--color-sulphur)]" : "hover:bg-[var(--color-sulphur)]"
      }`}
    >
      <div className="site-container">
        <div className="swiss-grid items-baseline">
          {/* Index & Name */}
          <div className="col-span-4 lg:col-span-4 flex items-baseline gap-4">
            <span
              className="font-mono text-sm font-bold text-[var(--color-carmine)] group-hover:text-[var(--color-ink)] transition-colors duration-150"
              aria-hidden="true"
            >
              {product.index}
            </span>
            <div>
              <h3 className="type-h3 font-bold text-[var(--color-ink)]">
                {product.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">
                {product.tagline}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-4 lg:col-span-5 mt-3 lg:mt-0">
            <p className="type-body text-[var(--color-ink)] max-w-[48ch]">
              {product.description}
            </p>
          </div>

          {/* Tags and Action Arrow */}
          <div className="col-span-4 lg:col-span-3 mt-4 lg:mt-0 flex items-center justify-between lg:justify-end gap-4">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Tag key={tag} variant={product.isFeatured ? "sulphur" : "outline"}>
                  {tag}
                </Tag>
              ))}
            </div>
            <a
              href={product.href}
              className="inline-flex items-center justify-center text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-carmine)] group-hover:translate-x-1 transition-all duration-150 p-2"
              aria-label={`Learn more about ${product.name}`}
            >
              →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
