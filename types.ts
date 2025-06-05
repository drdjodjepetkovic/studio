
export interface SectionProps {
  id: string;
}

export interface TeamMemberContacts {
  phone?: string;
  email?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
  contacts: TeamMemberContacts;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: React.FC<{ className?: string }>; // Changed from React.ReactNode
  imageUrl?: string; 
}
