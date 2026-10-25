import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import TextLink from "@/components/ui/TextLink";

interface ContactCardProps {
  email?: string;
  phone?: string;
  location?: string;
  officeHours?: string;
  className?: string;
}

export default function ContactCard({
  email = "inquiries@lenanalabs.com",
  phone = "+254 (0) 20 800 4420",
  location = "Nairobi, Kenya & Remote Global",
  officeHours = "UTC+3 · Mon – Fri 08:00 – 18:00",
  className = "",
}: ContactCardProps) {
  return (
    <div
      className={`bg-sulphur border-2 border-ink p-8 sm:p-12 text-ink shadow-[8px_8px_0_0_#0D0D0D] ${className}`}
    >
      <div className="flex items-center justify-between pb-6 border-b border-ink">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-carmine inline-block" />
          <Label as="span" className="font-bold tracking-wider">
            TRANSMISSION CHANNEL
          </Label>
        </div>
        <span className="font-mono text-2xs uppercase tracking-widest font-semibold">
          STATUS: READY
        </span>
      </div>

      <div className="py-8 space-y-6">
        <div>
          <h3 className="text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
            Deploy with Lenana Labs.
          </h3>
          <p className="mt-3 text-sm sm:text-base text-ink/80 max-w-xl font-sans">
            Direct access to senior systems architects and research directors. Whether evaluating an enterprise deployment, co-development partnership, or venture syndicate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-ink/20">
          <div className="space-y-1">
            <Label as="p" className="text-ink/60">PRIMARY DISPATCH</Label>
            <p>
              <TextLink
                href={`mailto:${email}`}
                className="font-mono text-sm sm:text-base font-semibold text-ink hover:text-carmine"
              >
                {email}
              </TextLink>
            </p>
          </div>

          <div className="space-y-1">
            <Label as="p" className="text-ink/60">DIRECT VOICE / SECURE COMM</Label>
            <p>
              <TextLink
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="font-mono text-sm sm:text-base font-semibold text-ink hover:text-carmine"
              >
                {phone}
              </TextLink>
            </p>
          </div>

          <div className="space-y-1">
            <Label as="p" className="text-ink/60">HEADQUARTERS</Label>
            <p className="font-mono text-xs sm:text-sm text-ink/85">{location}</p>
          </div>

          <div className="space-y-1">
            <Label as="p" className="text-ink/60">OPERATIONAL TIMEZONE</Label>
            <p className="font-mono text-xs sm:text-sm text-ink/85">{officeHours}</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-ink flex flex-wrap gap-4 items-center justify-between">
        <Button as="a" href={`mailto:${email}`} variant="ink">
          Transmit Message →
        </Button>
        <span className="font-mono text-2xs text-ink/70 uppercase tracking-widest">
          PGP ENCRYPTION KEY AVAILABLE UPON REQUEST
        </span>
      </div>
    </div>
  );
}
