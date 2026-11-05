"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#17212B]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-[#667482] pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "w-full rounded-lg border border-[#E3E9EF] bg-white px-3 py-2 text-sm text-[#17212B] placeholder:text-[#667482]/60 shadow-2xs transition-colors",
              "focus-visible:outline-none focus-visible:border-[#2F80ED] focus-visible:ring-2 focus-visible:ring-[#2F80ED]/15",
              "disabled:cursor-not-allowed disabled:bg-[#F7F9FB] disabled:text-[#667482]",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              error && "border-rose-400 focus-visible:border-rose-500 focus-visible:ring-rose-100",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-[#667482] flex items-center justify-center">
              {rightIcon}
            </div>
          )}
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

Input.displayName = "Input";

export { Input };
