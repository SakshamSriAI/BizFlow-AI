export type LeadStatus =
  | "New"
  | "Contacted"
  | "Interested"
  | "Qualified"
  | "Converted"
  | "Lost";

export type LeadSource =
  | "Website Form"
  | "LinkedIn Referral"
  | "Cold Outreach"
  | "Inbound Call"
  | "Partner Network"
  | "Twitter / X"
  | "Event / Conference";

export interface LeadNote {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface LeadActivity {
  id: string;
  type: "status_change" | "note_added" | "call" | "email" | "proposal";
  title: string;
  detail: string;
  timestamp: string;
  author: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  leadSource: LeadSource;
  status: LeadStatus;
  potentialDealValue: number;
  assignedEmployee: string;
  followUpDate: string;
  notes: string;
  createdAt: string;
  notesList?: LeadNote[];
  activityHistory?: LeadActivity[];
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  status: "Active" | "Paused" | "Completed";
  lifetimeValue: number;
  monthlyRetainer: number;
  activeProjectsCount: number;
  invoicesCount: number;
  joinedDate: string;
  primaryContactRole: string;
  notes: string;
}
