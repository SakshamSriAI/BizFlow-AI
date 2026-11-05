"use client";

import * as React from "react";
import {
  Kanban,
  Search,
  Plus,
  Filter,
  DollarSign,
  TrendingUp,
  Target,
  CheckCircle2,
  Table as TableIcon,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LeadKanbanBoard } from "@/components/crm/lead-kanban-board";
import { LeadModal } from "@/components/crm/lead-modal";
import { LeadDetailsDrawer } from "@/components/crm/lead-details-drawer";
import {
  getStoredLeads,
  addLead,
  updateLead,
  deleteLead,
  updateLeadStatus,
  addLeadNote,
  convertLeadToCustomer,
} from "@/lib/crm-store";
import { Lead, LeadStatus } from "@/types/crm";

export default function SalesPipelinePage() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [ownerFilter, setOwnerFilter] = React.useState<string>("all");
  const [valueFilter, setValueFilter] = React.useState<string>("all");

  // Modals & Drawers
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingLead, setEditingLead] = React.useState<Lead | null>(null);
  const [defaultStage, setDefaultStage] = React.useState<LeadStatus>("New");
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLeads(getStoredLeads());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateOrUpdateLead = (leadData: any) => {
    if (editingLead) {
      const updated = updateLead(editingLead.id, leadData);
      setLeads(updated);
      showToast(`Lead "${leadData.name}" updated.`);
    } else {
      const created = addLead(leadData);
      setLeads(getStoredLeads());
      showToast(`Deal added to ${created.status} stage.`);
    }
    setEditingLead(null);
  };

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    showToast(`Lead advanced to ${newStatus}.`);
  };

  const handleOpenLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleQuickAdd = (status: LeadStatus) => {
    setEditingLead(null);
    setDefaultStage(status);
    setIsModalOpen(true);
  };

  const handleConvertToCustomer = (leadId: string) => {
    const { leads: updatedLeads, customer } = convertLeadToCustomer(leadId);
    setLeads(updatedLeads);
    showToast(`Deal converted to Customer "${customer.company}"!`);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOwner =
      ownerFilter === "all" ? true : lead.assignedEmployee.includes(ownerFilter);
    let matchesValue = true;
    if (valueFilter === "high") matchesValue = lead.potentialDealValue >= 200000;
    if (valueFilter === "mid")
      matchesValue =
        lead.potentialDealValue >= 100000 && lead.potentialDealValue < 200000;
    if (valueFilter === "low") matchesValue = lead.potentialDealValue < 100000;

    return matchesSearch && matchesOwner && matchesValue;
  });

  const activePipelineValue = filteredLeads
    .filter((l) => l.status !== "Lost")
    .reduce((sum, l) => sum + (l.potentialDealValue || 0), 0);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-medium animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Sales Pipeline Kanban"
        description="Visual deal velocity board tracking prospects through discovery, proposal, and closing stages."
        breadcrumbs={[
          { label: "Nexora", href: "/app" },
          { label: "Sales", href: "/sales/leads" },
          { label: "Sales Pipeline" },
        ]}
        badge={
          <Badge variant="indigo" size="sm">
            ₹{(activePipelineValue / 100000).toFixed(1)}L Pipeline
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Link href="/sales/leads">
              <Button variant="outline" size="sm" leftIcon={<TableIcon className="w-4 h-4" />}>
                Table View
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleQuickAdd("New")}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Deal
            </Button>
          </div>
        }
      />

      {/* Filter Bar */}
      <Card className="p-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search deals or accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-3.5 h-3.5" />}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap justify-end">
            <div className="w-44">
              <Select
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
                options={[
                  { value: "all", label: "All Account Owners" },
                  { value: "Saksham", label: "Saksham S." },
                  { value: "Alex", label: "Alex M." },
                  { value: "Rohan", label: "Rohan V." },
                  { value: "Priya", label: "Priya S." },
                ]}
              />
            </div>

            <div className="w-40">
              <Select
                value={valueFilter}
                onChange={(e) => setValueFilter(e.target.value)}
                options={[
                  { value: "all", label: "All Deal Sizes" },
                  { value: "high", label: "High Ticket (₹2L+)" },
                  { value: "mid", label: "Mid Tier (₹1L - ₹2L)" },
                  { value: "low", label: "Under ₹1L" },
                ]}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Full-width Multi-stage Kanban Board */}
      <LeadKanbanBoard
        leads={filteredLeads}
        onSelectLead={handleOpenLeadDetails}
        onStatusChange={handleStatusChange}
        onQuickAdd={handleQuickAdd}
      />

      {/* Modals & Details Drawers */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLead(null);
        }}
        onSubmit={handleCreateOrUpdateLead}
        initialLead={editingLead}
        defaultStatus={defaultStage}
      />

      <LeadDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        lead={selectedLead}
        onEdit={(lead) => {
          setEditingLead(lead);
          setIsModalOpen(true);
        }}
        onDelete={(id) => {
          const updated = deleteLead(id);
          setLeads(updated);
          showToast("Deal removed.");
        }}
        onStatusChange={handleStatusChange}
        onAddNote={(id, note) => {
          const updated = addLeadNote(id, note);
          setLeads(updated);
          const ref = updated.find((l) => l.id === id);
          if (ref) setSelectedLead(ref);
        }}
        onConvertToCustomer={handleConvertToCustomer}
      />
    </div>
  );
}
