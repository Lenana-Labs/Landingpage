export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  expertise?: string[];
  interests?: string[];
  portrait?: { src: string; alt: string };
  links?: { label: string; href: string }[];
};

// Owner-requested placeholders. Replace with approved names, roles and biographies before launch.
export const teamMembers: TeamMember[] = [
  {
    id: "team-member-01",
    name: "Team member 01",
    role: "Profile placeholder",
    bio: "Name, role and introduction to be added.",
  },
  {
    id: "team-member-02",
    name: "Team member 02",
    role: "Profile placeholder",
    bio: "Name, role and introduction to be added.",
  },
  {
    id: "team-member-03",
    name: "Team member 03",
    role: "Profile placeholder",
    bio: "Name, role and introduction to be added.",
  },
];
