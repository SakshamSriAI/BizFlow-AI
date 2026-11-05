"use client";

import { Lead, Customer, LeadStatus, LeadNote, LeadActivity } from "@/types/crm";
import { initialMockLeads, initialMockCustomers } from "@/data/mock-crm-data";

const STORAGE_KEY_LEADS = "nexora_crm_leads";
const STORAGE_KEY_CUSTOMERS = "nexora_crm_customers";

export function getStoredLeads(): Lead[] {
  if (typeof window === "undefined") return initialMockLeads;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(initialMockLeads));
      return initialMockLeads;
    }
    return JSON.parse(raw);
  } catch {
    return initialMockLeads;
  }
}

export function saveLeads(leads: Lead[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
  }
}

export function getStoredCustomers(): Customer[] {
  if (typeof window === "undefined") return initialMockCustomers;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOMERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(initialMockCustomers));
      return initialMockCustomers;
    }
    return JSON.parse(raw);
  } catch {
    return initialMockCustomers;
  }
}

export function saveCustomers(customers: Customer[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(customers));
  }
}

export function addLead(newLeadData: Omit<Lead, "id" | "createdAt">): Lead {
  const current = getStoredLeads();
  const created: Lead = {
    ...newLeadData,
    id: "lead-" + Date.now(),
    createdAt: new Date().toISOString().split("T")[0],
    notesList: newLeadData.notes
      ? [
          {
            id: "note-" + Date.now(),
            author: newLeadData.assignedEmployee || "Current User",
            content: newLeadData.notes,
            timestamp: "Just now",
          },
        ]
      : [],
    activityHistory: [
      {
        id: "act-" + Date.now(),
        type: "status_change",
        title: "Lead Created",
        detail: `Lead added to ${newLeadData.status} pipeline stage.`,
        timestamp: "Just now",
        author: newLeadData.assignedEmployee || "Current User",
      },
    ],
  };
  const updated = [created, ...current];
  saveLeads(updated);
  return created;
}

export function updateLead(id: string, updates: Partial<Lead>): Lead[] {
  const current = getStoredLeads();
  const updated = current.map((lead) => {
    if (lead.id === id) {
      return { ...lead, ...updates };
    }
    return lead;
  });
  saveLeads(updated);
  return updated;
}

export function updateLeadStatus(id: string, newStatus: LeadStatus): Lead[] {
  const current = getStoredLeads();
  const updated = current.map((lead) => {
    if (lead.id === id) {
      const activity: LeadActivity = {
        id: "act-" + Date.now(),
        type: "status_change",
        title: `Status Changed to ${newStatus}`,
        detail: `Moved from ${lead.status} to ${newStatus}`,
        timestamp: "Just now",
        author: lead.assignedEmployee || "You",
      };
      return {
        ...lead,
        status: newStatus,
        activityHistory: [activity, ...(lead.activityHistory || [])],
      };
    }
    return lead;
  });
  saveLeads(updated);
  return updated;
}

export function addLeadNote(id: string, content: string, author: string = "Saksham S."): Lead[] {
  const current = getStoredLeads();
  const updated = current.map((lead) => {
    if (lead.id === id) {
      const newNote: LeadNote = {
        id: "note-" + Date.now(),
        author,
        content,
        timestamp: "Just now",
      };
      const activity: LeadActivity = {
        id: "act-" + Date.now(),
        type: "note_added",
        title: "Note Added",
        detail: content.slice(0, 60) + (content.length > 60 ? "..." : ""),
        timestamp: "Just now",
        author,
      };
      return {
        ...lead,
        notesList: [newNote, ...(lead.notesList || [])],
        activityHistory: [activity, ...(lead.activityHistory || [])],
      };
    }
    return lead;
  });
  saveLeads(updated);
  return updated;
}

export function deleteLead(id: string): Lead[] {
  const current = getStoredLeads();
  const updated = current.filter((lead) => lead.id !== id);
  saveLeads(updated);
  return updated;
}

export function convertLeadToCustomer(leadId: string): { leads: Lead[]; customer: Customer } {
  const leads = getStoredLeads();
  const lead = leads.find((l) => l.id === leadId);
  if (!lead) throw new Error("Lead not found");

  // Create customer
  const newCustomer: Customer = {
    id: "cust-" + Date.now(),
    name: lead.company,
    company: lead.company,
    email: lead.email,
    phone: lead.phone,
    industry: "Client Account",
    status: "Active",
    lifetimeValue: lead.potentialDealValue || 100000,
    monthlyRetainer: Math.round((lead.potentialDealValue || 100000) / 4),
    activeProjectsCount: 1,
    invoicesCount: 1,
    joinedDate: new Date().toISOString().split("T")[0],
    primaryContactRole: lead.name,
    notes: `Converted from Lead on ${new Date().toLocaleDateString()}. Initial deal value: ₹${lead.potentialDealValue.toLocaleString()}`,
  };

  const currentCustomers = getStoredCustomers();
  saveCustomers([newCustomer, ...currentCustomers]);

  // Update lead status to Converted
  const updatedLeads = updateLeadStatus(leadId, "Converted");

  return { leads: updatedLeads, customer: newCustomer };
}

export function addCustomer(newCustomerData: Omit<Customer, "id" | "joinedDate">): Customer {
  const current = getStoredCustomers();
  const created: Customer = {
    ...newCustomerData,
    id: "cust-" + Date.now(),
    joinedDate: new Date().toISOString().split("T")[0],
  };
  saveCustomers([created, ...current]);
  return created;
}

export function updateCustomer(id: string, updates: Partial<Customer>): Customer[] {
  const current = getStoredCustomers();
  const updated = current.map((c) => {
    if (c.id === id) {
      return { ...c, ...updates };
    }
    return c;
  });
  saveCustomers(updated);
  return updated;
}

export function deleteCustomer(id: string): Customer[] {
  const current = getStoredCustomers();
  const updated = current.filter((c) => c.id !== id);
  saveCustomers(updated);
  return updated;
}
