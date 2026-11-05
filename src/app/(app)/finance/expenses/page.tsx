"use client";

import * as React from "react";
import {
  ArrowUpRight,
  Plus,
  Search,
  Filter,
  CreditCard,
  Calendar,
  FileCheck,
  Paperclip,
  Tag,
  Edit,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Eye,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ExpenseModal } from "@/components/finance/expense-modal";
import {
  getStoredExpenses,
  getStoredCategories,
  addExpenseRecord,
  updateExpenseRecord,
  deleteExpenseRecord,
} from "@/lib/finance-store";
import { ExpenseRecord, ExpenseCategory } from "@/types/finance";
import { sumMoney } from "@/lib/money";

export default function ExpensesLedgerPage() {
  const [expenseList, setExpenseList] = React.useState<ExpenseRecord[]>([]);
  const [categories, setCategories] = React.useState<ExpenseCategory[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingRecord, setEditingRecord] = React.useState<ExpenseRecord | null>(null);
  const [viewingReceipt, setViewingReceipt] = React.useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const refreshData = () => {
    setExpenseList(getStoredExpenses());
    setCategories(getStoredCategories());
  };

  React.useEffect(() => {
    refreshData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateOrUpdate = (data: any) => {
    if (editingRecord) {
      const updated = updateExpenseRecord(editingRecord.id, data);
      setExpenseList(updated);
      showToast("Expense entry updated successfully.");
    } else {
      addExpenseRecord(data);
      refreshData();
      showToast(`Expense of ₹${data.amount.toLocaleString()} recorded.`);
    }
    setEditingRecord(null);
  };

  const handleDelete = (id: string) => {
    const updated = deleteExpenseRecord(id);
    refreshData();
    setDeleteConfirmId(null);
    showToast("Expense entry removed.");
  };

  const filteredExpenses = expenseList.filter((item) => {
    const matchesSearch =
      item.expenseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ? true : item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalExpenseAmount = sumMoney(expenseList.map((e) => e.amount));
  const receiptsAttachedCount = expenseList.filter((e) => e.receiptAttachment).length;
  const attachedPercent = expenseList.length
    ? Math.round((receiptsAttachedCount / expenseList.length) * 100)
    : 0;

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
        title="Expenses & Outflows Ledger"
        description="Monitor company operating costs, tax-deductible purchases, software subscriptions, and contractor payouts."
        breadcrumbs={[
          { label: "Nexora", href: "/app" },
          { label: "Finance", href: "/finance/overview" },
          { label: "Expenses" },
        ]}
        badge={
          <Badge variant="secondary" dot size="sm">
            {expenseList.length} Expense Entries
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
            Record New Expense
          </Button>
        }
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Total Operational Outflow
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            ₹{totalExpenseAmount.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-0.5 block">
            Across {expenseList.length} verified vouchers
          </span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Receipt Verification Rate
          </span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1 font-mono">
            {attachedPercent}%
          </div>
          <span className="text-xs text-emerald-600 font-medium mt-0.5 block">
            {receiptsAttachedCount} of {expenseList.length} have tax receipts
          </span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Active Spending Categories
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            {categories.length} Categories
          </div>
          <span className="text-xs text-slate-400 font-medium mt-0.5 block">
            Budget monitored & controlled
          </span>
        </Card>
      </div>

      {/* Search and Category Filter */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Search by vendor, expense name, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-3.5 h-3.5" />}
            />
          </div>

          <div className="w-full sm:w-60">
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={[
                { value: "all", label: "All Spending Categories" },
                ...categories.map((c) => ({ value: c.name, label: c.name })),
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Expenses Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Expense & Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Receipt</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-400">
                  No expenses match the current filter criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredExpenses.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell>
                    <div className="font-bold text-slate-900 text-xs">
                      {exp.expenseName}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate max-w-sm mt-0.5">
                      {exp.description}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary" size="sm">
                      {exp.category}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-xs text-slate-500">
                    {exp.date}
                  </TableCell>

                  <TableCell className="text-xs text-slate-600">
                    {exp.paymentMethod}
                  </TableCell>

                  <TableCell>
                    {exp.receiptAttachment ? (
                      <button
                        onClick={() => setViewingReceipt(exp.receiptAttachment || null)}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded transition-colors"
                      >
                        <FileCheck className="w-3 h-3 text-indigo-600" />
                        <span className="truncate max-w-[90px]">
                          {exp.receiptAttachment}
                        </span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">No receipt</span>
                    )}
                  </TableCell>

                  <TableCell className="text-right font-mono font-bold text-slate-900 text-sm">
                    -₹{exp.amount.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-right">
                    {deleteConfirmId === exp.id ? (
                      <div className="flex items-center justify-end gap-1.5 animate-fade-in">
                        <button
                          onClick={() => handleDelete(exp.id)}
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
                            setEditingRecord(exp);
                            setIsModalOpen(true);
                          }}
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5 text-slate-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirmId(exp.id)}
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
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRecord(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialExpense={editingRecord}
      />

      {/* Receipt Viewer Preview Modal */}
      <Modal
        isOpen={!!viewingReceipt}
        onClose={() => setViewingReceipt(null)}
        title="Expense Receipt Document"
        description={`Attached voucher: ${viewingReceipt}`}
        footer={
          <Button variant="primary" size="sm" onClick={() => setViewingReceipt(null)}>
            Close Viewer
          </Button>
        }
      >
        <div className="py-6 flex flex-col items-center justify-center text-center space-y-3 bg-slate-50 rounded-xl border border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">{viewingReceipt}</div>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              Verified digital voucher archived in your workspace tax folder.
            </p>
          </div>
          <Badge variant="success" size="sm" dot>
            Audit Tax Ready
          </Badge>
        </div>
      </Modal>
    </div>
  );
}
