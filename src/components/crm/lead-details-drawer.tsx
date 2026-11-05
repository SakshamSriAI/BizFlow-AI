"use client";

import * as React from "react";
import {
  X,
  Phone,
  Mail,
  Building2,
  Calendar,
  Clock,
  Sparkles,
  User,
  ArrowRight,
  Send,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  UserCheck,
  AlertCircle,
  FileText,
  DollarSign,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lead, LeadStatus } from "@/types/crm";
import { cn } from "@/lib/utils";

export interface LeadDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onAddNote: (id: string, content: string) => void;
  onConvertToCustomer: (id: string) => void;
  currencySymbol?: string;
}

export function LeadDetailsDrawer({
  isOpen,
  onClose,
  lead,
  onEdit,
  onDelete,
  onStatusChange,
  onAddNote,
  onConvertToCustomer,
  currencySymbol = "₹",
}: LeadDetailsDrawerProps) {
  const [activeTab, setActiveTab] = React.useState<"notes" | "activity" | "schedule">("notes");
  const [newNote, setNewNote] = React.useState("");
  const [scheduledDate, setScheduledDate] = React.useState(
    lead?.followUpDate || new Date().toISOString().split("T")[0]
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [scheduleSuccess, setScheduleSuccess] = React.useState(false);

  React.useEffect(() => {
    if (lead) {
      setScheduledDate(lead.followUpDate);
      setShowDeleteConfirm(false);
      setScheduleSuccess(false);
    }
  }, [lead]);

  if (!isOpen || !lead) return null;

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddNote(lead.id, newNote);
    setNewNote("");
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNote(
      lead.id,
      `Scheduled follow-up updated to ${scheduledDate}`
    );
    setScheduleSuccess(true);
    setTimeout(() => setScheduleSuccess(false), 2500);
  };

  const statusOptions: LeadStatus[] = [
    "New",
    "Contacted",
    "Interested",
    "Qualified",
    "Converted",
    "Lost",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-fade-in">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-xs shrink-0">
                {lead.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900 leading-tight">
                    {lead.name}
                  </h2>
                  <Badge variant="indigo" size="sm">
                    {lead.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lead.company}</span>
                  <span>•</span>
                  <span>Source: {lead.leadSource}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(lead)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
                title="Edit Lead"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics & Actions Bar */}
          <div className="px-5 py-3 border-b border-slate-100 bg-white grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Deal Value
              </span>
              <span className="text-sm font-bold text-indigo-600 font-mono">
                {currencySymbol}
                {lead.potentialDealValue.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Follow-up
              </span>
              <span className="text-xs font-semibold text-slate-800">
                {lead.followUpDate}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Assigned
              </span>
              <span className="text-xs font-medium text-slate-700 truncate block">
                {lead.assignedEmployee.split(" ")[0]}
              </span>
            </div>
            <div className="flex items-center justify-end">
              {lead.status !== "Converted" ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onConvertToCustomer(lead.id)}
                  leftIcon={<UserCheck className="w-3.5 h-3.5" />}
                  className="text-xs h-7 px-2.5 bg-emerald-600 hover:bg-emerald-700 shadow-2xs"
                >
                  Convert
                </Button>
              ) : (
                <Badge variant="success" dot size="sm">
                  Active Client
                </Badge>
              )}
            </div>
          </div>

          {/* Contact Details Bar */}
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{lead.email}</span>
            </a>
            <a
              href={`tel:${lead.phone}`}
              className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{lead.phone}</span>
            </a>
          </div>

          {/* Pipeline Stage Quick Switcher */}
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-400 uppercase shrink-0">
              Stage:
            </span>
            <div className="flex items-center gap-1">
              {statusOptions.map((st) => (
                <button
                  key={st}
                  onClick={() => onStatusChange(lead.id, st)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all shrink-0 border",
                    lead.status === st
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs font-semibold"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Drawer Navigation Tabs */}
          <div className="flex items-center border-b border-slate-100 px-5 bg-white text-xs font-semibold text-slate-500">
            {[
              { id: "notes", label: `Notes (${lead.notesList?.length || 0})` },
              { id: "activity", label: `Activity (${lead.activityHistory?.length || 0})` },
              { id: "schedule", label: "Schedule Follow-up" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={cn(
                  "py-3 px-3 border-b-2 transition-all",
                  activeTab === t.id
                    ? "border-indigo-600 text-indigo-700"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Drawer Body Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* TAB: NOTES */}
            {activeTab === "notes" && (
              <div className="space-y-4 animate-fade-in">
                {/* Add Note Input */}
                <form onSubmit={handleNoteSubmit} className="space-y-2">
                  <textarea
                    rows={2}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new discovery note, client feedback, or call summary..."
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/10"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={!newNote.trim()}
                      leftIcon={<Plus className="w-3.5 h-3.5" />}
                    >
                      Post Note
                    </Button>
                  </div>
                </form>

                {/* Notes List */}
                <div className="space-y-3 pt-2">
                  {(!lead.notesList || lead.notesList.length === 0) && (
                    <div className="py-8 text-center text-xs text-slate-400">
                      No notes logged for this lead yet.
                    </div>
                  )}
                  {lead.notesList?.map((note) => (
                    <div
                      key={note.id}
                      className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-800">
                          {note.author}
                        </span>
                        <span className="text-slate-400">{note.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ACTIVITY HISTORY */}
            {activeTab === "activity" && (
              <div className="space-y-3 animate-fade-in">
                {(!lead.activityHistory || lead.activityHistory.length === 0) && (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No activity records found.
                  </div>
                )}
                {lead.activityHistory?.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-white shadow-2xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">
                          {act.title}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {act.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{act.detail}</p>
                      <div className="text-[10px] text-slate-400">
                        By {act.author}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: SCHEDULE FOLLOW-UP */}
            {activeTab === "schedule" && (
              <form onSubmit={handleScheduleSubmit} className="space-y-4 animate-fade-in">
                {scheduleSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Follow-up scheduled and synchronized with team calendar!</span>
                  </div>
                )}

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">
                    Set Next Contact Milestone
                  </h4>
                  <div>
                    <label className="text-xs text-slate-600 block mb-1.5 font-medium">
                      Select Target Date
                    </label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-2xs focus-visible:outline-none focus-visible:border-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="w-full justify-center"
                  >
                    Save & Schedule Reminder
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/70">
            {showDeleteConfirm ? (
              <div className="flex items-center gap-2 w-full justify-between animate-fade-in">
                <span className="text-xs text-rose-600 font-medium">
                  Confirm delete lead?
                </span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      onDelete(lead.id);
                      onClose();
                    }}
                  >
                    Delete Permanently
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                  leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
                  className="text-rose-600 hover:bg-rose-50"
                >
                  Delete Lead
                </Button>
                <Button variant="outline" size="sm" onClick={onClose}>
                  Close Drawer
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
