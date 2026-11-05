"use client";

import * as React from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { DashboardPeriod } from "@/data/mock-dashboard-data";
import { cn } from "@/lib/utils";

export interface PeriodSelectorProps {
  selectedPeriod: DashboardPeriod;
  onSelectPeriod: (period: DashboardPeriod) => void;
}

export function PeriodSelector({
  selectedPeriod,
  onSelectPeriod,
}: PeriodSelectorProps) {
  const periods: { id: DashboardPeriod; label: string }[] = [
    { id: "7d", label: "Last 7 Days" },
    { id: "30d", label: "Last 30 Days" },
    { id: "quarter", label: "This Quarter (Q4)" },
    { id: "year", label: "This Fiscal Year" },
  ];

  return (
    <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 shadow-2xs">
      <div className="hidden sm:flex items-center pl-2 pr-1 text-slate-400">
        <Calendar className="w-3.5 h-3.5" />
      </div>
      {periods.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelectPeriod(p.id)}
          className={cn(
            "px-2.5 py-1 text-xs font-medium rounded-lg transition-all",
            selectedPeriod === p.id
              ? "bg-white text-indigo-700 font-semibold shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
