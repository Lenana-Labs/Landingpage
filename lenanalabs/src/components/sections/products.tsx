import React from "react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { SectionHeader } from "../layout/section-header";
import { ProductRow } from "../cards/product-row";
import { products } from "@/data/products";

export function Products() {
  return (
    <Section
      id="products"
      variant="paper"
      topRule
      ruleWeight="heavy"
      className="pb-0"
    >
      <Container>
        <SectionHeader
          index="02"
          label="PRODUCTS"
          title="Things we've built."
          description="A selection of high-concurrency systems, developer infrastructure, and data platforms engineered for demanding real-world workloads."
          id="products-title"
        />
      </Container>

      {/* Ruled list of products across the full container */}
      <div className="border-t border-[var(--color-ink)] mt-12">
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
}
