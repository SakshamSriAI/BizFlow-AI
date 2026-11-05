"use client";

import * as React from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  CreditCard,
  AlertCircle,
  Users,
  Target,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KPIData } from "@/data/mock-dashboard-data";
import { cn } from "@/lib/utils";

export interface KPISummaryCardsProps {
  revenue: KPIData;
  expenses: KPIData;
  outstanding: KPIData;
  leads: KPIData;
}

export function KPISummaryCards({
  revenue,
  expenses,
  outstanding,
  leads,
}: KPISummaryCardsProps) {
  const cards = [
    {
      data: revenue,
      icon: TrendingUp,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      accentBorder: "hover:border-emerald-200",
      pillVariant: "success" as const,
    },
    {
      data: expenses,
      icon: CreditCard,
      iconBg: "bg-slate-100 text-slate-700 border-slate-200",
      accentBorder: "hover:border-slate-300",
      pillVariant: expenses.isPositive ? ("success" as const) : ("danger" as const),
    },
    {
      data: outstanding,
      icon: AlertCircle,
      iconBg: "bg-amber-50 text-amber-600 border-amber-100",
      accentBorder: "hover:border-amber-200",
      pillVariant: "warning" as const,
    },
    {
      data: leads,
      icon: Target,
      iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
      accentBorder: "hover:border-indigo-200",
      pillVariant: "indigo" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((item, idx) => {
        const { data } = item;
        const Icon = item.icon;

        return (
          <Card
            key={idx}
            className={cn(
              "p-5 transition-all duration-200 hover:shadow-md",
              item.accentBorder
            )}
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {data.label}
              </span>
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center border shadow-2xs",
                  item.iconBg
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {data.formattedValue}
              </div>

              <div className="mt-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 font-semibold">
                  <Badge variant={item.pillVariant} size="sm" className="gap-0.5">
                    {data.changePercent >= 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    <span>
                      {data.changePercent > 0 ? `+${data.changePercent}%` : `${data.changePercent}%`}
                    </span>
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {data.comparedTo}
                  </span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium flex items-center justify-between">
                <span>{data.subtext}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
