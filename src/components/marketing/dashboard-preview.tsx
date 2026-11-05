"use client";

import * as React from "react";
import {
  TrendingUp,
  Users,
  CreditCard,
  Bot,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Kanban,
  FileText,
  CheckCircle2,
  Shield,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DashboardPreview() {
  const [activeTab, setActiveTab] = React.useState<"overview" | "crm" | "finance">("overview");

  return (
    <div className="relative mx-auto max-w-5xl rounded-2xl border border-[#E3E9EF] bg-white p-2.5 sm:p-3.5 shadow-floating ring-1 ring-[#101820]/5 transition-all">
      {/* Browser Window Chrome */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#E3E9EF] bg-[#F7F9FB] rounded-t-xl mb-3">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E3E9EF]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E3E9EF]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E3E9EF]" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white border border-[#E3E9EF] text-[11px] text-[#667482] font-mono shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#20B8A5] inline-block animate-pulse" />
          app.nexora.io/overview
        </div>
        <div className="text-[11px] text-[#667482] font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F80ED]" />
          <span>Nexora Enterprise</span>
        </div>
      </div>

      {/* Mock Dashboard Body */}
      <div className="grid grid-cols-12 gap-3 p-1 sm:p-2 bg-[#F7F9FB] rounded-b-xl">
        {/* Left Mini Sidebar Preview (Desktop only) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col justify-between rounded-xl bg-white p-3 border border-[#E3E9EF] shadow-2xs">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3E9EF]">
              <div className="w-6 h-6 rounded-md bg-[#101820] text-[#F7F9FB] flex items-center justify-center text-xs font-bold">
                N
              </div>
              <div>
                <span className="text-xs font-bold text-[#17212B] block leading-none">Apex Agency</span>
                <span className="text-[10px] text-[#667482]">Production Workspace</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full px-2 py-1.5 rounded-lg font-medium flex items-center justify-between text-left transition-colors ${
                  activeTab === "overview"
                    ? "bg-[#EBF3FC] text-[#2F80ED] font-semibold"
                    : "text-[#667482] hover:bg-[#F7F9FB]"
                }`}
              >
                <span>Dashboard Overview</span>
                {activeTab === "overview" && <span className="w-1.5 h-1.5 rounded-full bg-[#2F80ED]" />}
              </button>
              <button
                onClick={() => setActiveTab("crm")}
                className={`w-full px-2 py-1.5 rounded-lg font-medium flex items-center justify-between text-left transition-colors ${
                  activeTab === "crm"
                    ? "bg-[#EBF3FC] text-[#2F80ED] font-semibold"
                    : "text-[#667482] hover:bg-[#F7F9FB]"
                }`}
              >
                <span>CRM & Pipeline</span>
                <Badge variant="accent" size="sm" className="text-[9px] py-0">12 Deals</Badge>
              </button>
              <button
                onClick={() => setActiveTab("finance")}
                className={`w-full px-2 py-1.5 rounded-lg font-medium flex items-center justify-between text-left transition-colors ${
                  activeTab === "finance"
                    ? "bg-[#EBF3FC] text-[#2F80ED] font-semibold"
                    : "text-[#667482] hover:bg-[#F7F9FB]"
                }`}
              >
                <span>Invoicing & Ledger</span>
                <Badge variant="teal" size="sm" className="text-[9px] py-0">Live</Badge>
              </button>
              <div className="px-2 py-1.5 rounded-lg text-[#667482] flex items-center justify-between">
                <span>Autonomous Agents</span>
                <span className="text-[10px] text-[#20B8A5] font-semibold">Active</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-[#101820] p-2.5 text-[#F7F9FB] text-[11px] space-y-1 shadow-2xs">
            <div className="flex items-center gap-1.5 font-semibold text-[#20B8A5]">
              <Sparkles className="w-3 h-3" />
              <span>AI Agents Active</span>
            </div>
            <p className="text-[#667482] text-[10px] leading-snug">
              Auto-reconciling Stripe ledger & overdue reminders.
            </p>
          </div>
        </div>

        {/* Right Dashboard Content */}
        <div className="col-span-12 lg:col-span-9 space-y-3">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="rounded-xl border border-[#E3E9EF] bg-white p-3 shadow-2xs">
              <div className="text-[11px] font-medium text-[#667482]">Monthly Revenue</div>
              <div className="text-base sm:text-lg font-bold text-[#17212B] mt-1">₹4,85,000</div>
              <div className="flex items-center gap-1 text-[11px] text-[#20B8A5] font-semibold mt-1">
                <ArrowUpRight className="w-3 h-3" />
                <span>+18.4% vs last mo</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#E3E9EF] bg-white p-3 shadow-2xs">
              <div className="text-[11px] font-medium text-[#667482]">Operating Expenses</div>
              <div className="text-base sm:text-lg font-bold text-[#17212B] mt-1">₹1,42,200</div>
              <div className="flex items-center gap-1 text-[11px] text-[#667482] font-medium mt-1">
                <span>Controlled (29.3%)</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#E3E9EF] bg-white p-3 shadow-2xs">
              <div className="text-[11px] font-medium text-[#667482]">Active Pipeline</div>
              <div className="text-base sm:text-lg font-bold text-[#17212B] mt-1">₹12,40,000</div>
              <div className="flex items-center gap-1 text-[11px] text-[#2F80ED] font-semibold mt-1">
                <span>18 Qualified Leads</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#E3E9EF] bg-white p-3 shadow-2xs">
              <div className="text-[11px] font-medium text-[#667482]">Gross Margin</div>
              <div className="text-base sm:text-lg font-bold text-[#17212B] mt-1">70.7%</div>
              <div className="flex items-center gap-1 text-[11px] text-[#20B8A5] font-semibold mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Healthy Cashflow</span>
              </div>
            </div>
          </div>

          {/* Center Chart & AI Insight Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Visual Mini Chart */}
            <div className="sm:col-span-2 rounded-xl border border-[#E3E9EF] bg-white p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-xs font-semibold text-[#17212B]">Cash Flow & Collections</h4>
                  <p className="text-[10px] text-[#667482]">Revenue (Blue) vs Operating Costs (Neutral)</p>
                </div>
                <Badge variant="accent" size="sm">FY 2026</Badge>
              </div>

              {/* Minimal CSS Bar Representation */}
              <div className="h-28 flex items-end justify-between gap-2 pt-2 px-1">
                {[
                  { month: "Jun", rev: 52, exp: 24 },
                  { month: "Jul", rev: 64, exp: 26 },
                  { month: "Aug", rev: 58, exp: 22 },
                  { month: "Sep", rev: 80, exp: 29 },
                  { month: "Oct", rev: 92, exp: 32 },
                  { month: "Nov", rev: 100, exp: 28 },
                ].map((bar) => (
                  <div key={bar.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      <div
                        className="w-1/2 bg-[#2F80ED] rounded-t-sm transition-all hover:bg-[#1E65D0]"
                        style={{ height: `${bar.rev}%` }}
                      />
                      <div
                        className="w-1/2 bg-[#E3E9EF] rounded-t-sm transition-all hover:bg-[#CBD5E1]"
                        style={{ height: `${bar.exp}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#667482] font-medium">{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live AI Agent Realtime Log */}
            <div className="rounded-xl border border-[#E3E9EF] bg-[#101820] text-[#F7F9FB] p-3.5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F7F9FB]">
                    <Bot className="w-3.5 h-3.5 text-[#20B8A5]" />
                    <span>Autonomous Agents</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#20B8A5] animate-pulse" />
                </div>
                <div className="space-y-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-[#17232D] border border-[#263746]">
                    <span className="font-semibold text-[#20B8A5] block">3 Lead Follow-ups Sent</span>
                    <span className="text-[#A0B0C0] text-[10px]">Zenith Media & Orbit Agency viewed quotes.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#17232D] border border-[#263746]">
                    <span className="font-semibold text-[#2F80ED] block">Reconciliation Matched</span>
                    <span className="text-[#A0B0C0] text-[10px]">Stripe payout ₹1,85,000 synced with ledger.</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#263746] flex items-center justify-between text-[10px] text-[#2F80ED] font-medium">
                <span>Live Feed Running</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
