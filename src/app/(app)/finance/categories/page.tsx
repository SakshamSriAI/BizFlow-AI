"use client";

import * as React from "react";
import {
  PieChart,
  Plus,
  Tag,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Edit,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CategoryModal } from "@/components/finance/category-modal";
import {
  getStoredCategories,
  addExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
} from "@/lib/finance-store";
import { ExpenseCategory } from "@/types/finance";
import { sumMoney, subtractMoney } from "@/lib/money";

export default function ExpenseCategoriesPage() {
  const [categories, setCategories] = React.useState<ExpenseCategory[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<ExpenseCategory | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setCategories(getStoredCategories());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateOrUpdate = (data: any) => {
    if (editingCategory) {
      const updated = updateExpenseCategory(editingCategory.id, data);
      setCategories(updated);
      showToast(`Category "${data.name}" updated.`);
    } else {
      addExpenseCategory(data);
      setCategories(getStoredCategories());
      showToast(`Category "${data.name}" created.`);
    }
    setEditingCategory(null);
  };

  const handleDelete = (id: string) => {
    const updated = deleteExpenseCategory(id);
    setCategories(updated);
    setDeleteConfirmId(null);
    showToast("Category removed.");
  };

  const totalAllocated = sumMoney(categories.map((c) => c.allocatedBudget));
  const totalSpent = sumMoney(categories.map((c) => c.spentAmount));
  const overallUsedPercent = totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0;

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
        title="Expense Categories & Budgets"
        description="Allocate monthly spending ceilings by operational department and track budget utilization."
        breadcrumbs={[
          { label: "Nexora", href: "/app" },
          { label: "Finance", href: "/finance/overview" },
          { label: "Categories" },
        ]}
        badge={
          <Badge variant="indigo" size="sm">
            {categories.length} Categories
          </Badge>
        }
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setEditingCategory(null);
              setIsModalOpen(true);
            }}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create Category
          </Button>
        }
      />

      {/* Budget Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Total Allocated Budget
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            ₹{totalAllocated.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-0.5 block">
            Across {categories.length} departments
          </span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Month-to-Date Utilized
          </span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1 font-mono">
            ₹{totalSpent.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-0.5 block">
            {overallUsedPercent}% of monthly ceiling
          </span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Remaining Budget Headroom
          </span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1 font-mono">
            ₹{subtractMoney(totalAllocated, totalSpent).toLocaleString()}
          </div>
          <span className="text-xs text-emerald-600 font-medium mt-0.5 block">
            Available before month-end
          </span>
        </Card>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const percent =
            cat.allocatedBudget > 0
              ? Math.round((cat.spentAmount / cat.allocatedBudget) * 100)
              : 0;
          const isWarning = percent >= 85;
          const isOver = percent > 100;

          return (
            <Card
              key={cat.id}
              className="p-5 flex flex-col justify-between hover:shadow-xs transition-all space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: cat.color }}
                    />
                    <h3 className="font-bold text-slate-900 text-sm">
                      {cat.name}
                    </h3>
                  </div>

                  {isOver ? (
                    <Badge variant="danger" size="sm" dot>
                      Over Budget
                    </Badge>
                  ) : isWarning ? (
                    <Badge variant="warning" size="sm" dot>
                      Near Limit
                    </Badge>
                  ) : (
                    <Badge variant="success" size="sm" dot>
                      On Track
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-slate-500 mt-2 min-h-[32px] leading-relaxed">
                  {cat.description || "Operational departmental spending."}
                </p>

                {/* Spent vs Budget */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Spent
                    </span>
                    <span className="font-mono text-base font-bold text-slate-900">
                      ₹{cat.spentAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Budget Limit
                    </span>
                    <span className="font-mono text-xs text-slate-500 font-medium">
                      ₹{cat.allocatedBudget.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>{percent}% utilized</span>
                    <span>
                      ₹{Math.max(0, subtractMoney(cat.allocatedBudget, cat.spentAmount)).toLocaleString()} left
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isOver ? "bg-rose-500" : isWarning ? "bg-amber-500" : ""
                      }`}
                      style={{
                        width: `${Math.min(percent, 100)}%`,
                        backgroundColor: !isOver && !isWarning ? cat.color : undefined,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                {deleteConfirmId === cat.id ? (
                  <div className="flex items-center justify-between w-full text-xs">
                    <span className="text-rose-600 font-medium">Delete?</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-[11px] bg-rose-600 text-white px-2 py-0.5 rounded font-medium"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="text-[11px] text-slate-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteConfirmId(cat.id)}
                      className="text-slate-400 hover:text-rose-600 h-7 px-2 text-xs"
                    >
                      Delete
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingCategory(cat);
                        setIsModalOpen(true);
                      }}
                      className="text-indigo-600 h-7 px-2 text-xs font-semibold"
                    >
                      Edit Budget
                    </Button>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialCategory={editingCategory}
      />
    </div>
  );
}
