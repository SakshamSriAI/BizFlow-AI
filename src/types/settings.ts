export type TeamRole = "owner" | "admin" | "finance_manager" | "sales_rep" | "viewer";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: TeamRole;
  status: "active" | "invited" | "suspended";
  invitedDate: string;
  lastActive: string;
}

export interface RolePermissionMatrix {
  role: TeamRole;
  roleTitle: string;
  description: string;
  crmAccess: "none" | "view" | "edit" | "admin";
  financeAccess: "none" | "view" | "edit" | "admin";
  invoicingAccess: "none" | "view" | "edit" | "admin";
  aiAgentsAccess: "none" | "view" | "approve" | "admin";
  settingsAccess: "none" | "view" | "admin";
}

export type IntegrationCategory =
  | "email"
  | "whatsapp"
  | "payment"
  | "calendar"
  | "accounting";

export interface MockIntegration {
  id: string;
  name: string;
  category: IntegrationCategory;
  description: string;
  iconName: string;
  status: "connected" | "not_connected" | "setup_required";
  connectedAccount?: string;
  lastSync?: string;
  autoSync: boolean;
  credentials?: {
    apiKey?: string;
    webhookUrl?: string;
    senderId?: string;
  };
}

export interface BusinessProfile {
  companyName: string;
  legalEntityName: string;
  industry: string;
  companySize: string;
  taxId: string;
  billingEmail: string;
  phone: string;
  website: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  currency: string;
  dateFormat: string;
  fiscalYearStart: string;
  numberFormat: "indian" | "international";
}

export interface NotificationSettings {
  emailInvoicesOverdue: boolean;
  emailWeeklyDigest: boolean;
  emailAgentApprovals: boolean;
  inAppDealsWon: boolean;
  inAppBudgetAlerts: boolean;
  slackWebhookActive: boolean;
  slackWebhookUrl?: string;
  whatsappOverdueAlerts: boolean;
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  accentColor: "blue" | "teal" | "dark" | "emerald" | "indigo" | "violet";
  compactSidebar: boolean;
}
