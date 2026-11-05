"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RevenueExpensePoint } from "@/data/mock-dashboard-data";
import { BarChart3, LineChart } from "lucide-react";

export interface RevenueExpenseChartProps {
  data: RevenueExpensePoint[];
  currencySymbol?: string;
}

export function RevenueExpenseChart({
  data,
  currencySymbol = "₹",
}: RevenueExpenseChartProps) {
  const [chartType, setChartType] = React.useState<"bar" | "area">("bar");
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatYAxis = (val: number) => {
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `${currencySymbol}${(val / 1000).toFixed(0)}k`;
    return `${currencySymbol}${val}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xl text-xs space-y-1.5 z-50">
          <div className="font-semibold text-slate-800 pb-1 border-b border-slate-100">
            {label}
          </div>
          {payload.map((item: any, i: number) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}:
              </span>
              <span className="font-bold text-slate-900 font-mono">
                {currencySymbol}
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">
              Revenue vs. Expenses
            </h3>
            <Badge variant="indigo" size="sm">
              Cash Flow
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare incoming receipts against operational expenses and net profit.
          </p>
        </div>

        {/* Chart View Toggle */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/60 self-start sm:self-auto">
          <button
            onClick={() => setChartType("bar")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              chartType === "bar"
                ? "bg-white text-indigo-700 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Bars</span>
          </button>
          <button
            onClick={() => setChartType("area")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              chartType === "area"
                ? "bg-white text-indigo-700 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
            <span>Area</span>
          </button>
        </div>
      </div>

      <div className="pt-4 h-72 w-full">
        {!isMounted ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400">
            Rendering analytics...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="period"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
                  iconType="circle"
                  iconSize={7}
                />
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="#4f46e5"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                />
                <Bar
                  dataKey="expenses"
                  name="Expenses"
                  fill="#94a3b8"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                />
              </BarChart>
            ) : (
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="period"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
                  iconType="circle"
                  iconSize={7}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorExp)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
