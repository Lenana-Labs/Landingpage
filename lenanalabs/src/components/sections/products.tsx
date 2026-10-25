import Image from "next/image";
import Container from "@/components/ui/Container";
import { products } from "@/content/site";
import ProductEnquiryLink from "@/components/cards/ProductEnquiryLink";

export default function Products() {
  return (
    <section id="products" className="work-section" aria-labelledby="products-heading">
      <Container>
        <div className="section-intro">
          <h2 id="products-heading" className="section-title">Ideas into<br />working systems.</h2>
          <p>Explore our product areas, from distributed infrastructure to local intelligence. Talk to us about the right fit and current availability.</p>
        </div>
        <div className="product-grid">
          {products.map(product => (
            <article key={product.id} id={product.id} className="product-feature group">
              <div className={`product-visual product-${product.color}`} aria-label={`${product.name} workflow illustration`}>
                {"image" in product && product.image && (
                  <div className="product-image-layer">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(50vw - 40px), 600px"
                      className="product-bg-img"
                    />
                    <div className={`product-image-scrim scrim-${product.color}`} />
                  </div>
                )}
                <div className="product-visual-inner">
                  <span className="visual-category">{product.category}</span>
                </div>
              </div>
              <div className="product-copy">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="product-usecase">{product.useCase}</p>
                <ProductEnquiryLink name={product.name} />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

