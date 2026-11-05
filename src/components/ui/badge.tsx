import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "indigo" | "teal" | "accent" | "dark";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#F0F4F8] text-[#17212B] border-[#E3E9EF]",
    secondary: "bg-[#F7F9FB] text-[#667482] border-[#E3E9EF]",
    indigo: "bg-[#EBF3FC] text-[#2F80ED] border-[#C4DEFA]",
    accent: "bg-[#EBF3FC] text-[#2F80ED] border-[#C4DEFA]",
    teal: "bg-[#E8F8F6] text-[#138A7B] border-[#BCEEE7]",
    success: "bg-[#E8F8F6] text-[#138A7B] border-[#BCEEE7]",
    warning: "bg-[#FEF9EE] text-[#B45309] border-[#FDE68A]",
    danger: "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
    dark: "bg-[#17232D] text-[#F7F9FB] border-[#2A3B4C]",
    outline: "border-[#E3E9EF] text-[#667482] bg-transparent",
  };

  const dotColorStyles = {
    default: "bg-[#667482]",
    secondary: "bg-[#667482]",
    indigo: "bg-[#2F80ED]",
    accent: "bg-[#2F80ED]",
    teal: "bg-[#20B8A5]",
    success: "bg-[#20B8A5]",
    warning: "bg-[#F59E0B]",
    danger: "bg-[#EF4444]",
    dark: "bg-[#20B8A5]",
    outline: "bg-[#667482]",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border transition-colors leading-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColorStyles[variant])}
        />
      )}
      {children}
    </div>
  );
}
