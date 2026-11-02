import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { teamMembers, type TeamMember } from "@/data/team";
import { safeAssetSource, safeProjectUrl } from "@/data/projects";

export default function TeamSection({ members = teamMembers }: { members?: readonly TeamMember[] }) {
  const approvedMembers = members.filter(member => member.id && member.name.trim() && member.role.trim());
  return <section className="band team" id="team" aria-labelledby="team-heading"><div className="shell">
    <div className="team-head"><div><p className="section-label mono">05 / Team</p><h2 className="h2" id="team-heading">The people behind the work.</h2></div></div>
    {approvedMembers.length > 0 && <div className="team-grid">{approvedMembers.map((member, index) => {
      const portrait = safeAssetSource(member.portrait?.src);
      const monogram = member.name.trim().split(/\s+/).filter((_, i, names) => i === 0 || i === names.length - 1).map(word => word[0]).join('').slice(0, 2);
      const focus = [...new Set([...(member.expertise || []), ...(member.interests || [])])];
      const links = (member.links || []).map(link => ({ label: link.label, href: safeProjectUrl(link.href) }))
        .filter((link): link is { label: string; href: string } => Boolean(link.href?.startsWith('https://')));
      return <article className="profile" key={member.id}>
        <div className="p-top"><span className="p-no">{String(index + 1).padStart(2, '0')}</span><span className="monogram">
          {portrait && member.portrait ? <Image src={portrait} alt={member.portrait.alt} fill sizes="(max-width: 720px) 64px, 86px" unoptimized={portrait.startsWith('http')} /> : <span aria-hidden="true">{monogram}</span>}
        </span></div>
        <h3>{member.name}</h3><p className="p-role">{member.role}</p>
        {member.bio && <p className="p-bio">{member.bio}</p>}
        {focus.length > 0 && <><p className="p-focus">Technical focus</p><ul className="p-tags">{focus.map(tag => <li key={tag}>{tag}</li>)}</ul></>}
        {links.length > 0 && <ul className="profile-links">{links.map(link => <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul>}
      </article>;
    })}</div>}
  </div></section>;
}
