"use client";

import * as React from "react";
import {
  UserPlus,
  Search,
  Filter,
  ArrowUpDown,
  Kanban,
  Table as TableIcon,
  Plus,
  Building2,
  Calendar,
  Phone,
  Mail,
  MoreVertical,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  Edit,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { LeadModal } from "@/components/crm/lead-modal";
import { LeadDetailsDrawer } from "@/components/crm/lead-details-drawer";
import { LeadKanbanBoard } from "@/components/crm/lead-kanban-board";
import {
  getStoredLeads,
  addLead,
  updateLead,
  deleteLead,
  updateLeadStatus,
  addLeadNote,
  convertLeadToCustomer,
} from "@/lib/crm-store";
import { Lead, LeadStatus, LeadSource } from "@/types/crm";
import { getActiveWorkspace } from "@/lib/auth-store";

export default function LeadsOverviewPage() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [viewMode, setViewMode] = React.useState<"table" | "kanban">("table");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [sourceFilter, setSourceFilter] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<"value" | "date" | "name">("value");

  // Modals & Drawers
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingLead, setEditingLead] = React.useState<Lead | null>(null);
  const [defaultStatusForNew, setDefaultStatusForNew] = React.useState<LeadStatus>("New");
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
      showToast(`Lead "${leadData.name}" updated successfully.`);
      if (selectedLead?.id === editingLead.id) {
        setSelectedLead({ ...selectedLead, ...leadData });
      }
    } else {
      const created = addLead(leadData);
      setLeads(getStoredLeads());
      showToast(`Lead "${created.name}" created and added to pipeline.`);
    }
    setEditingLead(null);
  };

  const handleDeleteLead = (id: string) => {
    const updated = deleteLead(id);
    setLeads(updated);
    showToast("Lead deleted from database.");
  };

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    showToast(`Lead stage updated to ${newStatus}.`);
  };

  const handleAddNote = (id: string, noteContent: string) => {
    const updated = addLeadNote(id, noteContent);
    setLeads(updated);
    const refreshed = updated.find((l) => l.id === id);
    if (refreshed) setSelectedLead(refreshed);
    showToast("Note logged.");
  };

  const handleConvertToCustomer = (leadId: string) => {
    const { leads: updatedLeads, customer } = convertLeadToCustomer(leadId);
    setLeads(updatedLeads);
    const refreshed = updatedLeads.find((l) => l.id === leadId);
    if (refreshed) setSelectedLead(refreshed);
    showToast(`Lead converted to Customer "${customer.company}"!`);
  };

  const handleOpenLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleOpenCreateModal = (stage: LeadStatus = "New") => {
    setEditingLead(null);
    setDefaultStatusForNew(stage);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  // Filter & Sort
  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ? true : lead.status === statusFilter;
      const matchesSource =
        sourceFilter === "all" ? true : lead.leadSource === sourceFilter;
      return matchesSearch && matchesStatus && matchesSource;
    })
    .sort((a, b) => {
      if (sortBy === "value") return b.potentialDealValue - a.potentialDealValue;
      if (sortBy === "date") return a.followUpDate.localeCompare(b.followUpDate);
      return a.name.localeCompare(b.name);
    });

  // Summary Metrics
  const totalPipelineValue = leads.reduce(
    (sum, l) => sum + (l.potentialDealValue || 0),
    0
  );
  const activeDealsCount = leads.filter(
    (l) => l.status !== "Converted" && l.status !== "Lost"
  ).length;
  const convertedCount = leads.filter((l) => l.status === "Converted").length;

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
        title="CRM & Leads Pipeline"
        description="Track active consultations, prospect touchpoints, stage progression, and deals."
        breadcrumbs={[
          { label: "Nexora", href: "/app" },
          { label: "Sales", href: "/sales/leads" },
          { label: "Leads Overview" },
        ]}
        badge={
          <Badge variant="indigo" size="sm">
            {leads.length} Total Leads
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            {/* View Switcher: Table vs. Kanban */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-md text-xs transition-all ${
                  viewMode === "table"
                    ? "bg-white text-indigo-700 shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Table View"
                aria-label="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("kanban")}
                className={`p-1.5 rounded-md text-xs transition-all ${
                  viewMode === "kanban"
                    ? "bg-white text-indigo-700 shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Kanban Board View"
                aria-label="Kanban Board View"
              >
                <Kanban className="w-4 h-4" />
              </button>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleOpenCreateModal("New")}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add New Lead
            </Button>
          </div>
        }
      />

      {/* CRM Quick Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Pipeline Value
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            ₹{(totalPipelineValue / 100000).toFixed(1)}L
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">
            ₹{totalPipelineValue.toLocaleString()} active potential
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Active Negotiations
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            {activeDealsCount} Deals
          </div>
          <span className="text-[11px] text-indigo-600 font-medium mt-0.5 block">
            In active qualification
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Won Deals / Converted
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1">
            {convertedCount} Clients
          </div>
          <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
            {( (convertedCount / leads.length) * 100 ).toFixed(0)}% overall win rate
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Follow-ups Scheduled
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-600 mt-1">
            {leads.filter((l) => l.followUpDate).length} Tasks
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">
            Calendar synchronized
          </span>
        </div>
      </div>

      {/* Search, Filter & Sort Controls */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="w-full md:w-80">
            <Input
              placeholder="Search by contact, company, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-3.5 h-3.5" />}
            />
          </div>

          {/* Filters & Sort */}
          <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap justify-end">
            <div className="w-36">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: "all", label: "All Stages" },
                  { value: "New", label: "New Leads" },
                  { value: "Contacted", label: "Contacted" },
                  { value: "Interested", label: "Interested" },
                  { value: "Qualified", label: "Qualified" },
                  { value: "Converted", label: "Converted" },
                  { value: "Lost", label: "Lost" },
                ]}
              />
            </div>

            <div className="w-36">
              <Select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                options={[
                  { value: "all", label: "All Sources" },
                  { value: "Website Form", label: "Website Form" },
                  { value: "LinkedIn Referral", label: "LinkedIn" },
                  { value: "Cold Outreach", label: "Cold Outreach" },
                  { value: "Inbound Call", label: "Inbound Call" },
                  { value: "Partner Network", label: "Partners" },
                  { value: "Twitter / X", label: "Twitter / X" },
                  { value: "Event / Conference", label: "Events" },
                ]}
              />
            </div>

            <div className="w-36">
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                options={[
                  { value: "value", label: "Sort: Value (High)" },
                  { value: "date", label: "Sort: Follow-up Date" },
                  { value: "name", label: "Sort: Contact Name" },
                ]}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* VIEW: TABLE VIEW */}
      {viewMode === "table" ? (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact & Company</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Stage Status</TableHead>
                <TableHead>Potential Deal</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Follow-up</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-slate-400">
                    No leads match the current filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads.map((lead) => {
                  const getStatusBadgeVariant = (st: LeadStatus) => {
                    switch (st) {
                      case "Converted":
                        return "success";
                      case "Qualified":
                        return "indigo";
                      case "Interested":
                        return "warning";
                      case "Lost":
                        return "danger";
                      default:
                        return "secondary";
                    }
                  };

                  return (
                    <TableRow
                      key={lead.id}
                      className="cursor-pointer hover:bg-slate-50/70"
                      onClick={() => handleOpenLeadDetails(lead)}
                    >
                      <TableCell>
                        <div className="font-bold text-slate-900 text-xs hover:text-indigo-600 transition-colors">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          <span>{lead.company}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-xs text-slate-700">{lead.email}</div>
                        <div className="text-[11px] text-slate-400">{lead.phone}</div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline" size="sm">
                          {lead.leadSource}
                        </Badge>
                      </TableCell>

                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value as LeadStatus)
                          }
                          className="text-xs font-semibold rounded-md border border-slate-200 bg-white px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Interested">Interested</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Converted">Converted</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </TableCell>

                      <TableCell className="font-mono font-bold text-slate-900 text-xs">
                        ₹{lead.potentialDealValue.toLocaleString()}
                      </TableCell>

                      <TableCell className="text-xs text-slate-600">
                        {lead.assignedEmployee.split(" ")[0]}
                      </TableCell>

                      <TableCell className="text-xs text-slate-500 font-medium">
                        {lead.followUpDate}
                      </TableCell>

                      <TableCell
                        className="text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEditModal(lead)}
                            title="Edit Lead"
                          >
                            <Edit className="w-3.5 h-3.5 text-slate-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenLeadDetails(lead)}
                            className="text-indigo-600"
                          >
                            Profile
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Card>
      ) : (
        /* VIEW: KANBAN VIEW */
        <LeadKanbanBoard
          leads={filteredLeads}
          onSelectLead={handleOpenLeadDetails}
          onStatusChange={handleStatusChange}
          onQuickAdd={handleOpenCreateModal}
        />
      )}

      {/* Add / Edit Lead Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLead(null);
        }}
        onSubmit={handleCreateOrUpdateLead}
        initialLead={editingLead}
        defaultStatus={defaultStatusForNew}
      />

      {/* Lead Details Slide-over Drawer */}
      <LeadDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        lead={selectedLead}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteLead}
        onStatusChange={handleStatusChange}
        onAddNote={handleAddNote}
        onConvertToCustomer={handleConvertToCustomer}
      />
    </div>
  );
}
