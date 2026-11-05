"use client";

import * as React from "react";
import {
  ArrowDownLeft,
  Plus,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Building2,
  Calendar,
  FileText,
  CreditCard,
  Edit,
  Trash2,
  CheckCircle2,
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
import { IncomeModal } from "@/components/finance/income-modal";
import {
  getStoredIncome,
  addIncomeRecord,
  updateIncomeRecord,
  deleteIncomeRecord,
} from "@/lib/finance-store";
import { IncomeRecord } from "@/types/finance";
import { sumMoney } from "@/lib/money";

export default function IncomeLedgerPage() {
  const [incomeList, setIncomeList] = React.useState<IncomeRecord[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sourceFilter, setSourceFilter] = React.useState<string>("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingRecord, setEditingRecord] = React.useState<IncomeRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setIncomeList(getStoredIncome());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateOrUpdate = (data: any) => {
    if (editingRecord) {
      const updated = updateIncomeRecord(editingRecord.id, data);
      setIncomeList(updated);
      showToast("Income record updated successfully.");
    } else {
      addIncomeRecord(data);
      setIncomeList(getStoredIncome());
      showToast(`Income of ₹${data.amount.toLocaleString()} recorded.`);
    }
    setEditingRecord(null);
  };

  const handleDelete = (id: string) => {
    const updated = deleteIncomeRecord(id);
    setIncomeList(updated);
    setDeleteConfirmId(null);
    showToast("Income record deleted.");
  };

  const filteredIncome = incomeList.filter((item) => {
    const matchesSearch =
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.incomeSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.relatedInvoice && item.relatedInvoice.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSource =
      sourceFilter === "all" ? true : item.incomeSource === sourceFilter;
    return matchesSearch && matchesSource;
  });

  const totalIncome = sumMoney(incomeList.map((i) => i.amount));
  const retainerIncome = sumMoney(
    incomeList
      .filter((i) => i.incomeSource.toLowerCase().includes("retainer"))
      .map((i) => i.amount)
  );
  const avgIncome = incomeList.length ? Math.round(totalIncome / incomeList.length) : 0;

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
        title="Income & Inflows Ledger"
        description="Track all customer payments, recurring service retainers, and milestone settlements."
        breadcrumbs={[
          { label: "Nexora", href: "/app" },
          { label: "Finance", href: "/finance/overview" },
          { label: "Income" },
        ]}
        badge={
          <Badge variant="success" dot size="sm">
            {incomeList.length} Income Receipts
          </Badge>
        }
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setEditingRecord(null);
              setIsModalOpen(true);
            }}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Record Income Entry
          </Button>
        }
      />

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Total Inflow Recorded
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            ₹{totalIncome.toLocaleString()}
          </div>
          <span className="text-xs text-emerald-600 font-medium mt-0.5 block">
            Across {incomeList.length} client payments
          </span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Recurring Retainer Income
          </span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1 font-mono">
            ₹{retainerIncome.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-0.5 block">
            {( (retainerIncome / totalIncome) * 100 || 0 ).toFixed(0)}% of total receipts
          </span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Average Payment Value
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            ₹{avgIncome.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-0.5 block">
            Per transaction settlement
          </span>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Search by customer, invoice #, or source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-3.5 h-3.5" />}
            />
          </div>

          <div className="w-full sm:w-48">
            <Select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              options={[
                { value: "all", label: "All Income Sources" },
                { value: "Monthly Retainer", label: "Monthly Retainer" },
                { value: "Project Milestone", label: "Project Milestone" },
                { value: "Advisory Consultation", label: "Advisory Consultation" },
                { value: "Strategy Workshop", label: "Strategy Workshop" },
                { value: "Website Retainer", label: "Website Retainer" },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Income Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Income Stream</TableHead>
              <TableHead>Client / Entity</TableHead>
              <TableHead>Settlement Date</TableHead>
              <TableHead>Invoice #</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIncome.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-400">
                  No income entries found matching the filter criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredIncome.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-bold text-slate-900 text-xs">
                      {item.incomeSource}
                    </div>
                    {item.notes && (
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">
                        {item.notes}
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="font-medium text-slate-800 text-xs">
                    {item.customer}
                  </TableCell>

                  <TableCell className="text-xs text-slate-500">
                    {item.date}
                  </TableCell>

                  <TableCell className="font-mono text-xs font-semibold text-indigo-600">
                    {item.relatedInvoice || "—"}
                  </TableCell>

                  <TableCell className="text-xs text-slate-600">
                    {item.paymentMethod}
                  </TableCell>

                  <TableCell className="text-right font-mono font-bold text-emerald-600 text-sm">
                    +₹{item.amount.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-right">
                    {deleteConfirmId === item.id ? (
                      <div className="flex items-center justify-end gap-1.5 animate-fade-in">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-[11px] bg-rose-600 text-white px-2 py-0.5 rounded font-medium hover:bg-rose-700"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="text-[11px] text-slate-400 hover:text-slate-600 px-1"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingRecord(item);
                            setIsModalOpen(true);
                          }}
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5 text-slate-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirmId(item.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Modal */}
      <IncomeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRecord(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialIncome={editingRecord}
      />
    </div>
  );
}
