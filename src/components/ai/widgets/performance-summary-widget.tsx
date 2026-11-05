"use client";

import React from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/money";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

interface PerformanceSummaryWidgetProps {
  data: {
    monthlyRevenueCents: number;
    revenueGrowthPercent: number;
    monthlyExpensesCents: number;
    netProfitMarginPercent: number;
    cashRunwayMonths: number;
    activeClientsCount: number;
    activeDealsValueCents: number;
    overdueCount: number;
  };
}

export function PerformanceSummaryWidget({
  data,
}: PerformanceSummaryWidgetProps) {
  if (!data) return null;

  return (
    <div className="my-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4 max-w-xl">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Executive Business Scorecard</span>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Status: Healthy Growth
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <span className="text-[10px] uppercase font-semibold text-slate-400">
            Revenue (Mo.)
          </span>
          <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">
            {formatMoney(data.monthlyRevenueCents, "INR")}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">
            +{data.revenueGrowthPercent}% MoM
          </span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <span className="text-[10px] uppercase font-semibold text-slate-400">
            Expenses (Mo.)
          </span>
          <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">
            {formatMoney(data.monthlyExpensesCents, "INR")}
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Controlled</span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <span className="text-[10px] uppercase font-semibold text-slate-400">
            Net Margin
          </span>
          <div className="text-sm font-bold text-emerald-600 mt-0.5 font-mono">
            {data.netProfitMarginPercent}%
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">High Surplus</span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <span className="text-[10px] uppercase font-semibold text-slate-400">
            Runway
          </span>
          <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">
            {data.cashRunwayMonths} Mo
          </div>
          <span className="text-[10px] text-blue-600 font-medium">Safe Horizon</span>
        </div>
      </div>

      <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/70 text-xs text-amber-900 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-amber-950">
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          <span>Strategic Takeaways:</span>
        </div>
        <p className="text-[11px] leading-relaxed text-amber-800">
          Pipeline holds <strong>{formatMoney(data.activeDealsValueCents, "INR")}</strong> across {data.activeClientsCount} accounts. Focus priority on resolving the {data.overdueCount} overdue invoices to optimize working capital.
        </p>
      </div>

      <div className="pt-1 flex justify-between items-center text-[11px] text-slate-500">
        <span>AI Copilot Analysis • Mock Business Simulation</span>
        <Link
          href="/app"
          className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5"
        >
          Open Cockpit <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
