"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Plus,
  Search,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  useOperationsReminders,
  toggleReminderComplete,
  snoozeReminder,
  deleteReminder,
} from "@/lib/operations-store";
import { ReminderUrgency } from "@/types/operations";
import { NewReminderModal } from "@/components/operations/new-reminder-modal";

export default function OperationsRemindersPage() {
  const { reminders, mounted, refresh } = useOperationsReminders();
  const [activeTab, setActiveTab] = React.useState<"all" | "critical" | "upcoming" | "completed">("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="System Reminders & Deadlines"
          breadcrumbs={[{ label: "Operations" }, { label: "Reminders" }]}
        />
        <div className="p-8 text-center text-xs text-slate-400">Loading reminders...</div>
      </div>
    );
  }

  const activeReminders = reminders.filter((r) => !r.isCompleted);
  const criticalCount = activeReminders.filter((r) => r.urgency === "critical").length;
  const completedCount = reminders.filter((r) => r.isCompleted).length;

  const filteredReminders = reminders.filter((r) => {
    if (activeTab === "critical") {
      if (r.urgency !== "critical" || r.isCompleted) return false;
    } else if (activeTab === "upcoming") {
      if (r.isCompleted) return false;
    } else if (activeTab === "completed") {
      if (!r.isCompleted) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      const matchCategory = r.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCategory) return false;
    }

    return true;
  });

  const getUrgencyBadge = (urgency: ReminderUrgency) => {
    switch (urgency) {
      case "critical":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Critical Deadline
          </span>
        );
      case "high":
        return <Badge variant="warning">High Priority</Badge>;
      case "normal":
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="System Reminders & Deadlines"
        description="Stay on top of corporate tax obligations, contractual renewals, billing cycles, and operational milestones."
        breadcrumbs={[{ label: "Operations" }, { label: "Reminders" }]}
        actions={
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            New Reminder
          </Button>
        }
      />

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Pending Reminders</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {activeReminders.length}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Bell className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Active business compliance items</p>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Critical Deadlines</p>
              <h3 className="text-2xl font-bold text-rose-600 mt-1">
                {criticalCount}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Immediate financial/tax impact</p>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Resolved / Completed</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">
                {completedCount}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Archived compliance records</p>
        </Card>
      </div>

      {/* Control Bar: Tabs & Search */}
      <Card className="p-4 bg-white border-slate-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: `All (${reminders.length})` },
              { id: "critical", label: `Critical (${criticalCount})` },
              { id: "upcoming", label: `Upcoming (${activeReminders.length})` },
              { id: "completed", label: `Completed (${completedCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  activeTab === tab.id
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reminders..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>
        </div>
      </Card>

      {/* Reminders Feed */}
      <div className="space-y-3">
        {filteredReminders.length === 0 ? (
          <Card className="p-12 text-center bg-white border-slate-200">
            <Bell className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-slate-800">No reminders match</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              There are no reminders matching your current filter. You are all caught up!
            </p>
          </Card>
        ) : (
          filteredReminders.map((reminder) => {
            const isCritical = reminder.urgency === "critical" && !reminder.isCompleted;

            return (
              <Card
                key={reminder.id}
                className={`p-4 bg-white border transition-all ${
                  isCritical
                    ? "border-rose-300 shadow-xs shadow-rose-100"
                    : reminder.isCompleted
                    ? "border-slate-200 bg-slate-50/50 opacity-70"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-sm font-semibold ${
                          reminder.isCompleted
                            ? "line-through text-slate-400"
                            : "text-slate-900"
                        }`}
                      >
                        {reminder.title}
                      </span>
                      {getUrgencyBadge(reminder.urgency)}
                      <Badge variant="secondary">{reminder.category}</Badge>
                      {reminder.snoozedUntil && (
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Snoozed until {reminder.snoozedUntil}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-xs ${
                        reminder.isCompleted
                          ? "line-through text-slate-400"
                          : "text-slate-600"
                      }`}
                    >
                      {reminder.description}
                    </p>

                    <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Deadline: {reminder.dueDate}</span>
                      </span>
                      <span>Created {reminder.createdAt}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {!reminder.isCompleted && (
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Clock className="w-3.5 h-3.5 text-amber-600" />}
                        onClick={() => snoozeReminder(reminder.id, 3)}
                        title="Snooze reminder by 3 days"
                        className="text-xs"
                      >
                        Snooze (+3d)
                      </Button>
                    )}

                    <Button
                      variant={reminder.isCompleted ? "outline" : "primary"}
                      size="sm"
                      leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                      onClick={() => toggleReminderComplete(reminder.id)}
                      className="text-xs"
                    >
                      {reminder.isCompleted ? "Reopen" : "Mark Resolved"}
                    </Button>

                    <button
                      onClick={() => {
                        if (confirm("Delete this reminder?")) {
                          deleteReminder(reminder.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      title="Delete Reminder"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      <NewReminderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={refresh}
      />
    </div>
  );
}
