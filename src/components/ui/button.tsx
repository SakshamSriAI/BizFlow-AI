"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "dark";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none text-sm";

    const variantStyles = {
      primary: "bg-[#2F80ED] text-white hover:bg-[#1E65D0] shadow-xs active:bg-[#174FA7]",
      secondary: "bg-[#F0F4F8] text-[#17212B] hover:bg-[#E3E9EF] active:bg-[#D4DDE5]",
      outline:
        "border border-[#E3E9EF] bg-white text-[#17212B] hover:bg-[#F7F9FB] hover:text-[#101820] shadow-2xs active:bg-[#F0F4F8]",
      ghost: "text-[#667482] hover:bg-[#F0F4F8] hover:text-[#17212B] active:bg-[#E3E9EF]",
      destructive: "bg-destructive text-white hover:bg-red-600 shadow-xs active:bg-red-700",
      link: "text-[#2F80ED] underline-offset-4 hover:underline p-0 h-auto font-normal",
      dark: "bg-[#101820] text-[#F7F9FB] hover:bg-[#17232D] shadow-xs border border-[#17232D] active:bg-black",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 text-sm gap-2",
      lg: "h-11 px-6 text-base gap-2.5",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
