"use client";

import React from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/button";
import { UserCheck, PhoneCall, ArrowRight, Calendar } from "lucide-react";

interface LeadItem {
  id: string;
  contactName: string;
  company: string;
  potentialValueCents: number;
  stage: string;
  dueDate: string;
  notes: string;
}

interface LeadsFollowupWidgetProps {
  data: {
    totalPipelineCents: number;
    leads: LeadItem[];
  };
  onScheduleCall?: (lead: LeadItem) => void;
}

export function LeadsFollowupWidget({
  data,
  onScheduleCall,
}: LeadsFollowupWidgetProps) {
  if (!data?.leads) return null;

  return (
    <div className="my-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3.5 max-w-xl">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
          <UserCheck className="w-4 h-4 text-[#2F80ED]" />
          <span>Active Leads Requiring Follow-Up</span>
        </div>
        <span className="text-xs font-bold text-[#2F80ED] bg-[#EBF3FC] px-2.5 py-0.5 rounded-full border border-[#C4DEFA]">
          Pipeline: {formatMoney(data.totalPipelineCents, "INR")}
        </span>
      </div>

      <div className="space-y-2.5">
        {data.leads.map((lead) => (
          <div
            key={lead.id}
            className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    {lead.contactName}
                  </span>
                  <span className="text-xs text-slate-500">• {lead.company}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {lead.stage}
                  </span>
                  <span className="text-[11px] font-medium text-amber-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {lead.dueDate}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-900 font-mono">
                  {formatMoney(lead.potentialValueCents, "INR")}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 italic bg-white p-2 rounded border border-slate-100">
              "{lead.notes}"
            </p>

            <div className="flex justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onScheduleCall?.(lead)}
                className="h-7 px-2.5 text-[11px] text-[#2F80ED] hover:bg-[#EBF3FC] border-[#C4DEFA]"
              >
                <PhoneCall className="w-3 h-3 mr-1 text-[#2F80ED]" />
                Schedule Call
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1 flex justify-between items-center text-[11px] text-slate-500">
        <span>CRM synchronization active</span>
        <Link
          href="/sales/pipeline"
          className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5"
        >
          Open Sales Pipeline <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
