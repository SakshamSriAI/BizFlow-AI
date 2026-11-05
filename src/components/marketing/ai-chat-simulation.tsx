"use client";

import * as React from "react";
import {
  Sparkles,
  Bot,
  User,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileText,
  Clock,
  CheckCircle2,
  Send,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ConversationScenario {
  id: string;
  query: string;
  label: string;
  answer: string;
  stats?: {
    label: string;
    value: string;
    subtext: string;
  }[];
  actionItem?: {
    title: string;
    actionLabel: string;
    details: string;
  };
}

const scenarios: ConversationScenario[] = [
  {
    id: "revenue",
    label: "Monthly Revenue",
    query: "How much revenue did we generate this month?",
    answer:
      "Your business generated ₹4,85,000 this month, up 18% compared with last month. Recurring service retainers formed 72% of total receipts, with ₹65,000 in scheduled invoices due before month-end.",
    stats: [
      { label: "Gross Receipts", value: "₹4,85,000", subtext: "+18.4% MoM" },
      { label: "Net Cash Surplus", value: "₹3,42,800", subtext: "70.6% Margin" },
      { label: "Retainer Stability", value: "₹3,50,000", subtext: "14 Active Clients" },
    ],
  },
  {
    id: "leads",
    label: "Lead Follow-ups",
    query: "Which leads need immediate follow-up today?",
    answer:
      "I identified 3 high-priority leads with pending proposals. All three have viewed your quote over 3 times without a reply in the last 48 hours.",
    actionItem: {
      title: "Prepared 3 Personalized Follow-up Drafts",
      details: "Nexus Tech (₹2,50,000), Zenith Media (₹1,80,000), Orbit Agency (₹95,000)",
      actionLabel: "Review & Send 1-Click Follow-ups",
    },
  },
  {
    id: "overdue",
    label: "Overdue Invoices",
    query: "Show me overdue invoices and suggest next steps.",
    answer:
      "You have 2 overdue invoices totaling ₹65,000. Invoice #INV-2024-082 for Horizon Studio is 9 days late, and #INV-2024-079 for Bright Media is 4 days late.",
    actionItem: {
      title: "Gentle WhatsApp & Email Reminders Queued",
      details: "Friendly payment links generated with zero-interest waiver reminder.",
      actionLabel: "Dispatch Payment Reminders",
    },
  },
  {
    id: "summary",
    label: "Weekly Business Summary",
    query: "Summarize my business performance for this week.",
    answer:
      "Excellent momentum this week. You closed 2 new clients (+₹1,40,000 ARR), collected 100% of target receivables, and marketing spend decreased by 6% while lead inquiries rose 22%.",
    stats: [
      { label: "Deals Won", value: "2 Clients", subtext: "₹1.4L Added ARR" },
      { label: "Cash Velocity", value: "3.2 Days", subtext: "Average Invoice Pay Time" },
      { label: "Task Health", value: "94% Complete", subtext: "Operational Flow" },
    ],
  },
];

export function AIChatSimulation() {
  const [activeScenarioId, setActiveScenarioId] = React.useState<string>("revenue");
  const [isTyping, setIsTyping] = React.useState<boolean>(false);

  const activeScenario =
    scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const handleSelectScenario = (id: string) => {
    if (id === activeScenarioId) return;
    setIsTyping(true);
    setActiveScenarioId(id);
    setTimeout(() => {
      setIsTyping(false);
    }, 300);
  };

  return (
    <div className="rounded-2xl border border-[#E3E9EF] bg-white p-5 sm:p-7 shadow-card">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E9EF] gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#101820] flex items-center justify-center text-[#20B8A5] shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#17212B] flex items-center gap-2">
              Nexora Business Copilot
              <Badge variant="accent" size="sm">Interactive Simulation</Badge>
            </h3>
            <p className="text-xs text-[#667482]">
              Select any sample prompt below to preview simulated AI responses
            </p>
          </div>
        </div>
        <div className="text-[11px] text-[#667482] flex items-center gap-1.5 self-start sm:self-auto bg-[#F7F9FB] px-2.5 py-1 rounded-full border border-[#E3E9EF] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#20B8A5]" />
          Model: Nexora-Biz-Engine
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-medium text-[#667482] uppercase tracking-wider shrink-0">
          Try Prompt:
        </span>
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSelectScenario(s.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border",
              activeScenarioId === s.id
                ? "bg-[#101820] text-[#F7F9FB] border-[#101820] shadow-xs"
                : "bg-[#F7F9FB] text-[#17212B] border-[#E3E9EF] hover:bg-[#F0F4F8]"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Chat Thread */}
      <div className="space-y-4 py-4 min-h-[260px]">
        {/* User Query Bubble */}
        <div className="flex items-start gap-3 max-w-xl ml-auto justify-end">
          <div className="rounded-2xl rounded-tr-none bg-[#101820] px-4 py-2.5 text-xs text-[#F7F9FB] shadow-xs">
            {activeScenario.query}
          </div>
          <div className="w-7 h-7 rounded-full bg-[#E3E9EF] text-[#17212B] flex items-center justify-center shrink-0 text-xs font-semibold">
            You
          </div>
        </div>

        {/* AI Assistant Bubble */}
        <div className="flex items-start gap-3 max-w-2xl mr-auto">
          <div className="w-7 h-7 rounded-full bg-[#101820] text-[#20B8A5] flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4" />
          </div>

          <div className="space-y-3 flex-1">
            <div className="rounded-2xl rounded-tl-none bg-[#F7F9FB] border border-[#E3E9EF] px-4 py-3 text-xs text-[#17212B] leading-relaxed shadow-2xs">
              {isTyping ? (
                <div className="flex items-center gap-1.5 py-1 text-[#667482]">
                  <span className="w-2 h-2 rounded-full bg-[#2F80ED] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#2F80ED] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#2F80ED] animate-bounce [animation-delay:0.4s]" />
                </div>
              ) : (
                activeScenario.answer
              )}
            </div>

            {/* Structured Insights Card */}
            {!isTyping && activeScenario.stats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {activeScenario.stats.map((st, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white border border-[#E3E9EF] shadow-2xs"
                  >
                    <div className="text-[10px] text-[#667482] uppercase tracking-wider font-semibold">
                      {st.label}
                    </div>
                    <div className="text-sm font-bold text-[#17212B] mt-0.5">
                      {st.value}
                    </div>
                    <div className="text-[10px] text-[#20B8A5] font-semibold mt-0.5">
                      {st.subtext}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Item Ready for Execution */}
            {!isTyping && activeScenario.actionItem && (
              <div className="rounded-xl border border-[#BCEEE7] bg-[#E8F8F6] p-3 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-[#137A6D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#20B8A5] shrink-0" />
                  <span>{activeScenario.actionItem.title}</span>
                </div>
                <p className="text-[11px] text-[#17212B]">
                  {activeScenario.actionItem.details}
                </p>
                <div className="pt-1">
                  <button
                    onClick={() =>
                      alert("Simulated AI workflow: In Phase 7 & 8, this autonomous action is approved with 1 click!")
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#101820] text-[#F7F9FB] text-[11px] font-medium hover:bg-[#17232D] transition-colors shadow-2xs"
                  >
                    <span>{activeScenario.actionItem.actionLabel}</span>
                    <ArrowRight className="w-3 h-3 text-[#20B8A5]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Illustrative Disclaimer Notice */}
      <div className="mt-2 pt-3 border-t border-[#E3E9EF] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#667482]">
        <span className="flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-[#667482] shrink-0" />
          <span>Illustrative mock conversation. Nexora AI runs against your actual workspace data once connected.</span>
        </span>
        <span className="font-mono text-[#2F80ED] text-[10px] sm:text-[11px] self-end sm:self-auto">Interactive Mode</span>
      </div>
    </div>
  );
}
