"use client";

import * as React from "react";
import {
  TrendingUp,
  Users,
  CreditCard,
  Bot,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Kanban,
  FileText,
  DollarSign,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DashboardPreview() {
  return (
    <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-[0_20px_50px_rgba(79,70,229,0.07)] ring-1 ring-slate-900/5 transition-all">
      {/* Browser Window Chrome */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 bg-slate-50/70 rounded-t-xl mb-3">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white border border-slate-200/80 text-[11px] text-slate-500 font-mono shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          app.nexora.io/dashboard
        </div>
        <div className="text-[11px] text-slate-400 font-medium">Nexora Pro</div>
      </div>

      {/* Mock Dashboard Body */}
      <div className="grid grid-cols-12 gap-3 p-1 sm:p-2 bg-slate-50/50 rounded-b-xl">
        {/* Left Mini Sidebar Preview (Desktop only) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col justify-between rounded-xl bg-white p-3 border border-slate-200/70 shadow-2xs">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                N
              </div>
              <span className="text-xs font-bold text-slate-800">Acme Agency</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="px-2 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold flex items-center justify-between">
                <span>Dashboard</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              </div>
              <div className="px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center justify-between">
                <span>Leads & CRM</span>
                <Badge variant="indigo" size="sm" className="text-[9px] py-0">12</Badge>
              </div>
              <div className="px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center justify-between">
                <span>Invoices</span>
                <Badge variant="warning" size="sm" className="text-[9px] py-0">3</Badge>
              </div>
              <div className="px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center justify-between">
                <span>Expenses</span>
              </div>
              <div className="px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center justify-between">
                <span>AI Agents</span>
                <span className="text-[10px] text-emerald-600 font-medium">Active</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-indigo-50/70 p-2.5 border border-indigo-100 text-[11px] space-y-1">
            <div className="flex items-center gap-1.5 text-indigo-700 font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>AI Copilot</span>
            </div>
            <p className="text-slate-500 leading-snug">
              Autonomous workflows active.
            </p>
          </div>
        </div>

        {/* Right Dashboard Content */}
        <div className="col-span-12 lg:col-span-9 space-y-3">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xs">
              <div className="text-[11px] font-medium text-slate-400">Total Revenue</div>
              <div className="text-base sm:text-lg font-bold text-slate-900 mt-1">₹4,85,000</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
                <ArrowUpRight className="w-3 h-3" />
                <span>+18.4% vs last mo</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xs">
              <div className="text-[11px] font-medium text-slate-400">Total Expenses</div>
              <div className="text-base sm:text-lg font-bold text-slate-900 mt-1">₹1,42,200</div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-1">
                <span>Controlled (29%)</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xs">
              <div className="text-[11px] font-medium text-slate-400">Active Deals</div>
              <div className="text-base sm:text-lg font-bold text-slate-900 mt-1">18 Leads</div>
              <div className="flex items-center gap-1 text-[11px] text-indigo-600 font-medium mt-1">
                <span>₹12.4L Pipeline</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xs">
              <div className="text-[11px] font-medium text-slate-400">Receivables</div>
              <div className="text-base sm:text-lg font-bold text-amber-600 mt-1">₹65,000</div>
              <div className="flex items-center gap-1 text-[11px] text-amber-600 font-medium mt-1">
                <span>2 overdue invoices</span>
              </div>
            </div>
          </div>

          {/* Center Chart & AI Insight Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Visual Mini Chart */}
            <div className="sm:col-span-2 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Monthly Cash Flow Performance</h4>
                  <p className="text-[10px] text-slate-400">Revenue (Indigo) vs Expenses (Slate)</p>
                </div>
                <Badge variant="indigo" size="sm">FY 2026</Badge>
              </div>

              {/* Elegant CSS bar chart representing performance */}
              <div className="h-28 flex items-end justify-between gap-2 pt-2 px-1">
                {[
                  { month: "Nov", rev: 45, exp: 20 },
                  { month: "Dec", rev: 62, exp: 25 },
                  { month: "Jan", rev: 55, exp: 22 },
                  { month: "Feb", rev: 78, exp: 30 },
                  { month: "Mar", rev: 92, exp: 35 },
                  { month: "Apr", rev: 100, exp: 28 },
                ].map((bar) => (
                  <div key={bar.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      <div
                        className="w-1/2 bg-indigo-600 rounded-t-sm transition-all hover:bg-indigo-700"
                        style={{ height: `${bar.rev}%` }}
                      />
                      <div
                        className="w-1/2 bg-slate-200 rounded-t-sm transition-all hover:bg-slate-300"
                        style={{ height: `${bar.exp}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live AI Agent Realtime Log */}
            <div className="rounded-xl border border-indigo-100 bg-linear-to-b from-indigo-50/40 to-white p-3.5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-950 mb-2">
                  <Bot className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Autonomous AI Agent</span>
                </div>
                <div className="space-y-2 text-[11px] text-slate-600">
                  <div className="p-2 rounded-lg bg-white border border-indigo-100/80 shadow-2xs">
                    <span className="font-semibold text-indigo-900 block">Follow-up Dispatched</span>
                    <span className="text-slate-500 text-[10px]">Identified 3 leads awaiting replies. Scheduled reminders.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-indigo-100/80 shadow-2xs">
                    <span className="font-semibold text-emerald-900 block">Overdue Invoice Nudge</span>
                    <span className="text-slate-500 text-[10px]">Payment draft ready for Apex Labs (₹32,500).</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-indigo-100/60 flex items-center justify-between text-[10px] text-indigo-600 font-medium">
                <span>View 4 Active Agents</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
