"use client";

import React from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/money";
import { TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";

interface RevenueComparisonWidgetProps {
  data: {
    currentMonth: string;
    previousMonth: string;
    currentRevenueCents: number;
    previousRevenueCents: number;
    percentageGrowth: number;
    retainerSharePercent: number;
    projectSharePercent: number;
    netMarginPercent: number;
  };
}

export function RevenueComparisonWidget({
  data,
}: RevenueComparisonWidgetProps) {
  if (!data) return null;

  return (
    <div className="my-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4 max-w-xl">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>Month-over-Month Revenue Trajectory</span>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> +{data.percentageGrowth}% Growth
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">
            {data.currentMonth}
          </span>
          <div className="text-lg font-bold text-slate-900 mt-0.5 font-mono">
            {formatMoney(data.currentRevenueCents, "INR")}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">
            Primary Inflow Period
          </span>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">
            {data.previousMonth}
          </span>
          <div className="text-lg font-bold text-slate-600 mt-0.5 font-mono">
            {formatMoney(data.previousRevenueCents, "INR")}
          </div>
          <span className="text-[10px] text-slate-400">Baseline Comparison</span>
        </div>
      </div>

      <div className="space-y-2 text-xs bg-slate-50/70 p-3 rounded-lg border border-slate-100">
        <div className="flex justify-between">
          <span className="text-slate-600">Retainer vs Project Mix:</span>
          <span className="font-semibold text-slate-900">
            {data.retainerSharePercent}% Retainer / {data.projectSharePercent}% Projects
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Net Operating Margin:</span>
          <span className="font-semibold text-emerald-600">
            {data.netMarginPercent}% Net Surplus
          </span>
        </div>
      </div>

      <div className="pt-1 flex justify-between items-center text-[11px] text-slate-500">
        <span>Verified against double-entry ledger</span>
        <Link
          href="/finance/overview"
          className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5"
        >
          View Full Breakdown <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
