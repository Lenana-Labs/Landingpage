import Container from "@/components/ui/Container";
import CTAButtonBar from "@/components/cards/CTAButtonBar";
import Label from "@/components/ui/label";

export default function CTABanner() {
  return (
    <section className="bg-carmine text-paper py-16 sm:py-20 border-y border-ink">
      <Container>
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-paper inline-block" />
              <Label className="text-paper/80">COMMISSION A FLIGHT WITH LENANA</Label>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-paper leading-tight text-balance">
              Have a critical computational challenge that cannot fail?
            </h2>
            <p className="text-paper/85 text-base sm:text-lg max-w-2xl font-sans">
              We partner selectively with institutions, funded scaleups, and sovereign bodies to engineer decisive technological advantage.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 flex lg:justify-end">
            <CTAButtonBar
              primaryLabel="Initiate Technical Briefing"
              primaryHref="#contact"
              secondaryLabel="Explore Products"
              secondaryHref="#products"
              variant="carmine"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
