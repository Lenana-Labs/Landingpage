import Image from "next/image";
import Label from "@/components/ui/label";
import TextLink from "@/components/ui/TextLink";

export interface Member {
  name: string;
  role: string;
  bio: string;
  image: string;
  link?: { label: string; href: string };
  focusArea: string;
}

interface TeamMemberProps {
  member: Member;
  className?: string;
}

export default function TeamMember({ member, className = "" }: TeamMemberProps) {
  return (
    <div className={`border border-ink bg-paper flex flex-col group ${className}`}>
      {/* Photo frame */}
      <div className="relative aspect-square w-full overflow-hidden bg-ink/10 border-b border-ink">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-2 right-2 bg-paper border border-ink px-2 py-0.5">
          <Label className="text-2xs font-semibold">{member.focusArea}</Label>
        </div>
      </div>

      {/* Info panel */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <h4 className="text-lg font-medium text-ink tracking-tight group-hover:text-carmine transition-colors">
            {member.name}
          </h4>
          <Label as="p" className="text-ink/65 text-2xs">
            {member.role}
          </Label>
        </div>

        <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-sans">
          {member.bio}
        </p>

        {member.link && (
          <div className="pt-2 border-t border-ink/15">
            <TextLink
              href={member.link.href}
              className="font-mono text-2xs uppercase tracking-wider font-semibold"
            >
              {member.link.label} →
            </TextLink>
          </div>
        )}
      </div>
    </div>
  );
}
