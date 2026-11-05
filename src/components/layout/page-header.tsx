"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  badge,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 pb-6 md:flex-row md:items-center md:justify-between border-b border-[#E3E9EF]/60 mb-6",
        className
      )}
    >
      <div className="space-y-1">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-1.5 text-xs text-[#667482] mb-1"
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <div key={idx} className="flex items-center space-x-1.5">
                  {idx > 0 && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#667482]/60 shrink-0" />
                  )}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-[#17212B] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        isLast ? "font-semibold text-[#17212B]" : "text-[#667482]"
                      )}
                    >
                      {crumb.label}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#17212B]">
            {title}
          </h1>
          {badge}
        </div>

        {description && (
          <p className="text-xs sm:text-sm text-[#667482] max-w-2xl font-normal">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
