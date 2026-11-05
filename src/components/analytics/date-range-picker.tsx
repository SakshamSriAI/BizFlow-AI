"use client";

import React from "react";
import { DateRangeOption } from "@/types/analytics";
import { Calendar } from "lucide-react";

interface DateRangePickerProps {
  selectedRange: DateRangeOption;
  onChangeRange: (range: DateRangeOption) => void;
}

export function DateRangePicker({
  selectedRange,
  onChangeRange,
}: DateRangePickerProps) {
  const options: { id: DateRangeOption; label: string }[] = [
    { id: "7d", label: "Last 7 Days" },
    { id: "30d", label: "Last 30 Days" },
    { id: "quarter", label: "This Quarter" },
    { id: "year", label: "This Year" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
      <div className="px-2 py-1 flex items-center gap-1 text-[11px] font-semibold text-slate-500">
        <Calendar className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Period:</span>
      </div>
      {options.map((opt) => {
        const isActive = selectedRange === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChangeRange(opt.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              isActive
                ? "bg-white text-slate-900 shadow-2xs border border-slate-200/70"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
