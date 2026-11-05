export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string | number;
  badgeVariant?: "default" | "success" | "warning" | "danger" | "neutral";
  isNew?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  role: string;
  plan: "Starter" | "Growth" | "Enterprise";
  currency: string;
  industry: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  status: "online" | "away" | "offline";
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: "info" | "warning" | "success" | "ai";
}
