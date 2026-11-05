"use client";

import React, { useState } from "react";
import { AnalyticsSummary } from "@/types/analytics";
import { formatMoney } from "@/lib/money";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { CreditCard, AlertCircle, PieChart as PieIcon, ShieldCheck } from "lucide-react";

interface ExpenseReportViewProps {
  data: AnalyticsSummary;
}

export function ExpenseReportView({ data }: ExpenseReportViewProps) {
  const pieData = data.categoryBreakdown.map((cat) => ({
    name: cat.category,
    value: cat.amountCents / 100,
    color: cat.color,
  }));

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Total Disbursements
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {formatMoney(data.totalExpensesCents, "INR")}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            {data.expensesComparison.subtext}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Monthly Operational Burn
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            ₹2,15,400
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Controlled baseline expenditure
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Overall Budget Utilization
          </span>
          <div className="text-2xl font-bold text-blue-600 font-mono">
            91.2%
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            ₹20,600 unallocated buffer
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Payroll & Contractors
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            51.0%
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Primary capital allocation
          </span>
        </div>
      </div>

      {/* Chart: Expense Breakdown Donut & Legend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Departmental Expenditure Distribution
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown of operating costs across organizational functional areas
            </p>
          </div>

          <div className="h-64 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [
                    `₹${Number(val).toLocaleString()}`,
                    "Spent Amount",
                  ]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Budget caps monitored autonomously by Finance Agent</span>
          </div>
        </div>

        {/* Categories Detail Table */}
        <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-6 space-y-3">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Category Breakdown Matrix
          </span>

          <div className="space-y-3">
            {data.categoryBreakdown.map((cat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5"
              >
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-bold text-slate-900">
                      {cat.category}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono">
                    {formatMoney(cat.amountCents, "INR")}
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${cat.percentage * 1.5}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Share of total: {cat.percentage}%</span>
                  <span className="text-emerald-600 font-medium">Within budget limit</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
