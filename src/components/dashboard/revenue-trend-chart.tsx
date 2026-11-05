"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RevenueGrowthPoint } from "@/data/mock-dashboard-data";
import { TrendingUp } from "lucide-react";

export interface RevenueTrendChartProps {
  data: RevenueGrowthPoint[];
  currencySymbol?: string;
}

export function RevenueTrendChart({
  data,
  currencySymbol = "₹",
}: RevenueTrendChartProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatYAxis = (val: number) => {
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(1)}L`;
    return `${currencySymbol}${val}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xl text-xs space-y-1 z-50">
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
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">
              Monthly Revenue Growth
            </h3>
            <Badge variant="success" size="sm" dot>
              +18.4%
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Breakdown of recurring retainers vs. one-time project fees.
          </p>
        </div>
      </div>

      <div className="pt-4 h-64 w-full">
        {!isMounted ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400">
            Rendering trend...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRecurring" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorProject" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="month"
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
                dataKey="recurring"
                name="Recurring Retainers"
                stroke="#4f46e5"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRecurring)"
              />
              <Area
                type="monotone"
                dataKey="project"
                name="Project Engagements"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorProject)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
