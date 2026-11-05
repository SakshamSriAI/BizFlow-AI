"use client";

import React from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/money";
import { CreditCard, ArrowRight, PieChart } from "lucide-react";

interface CategorySpending {
  name: string;
  spentCents: number;
  budgetCents: number;
  percent: number;
}

interface SpendingBreakdownWidgetProps {
  data: {
    totalSpentCents: number;
    budgetLimitCents: number;
    utilizationPercent: number;
    categories: CategorySpending[];
  };
}

export function SpendingBreakdownWidget({ data }: SpendingBreakdownWidgetProps) {
  if (!data?.categories) return null;

  return (
    <div className="my-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3.5 max-w-xl">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
          <CreditCard className="w-4 h-4 text-blue-600" />
          <span>Expenditure & Budget Utilization</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-900">
            {formatMoney(data.totalSpentCents, "INR")}
          </span>
          <span className="text-[10px] text-slate-500 block">
            {data.utilizationPercent}% of ceiling
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {data.categories.map((cat, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-700">{cat.name}</span>
              <div className="flex items-center gap-1.5 font-mono">
                <span className="font-semibold text-slate-900">
                  {formatMoney(cat.spentCents, "INR")}
                </span>
                <span className="text-slate-400 text-[10px]">
                  / {formatMoney(cat.budgetCents, "INR")}
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  cat.percent > 90
                    ? "bg-amber-500"
                    : "bg-blue-600"
                }`}
                style={{ width: `${Math.min(100, cat.percent)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-500">
        <span>Allocations refreshed from Finance Ledger</span>
        <Link
          href="/finance/categories"
          className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5"
        >
          Manage Budgets <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
