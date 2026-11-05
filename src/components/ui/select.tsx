"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, id, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold text-[#17212B]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full appearance-none rounded-lg border border-[#E3E9EF] bg-white px-3 py-2 pr-9 text-sm text-[#17212B] shadow-2xs transition-colors cursor-pointer",
              "focus-visible:outline-none focus-visible:border-[#2F80ED] focus-visible:ring-2 focus-visible:ring-[#2F80ED]/15",
              "disabled:cursor-not-allowed disabled:bg-[#F7F9FB] disabled:text-[#667482]",
              error && "border-rose-400 focus-visible:border-rose-500 focus-visible:ring-rose-100",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667482] pointer-events-none" />
        </div>
        {error ? (
          <p className="text-xs text-rose-500 font-medium">{error}</p>
        ) : hint ? (
          <p className="text-xs text-[#667482]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
