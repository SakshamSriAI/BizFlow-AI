import { Workspace, UserProfile, NotificationItem } from "@/types";

export const mockWorkspaces: Workspace[] = [
  {
    id: "ws-1",
    name: "Apex Growth Agency",
    slug: "apex-growth",
    role: "Owner",
    plan: "Growth",
    currency: "USD",
    industry: "Marketing & Creative",
  },
  {
    id: "ws-2",
    name: "Nova SaaS Labs",
    slug: "nova-saas",
    role: "Admin",
    plan: "Enterprise",
    currency: "USD",
    industry: "Software & Technology",
  },
  {
    id: "ws-3",
    name: "Saksham Studio",
    slug: "saksham-studio",
    role: "Owner",
    plan: "Starter",
    currency: "EUR",
    industry: "Consulting",
  },
];

export const mockCurrentUser: UserProfile = {
  id: "usr-1",
  name: "Saksham Srivastava",
  email: "saksham@businessos.dev",
  role: "Workspace Owner",
  status: "online",
};

export const mockNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "AI Action Required",
    description: "3 enterprise leads have had no follow-up in 5 days.",
    timestamp: "10m ago",
    read: false,
    type: "ai",
  },
  {
    id: "notif-2",
    title: "Invoice #INV-2024-089 Paid",
    description: "Acme Corp completed wire payment of $12,500.00.",
    timestamp: "1h ago",
    read: false,
    type: "success",
  },
  {
    id: "notif-3",
    title: "Expense Report Warning",
    description: "Marketing software expenses increased by 14% vs last month.",
    timestamp: "3h ago",
    read: true,
    type: "warning",
  },
];
