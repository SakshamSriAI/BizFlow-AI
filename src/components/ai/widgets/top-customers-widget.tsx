"use client";

import React from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/money";
import { Users, ArrowRight, ShieldCheck } from "lucide-react";

interface TopCustomer {
  name: string;
  contact: string;
  ltvCents: number;
  mrrCents: number;
  healthScore: number;
  tier: string;
}

interface TopCustomersWidgetProps {
  data: {
    customers: TopCustomer[];
  };
}

export function TopCustomersWidget({ data }: TopCustomersWidgetProps) {
  if (!data?.customers) return null;

  return (
    <div className="my-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3.5 max-w-xl">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
          <Users className="w-4 h-4 text-blue-600" />
          <span>Top Enterprise Customer Accounts</span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          Ranked by Lifetime Value
        </span>
      </div>

      <div className="space-y-2">
        {data.customers.map((c, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs"
          >
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                {idx + 1}
              </span>
              <div>
                <span className="font-bold text-slate-900 block">{c.name}</span>
                <span className="text-[11px] text-slate-500">{c.contact} • {c.tier}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-bold text-slate-900 font-mono block">
                {formatMoney(c.ltvCents, "INR")}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">
                {formatMoney(c.mrrCents, "INR")}/mo MRR
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1 flex justify-between items-center text-[11px] text-slate-500">
        <span>Engagement scores updated weekly</span>
        <Link
          href="/sales/customers"
          className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5"
        >
          Customer Directory <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
