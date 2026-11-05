"use client";

import * as React from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  ArrowDownLeft,
  ArrowUpRight,
  DollarSign,
  CreditCard,
  PieChart,
  Plus,
  Calendar,
  CheckCircle2,
  FileText,
  AlertCircle,
  Tag,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from "recharts";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { IncomeModal } from "@/components/finance/income-modal";
import { ExpenseModal } from "@/components/finance/expense-modal";
import {
  getStoredIncome,
  getStoredExpenses,
  getStoredCategories,
  calculateFinanceMetrics,
  addIncomeRecord,
  addExpenseRecord,
} from "@/lib/finance-store";
import { IncomeRecord, ExpenseRecord, ExpenseCategory, FinancialMetricSummary } from "@/types/finance";
import { getActiveWorkspace } from "@/lib/auth-store";

export default function FinancialOverviewPage() {
  const [metrics, setMetrics] = React.useState<FinancialMetricSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    netCashFlow: 0,
    profitMarginPercent: 0,
    activeRetainersIncome: 0,
    oneTimeProjectsIncome: 0,
  });
  const [incomeList, setIncomeList] = React.useState<IncomeRecord[]>([]);
  const [expenseList, setExpenseList] = React.useState<ExpenseRecord[]>([]);
  const [categories, setCategories] = React.useState<ExpenseCategory[]>([]);
  const [isMounted, setIsMounted] = React.useState(false);

  // Modals
  const [isIncomeModalOpen, setIsIncomeModalOpen] = React.useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const refreshData = () => {
    setMetrics(calculateFinanceMetrics());
    setIncomeList(getStoredIncome());
    setExpenseList(getStoredExpenses());
    setCategories(getStoredCategories());
  };

  React.useEffect(() => {
    setIsMounted(true);
    refreshData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddIncome = (data: any) => {
    addIncomeRecord(data);
    refreshData();
    showToast(`Income of ₹${data.amount.toLocaleString()} recorded.`);
  };

  const handleAddExpense = (data: any) => {
    addExpenseRecord(data);
    refreshData();
    showToast(`Expense of ₹${data.amount.toLocaleString()} recorded.`);
  };

  // Monthly Comparison Chart Data
  const monthlyComparisonData = [
    { month: "Aug", income: 340000, expenses: 110000, margin: 230000 },
    { month: "Sep", income: 390000, expenses: 125000, margin: 265000 },
    { month: "Oct", income: 420000, expenses: 138000, margin: 282000 },
    { month: "Nov (Current)", income: metrics.totalIncome, expenses: metrics.totalExpenses, margin: metrics.netCashFlow },
  ];

  // Category Pie Data
  const categoryPieData = categories.map((cat) => ({
    name: cat.name,
    value: cat.spentAmount,
    color: cat.color,
  }));

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-medium animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Financial Health & Cash Flow"
        description="Comprehensive double-entry cash flow management, income sources, operational expenses, and profit margins."
        breadcrumbs={[
          { label: "Nexora", href: "/app" },
          { label: "Finance", href: "/finance/overview" },
          { label: "Financial Overview" },
        ]}
        badge={
          <Badge variant="success" dot size="sm">
            Audited Ledger
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpenseModalOpen(true)}
              leftIcon={<ArrowUpRight className="w-3.5 h-3.5 text-rose-500" />}
            >
              Record Expense
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsIncomeModalOpen(true)}
              leftIcon={<ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />}
            >
              Record Income
            </Button>
          </div>
        }
      />

      {/* TOP 4 KPI CARDS (Calculated using exact integer cents math) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 hover:border-emerald-200 transition-all hover:shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Inflows / Income
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              ₹{metrics.totalIncome.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-emerald-600">
                ₹{metrics.activeRetainersIncome.toLocaleString()}
              </span>
              <span>from recurring retainers</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 hover:border-slate-300 transition-all hover:shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Outflows / Expenses
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              ₹{metrics.totalExpenses.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <span>Controlled operational spending</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 hover:border-indigo-200 transition-all hover:shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Net Cash Surplus
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono">
              ₹{metrics.netCashFlow.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <span>Retained net cash after all bills</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 hover:border-emerald-200 transition-all hover:shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Net Profit Margin
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <span className="text-xs font-bold">%</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {metrics.profitMarginPercent}%
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <span className="text-emerald-600 font-semibold">Healthy</span>
              <span>for service business</span>
            </div>
          </div>
        </Card>
      </div>

      {/* CHARTS ROW: MONTHLY COMPARISON & CATEGORY BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Comparison Bar Chart (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Monthly Inflow vs. Outflow Comparison
                </h3>
                <p className="text-xs text-slate-400">
                  Historical month-over-month revenue vs. expenses comparison.
                </p>
              </div>
              <Badge variant="indigo" size="sm">
                4-Month Trend
              </Badge>
            </div>

            <div className="h-64 w-full">
              {!isMounted ? (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  Loading chart...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyComparisonData}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, ""]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
                      iconType="circle"
                      iconSize={7}
                    />
                    <Bar
                      dataKey="income"
                      name="Income (Inflows)"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={32}
                    />
                    <Bar
                      dataKey="expenses"
                      name="Expenses (Outflows)"
                      fill="#94a3b8"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={32}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>

        {/* Category Spending Breakdown (5 cols) */}
        <div className="lg:col-span-5">
          <Card className="p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Expense Spending by Category
                </h3>
                <p className="text-xs text-slate-400">
                  Where business capital is deployed this month.
                </p>
              </div>
              <Link href="/finance/categories">
                <Button variant="ghost" size="sm" className="text-xs">
                  Manage
                </Button>
              </Link>
            </div>

            <div className="space-y-3 pt-1">
              {categories.slice(0, 5).map((cat) => {
                const percent =
                  cat.allocatedBudget > 0
                    ? Math.round((cat.spentAmount / cat.allocatedBudget) * 100)
                    : 0;

                return (
                  <div key={cat.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="truncate max-w-[150px]">{cat.name}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-900 font-bold">
                          ₹{cat.spentAmount.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          / ₹{cat.allocatedBudget.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(percent, 100)}%`,
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* RECENT FINANCIAL EVENTS TABLE */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Recent Income & Expense Records
            </h3>
            <p className="text-xs text-slate-400">
              Latest transactions recorded across all business accounts.
            </p>
          </div>
          <Link href="/finance/transactions">
            <Button variant="outline" size="sm" className="text-xs">
              View Full Transaction Ledger
            </Button>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Description / Source</TableHead>
              <TableHead>Party / Counterpart</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incomeList.slice(0, 3).map((inc) => (
              <TableRow key={inc.id}>
                <TableCell>
                  <Badge variant="success" size="sm" dot>
                    Income
                  </Badge>
                </TableCell>
                <TableCell className="font-bold text-slate-900 text-xs">
                  {inc.incomeSource}
                </TableCell>
                <TableCell className="text-xs text-slate-600">
                  {inc.customer}
                </TableCell>
                <TableCell className="text-xs text-slate-400">{inc.date}</TableCell>
                <TableCell className="text-xs text-slate-500">
                  {inc.paymentMethod}
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-emerald-600 text-xs">
                  +₹{inc.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}

            {expenseList.slice(0, 3).map((exp) => (
              <TableRow key={exp.id}>
                <TableCell>
                  <Badge variant="secondary" size="sm" dot>
                    Expense
                  </Badge>
                </TableCell>
                <TableCell className="font-bold text-slate-900 text-xs">
                  {exp.expenseName}
                </TableCell>
                <TableCell className="text-xs text-slate-600">
                  {exp.category}
                </TableCell>
                <TableCell className="text-xs text-slate-400">{exp.date}</TableCell>
                <TableCell className="text-xs text-slate-500">
                  {exp.paymentMethod}
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-slate-900 text-xs">
                  -₹{exp.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Modals */}
      <IncomeModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        onSubmit={handleAddIncome}
      />

      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSubmit={handleAddExpense}
      />
    </div>
  );
}
