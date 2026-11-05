"use client";

import * as React from "react";
import {
  MoreVertical,
  Plus,
  Building2,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lead, LeadStatus } from "@/types/crm";
import { cn } from "@/lib/utils";

export interface LeadKanbanBoardProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
  onQuickAdd: (status: LeadStatus) => void;
  currencySymbol?: string;
}

export function LeadKanbanBoard({
  leads,
  onSelectLead,
  onStatusChange,
  onQuickAdd,
  currencySymbol = "₹",
}: LeadKanbanBoardProps) {
  const columns: { status: LeadStatus; label: string; color: string }[] = [
    { status: "New", label: "New Leads", color: "border-slate-300" },
    { status: "Contacted", label: "Contacted", color: "border-blue-300" },
    { status: "Interested", label: "Interested", color: "border-indigo-400" },
    { status: "Qualified", label: "Qualified Deal", color: "border-amber-400" },
    { status: "Converted", label: "Won / Converted", color: "border-emerald-500" },
    { status: "Lost", label: "Lost Opportunity", color: "border-rose-400" },
  ];

  const getNextStage = (current: LeadStatus): LeadStatus | null => {
    switch (current) {
      case "New":
        return "Contacted";
      case "Contacted":
        return "Interested";
      case "Interested":
        return "Qualified";
      case "Qualified":
        return "Converted";
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-6">
      {columns.map((col) => {
        const colLeads = leads.filter((l) => l.status === col.status);
        const colTotalValue = colLeads.reduce(
          (sum, l) => sum + (l.potentialDealValue || 0),
          0
        );

        return (
          <div
            key={col.status}
            className="flex flex-col rounded-2xl bg-slate-100/70 border border-slate-200/80 p-3 min-w-[240px] max-w-full"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-200/70">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800">
                    {col.label}
                  </span>
                  <Badge variant="secondary" size="sm" className="px-1.5 py-0 h-4">
                    {colLeads.length}
                  </Badge>
                </div>
                <div className="text-[10px] text-slate-400 font-mono font-medium">
                  {currencySymbol}
                  {(colTotalValue / 100000).toFixed(1)}L Total
                </div>
              </div>

              <button
                onClick={() => onQuickAdd(col.status)}
                className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-md transition-colors"
                title={`Add lead to ${col.label}`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Column Cards */}
            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[calc(100vh-320px)] pr-0.5">
              {colLeads.length === 0 ? (
                <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                  No deals
                </div>
              ) : (
                colLeads.map((lead) => {
                  const nextStage = getNextStage(lead.status);

                  return (
                    <div
                      key={lead.id}
                      className="group rounded-xl border border-slate-200/90 bg-white p-3 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer space-y-2"
                      onClick={() => onSelectLead(lead)}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                          {lead.name}
                        </div>
                        <span className="font-mono text-xs font-bold text-indigo-600 shrink-0">
                          {currencySymbol}
                          {lead.potentialDealValue.toLocaleString()}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{lead.company}</span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{lead.followUpDate}</span>
                        </span>
                        <span className="truncate max-w-[80px]">
                          {lead.assignedEmployee.split(" ")[0]}
                        </span>
                      </div>

                      {/* Quick stage advance pill */}
                      {nextStage && (
                        <div
                          className="pt-1.5 flex justify-end"
                          onClick={(e) => {
                            e.stopPropagation();
                            onStatusChange(lead.id, nextStage);
                          }}
                        >
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded transition-colors"
                          >
                            <span>Move to {nextStage}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
