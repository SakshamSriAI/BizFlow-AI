"use client";

import * as React from "react";
import {
  CreditCard,
  Search,
  Filter,
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Calendar,
  CheckCircle2,
  DollarSign,
  FileText,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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
import { getStoredIncome, getStoredExpenses } from "@/lib/finance-store";
import { IncomeRecord, ExpenseRecord } from "@/types/finance";
import { sumMoney, subtractMoney } from "@/lib/money";

interface UnifiedTransaction {
  id: string;
  type: "income" | "expense";
  title: string;
  counterparty: string;
  categoryOrSource: string;
  date: string;
  method: string;
  amount: number;
  reference?: string;
}

export default function TransactionsLedgerPage() {
  const [transactions, setTransactions] = React.useState<UnifiedTransaction[]>([]);
  const [filterType, setFilterType] = React.useState<"all" | "income" | "expense">("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const income = getStoredIncome();
    const expenses = getStoredExpenses();

    const unifiedIncome: UnifiedTransaction[] = income.map((i) => ({
      id: i.id,
      type: "income",
      title: i.incomeSource,
      counterparty: i.customer,
      categoryOrSource: i.incomeSource,
      date: i.date,
      method: i.paymentMethod,
      amount: i.amount,
      reference: i.relatedInvoice,
    }));

    const unifiedExpenses: UnifiedTransaction[] = expenses.map((e) => ({
      id: e.id,
      type: "expense",
      title: e.expenseName,
      counterparty: e.expenseName,
      categoryOrSource: e.category,
      date: e.date,
      method: e.paymentMethod,
      amount: e.amount,
      reference: e.receiptAttachment,
    }));

    const combined = [...unifiedIncome, ...unifiedExpenses].sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    setTransactions(combined);
  }, []);

  const filtered = transactions.filter((tx) => {
    const matchesType = filterType === "all" ? true : tx.type === filterType;
    const matchesSearch =
      tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.categoryOrSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tx.reference && tx.reference.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const totalInflows = sumMoney(
    transactions.filter((t) => t.type === "income").map((t) => t.amount)
  );
  const totalOutflows = sumMoney(
    transactions.filter((t) => t.type === "expense").map((t) => t.amount)
  );
  const netLedger = subtractMoney(totalInflows, totalOutflows);

  const handleExportCSV = () => {
    const header = "ID,Type,Title,Counterparty,Category,Date,Method,Amount,Reference\n";
    const rows = filtered
      .map(
        (t) =>
          `"${t.id}","${t.type}","${t.title}","${t.counterparty}","${t.categoryOrSource}","${t.date}","${t.method}",${t.amount},"${t.reference || ""}"`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `nexora-transactions-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <PageHeader
        title="Unified Transaction Ledger"
        description="Comprehensive audit-ready record of all financial inflows and outflows with non-floating-point calculations."
        breadcrumbs={[
          { label: "Nexora", href: "/app" },
          { label: "Finance", href: "/finance/overview" },
          { label: "Transactions" },
        ]}
        badge={
          <Badge variant="indigo" size="sm">
            {transactions.length} Total Events
          </Badge>
        }
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-4 h-4 text-slate-500" />}
          >
            Export CSV Ledger
          </Button>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Total Inflows (+)
          </span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1 font-mono">
            +₹{totalInflows.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-0.5 block">
            {transactions.filter((t) => t.type === "income").length} client credits
          </span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Total Outflows (-)
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            -₹{totalOutflows.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-0.5 block">
            {transactions.filter((t) => t.type === "expense").length} expenses & payroll
          </span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Net Ledger Cash Flow
          </span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1 font-mono">
            ₹{netLedger.toLocaleString()}
          </div>
          <span className="text-xs text-emerald-600 font-medium mt-0.5 block">
            Positive retained reserves
          </span>
        </Card>
      </div>

      {/* Search & Inflow/Outflow Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Search by memo, vendor, reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-3.5 h-3.5" />}
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 self-stretch sm:self-auto">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                filterType === "all"
                  ? "bg-white text-indigo-700 font-semibold shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Events ({transactions.length})
            </button>
            <button
              onClick={() => setFilterType("income")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                filterType === "income"
                  ? "bg-white text-emerald-700 font-semibold shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Inflows Only
            </button>
            <button
              onClick={() => setFilterType("expense")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                filterType === "expense"
                  ? "bg-white text-slate-900 font-semibold shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Outflows Only
            </button>
          </div>
        </div>
      </Card>

      {/* Unified Transactions Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Transaction Title</TableHead>
              <TableHead>Counterparty / Source</TableHead>
              <TableHead>Category / Classification</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-400">
                  No transactions match the current query.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <Badge
                      variant={tx.type === "income" ? "success" : "secondary"}
                      size="sm"
                      dot
                    >
                      {tx.type === "income" ? "Inflow" : "Outflow"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="font-bold text-slate-900 text-xs">
                      {tx.title}
                    </div>
                    {tx.reference && (
                      <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                        Ref: {tx.reference}
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="text-xs text-slate-700 font-medium">
                    {tx.counterparty}
                  </TableCell>

                  <TableCell className="text-xs text-slate-600">
                    {tx.categoryOrSource}
                  </TableCell>

                  <TableCell className="text-xs text-slate-500">
                    {tx.date}
                  </TableCell>

                  <TableCell className="text-xs text-slate-500 font-medium">
                    {tx.method}
                  </TableCell>

                  <TableCell
                    className={`text-right font-mono font-bold text-sm ${
                      tx.type === "income" ? "text-emerald-600" : "text-slate-900"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
