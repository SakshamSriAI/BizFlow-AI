"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChatMessage, SuggestedAction } from "@/types/ai";
import { formatMoney } from "@/lib/money";
import { OverdueInvoicesWidget } from "./widgets/overdue-invoices-widget";
import { SpendingBreakdownWidget } from "./widgets/spending-breakdown-widget";
import { LeadsFollowupWidget } from "./widgets/leads-followup-widget";
import { RevenueComparisonWidget } from "./widgets/revenue-comparison-widget";
import { TopCustomersWidget } from "./widgets/top-customers-widget";
import { PerformanceSummaryWidget } from "./widgets/performance-summary-widget";
import { Button } from "@/components/ui/button";
import {
  Bot,
  User,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

interface ChatMessageItemProps {
  message: ChatMessage;
  onTriggerAction?: (action: SuggestedAction) => void;
}

export function ChatMessageItem({
  message,
  onTriggerAction,
}: ChatMessageItemProps) {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);

  const isUser = message.sender === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActionClick = (act: SuggestedAction) => {
    if (act.targetRoute) {
      router.push(act.targetRoute);
    } else {
      onTriggerAction?.(act);
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end gap-3 my-4">
        <div className="max-w-xl bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
          <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
          <span className="block text-[10px] text-blue-200 mt-1 text-right">
            {message.timestamp}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0 font-semibold text-xs border border-slate-300">
          <User className="w-4 h-4 text-slate-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 my-5 group">
      <div className="w-8 h-8 rounded-xl bg-[#101820] flex items-center justify-center text-[#20B8A5] shrink-0 shadow-xs border border-[#263746]">
        <Bot className="w-4 h-4 text-[#20B8A5]" />
      </div>

      <div className="flex-1 max-w-2xl space-y-2">
        {/* Header & Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 tracking-tight">
              Nexora AI Assistant
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#EBF3FC] text-[#2F80ED] border border-[#C4DEFA]">
              Copilot v2.4
            </span>
            <span className="text-[11px] text-slate-400">• {message.timestamp}</span>
          </div>

          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-slate-600 rounded"
            title="Copy response"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Text Body */}
        <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-sm p-4 shadow-sm text-sm text-slate-800 leading-relaxed space-y-2">
          {message.text.split("\n\n").map((para, i) => (
            <p key={i} className="leading-relaxed">
              {para}
            </p>
          ))}

          {/* Embedded Data Widgets */}
          {message.widgetType === "overdue_invoices" && (
            <OverdueInvoicesWidget
              data={message.widgetData}
              onTriggerReminder={(inv) => {
                onTriggerAction?.({
                  id: `remind-${inv.id}`,
                  label: `Dispatch Reminder to ${inv.customerName} (${formatMoney(
                    inv.amountDueCents,
                    "INR"
                  )})`,
                  actionType: "send_reminder",
                  payload: inv,
                });
              }}
            />
          )}

          {message.widgetType === "spending_breakdown" && (
            <SpendingBreakdownWidget data={message.widgetData} />
          )}

          {message.widgetType === "leads_followup" && (
            <LeadsFollowupWidget
              data={message.widgetData}
              onScheduleCall={(lead) => {
                onTriggerAction?.({
                  id: `call-${lead.id}`,
                  label: `Schedule Strategy Call with ${lead.contactName} (${lead.company})`,
                  actionType: "schedule_call",
                  payload: lead,
                });
              }}
            />
          )}

          {message.widgetType === "revenue_comparison" && (
            <RevenueComparisonWidget data={message.widgetData} />
          )}

          {message.widgetType === "top_customers" && (
            <TopCustomersWidget data={message.widgetData} />
          )}

          {message.widgetType === "performance_summary" && (
            <PerformanceSummaryWidget data={message.widgetData} />
          )}

          {/* Suggested Actions Bar */}
          {message.suggestedActions && message.suggestedActions.length > 0 && (
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block w-full mb-0.5">
                Recommended Next Actions:
              </span>
              {message.suggestedActions.map((act) => (
                <button
                  key={act.id}
                  onClick={() => handleActionClick(act)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 transition-all shadow-2xs"
                >
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>{act.label}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                </button>
              ))}
            </div>
          )}

          <div className="pt-2 text-[10px] text-slate-400 border-t border-slate-100/60 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>Illustrative AI Analysis • Predefined Mock Data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
