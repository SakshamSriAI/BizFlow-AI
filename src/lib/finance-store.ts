"use client";

import {
  IncomeRecord,
  ExpenseRecord,
  ExpenseCategory,
  FinancialMetricSummary,
} from "@/types/finance";
import {
  initialMockIncome,
  initialMockExpenses,
  initialMockExpenseCategories,
} from "@/data/mock-finance-data";
import { sumMoney, subtractMoney, multiplyMoney, toCents, fromCents } from "@/lib/money";

const STORAGE_KEY_INCOME = "nexora_finance_income";
const STORAGE_KEY_EXPENSES = "nexora_finance_expenses";
const STORAGE_KEY_CATEGORIES = "nexora_finance_categories";

export function getStoredIncome(): IncomeRecord[] {
  if (typeof window === "undefined") return initialMockIncome;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INCOME);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_INCOME, JSON.stringify(initialMockIncome));
      return initialMockIncome;
    }
    return JSON.parse(raw);
  } catch {
    return initialMockIncome;
  }
}

export function saveIncome(income: IncomeRecord[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_INCOME, JSON.stringify(income));
  }
}

export function getStoredExpenses(): ExpenseRecord[] {
  if (typeof window === "undefined") return initialMockExpenses;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EXPENSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(initialMockExpenses));
      return initialMockExpenses;
    }
    return JSON.parse(raw);
  } catch {
    return initialMockExpenses;
  }
}

export function saveExpenses(expenses: ExpenseRecord[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
  }
}

export function getStoredCategories(): ExpenseCategory[] {
  if (typeof window === "undefined") return initialMockExpenseCategories;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEY_CATEGORIES,
        JSON.stringify(initialMockExpenseCategories)
      );
      return initialMockExpenseCategories;
    }
    return JSON.parse(raw);
  } catch {
    return initialMockExpenseCategories;
  }
}

export function saveCategories(categories: ExpenseCategory[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
  }
}

// Income Operations
export function addIncomeRecord(record: Omit<IncomeRecord, "id">): IncomeRecord {
  const current = getStoredIncome();
  const created: IncomeRecord = {
    ...record,
    id: "inc-" + Date.now(),
  };
  const updated = [created, ...current];
  saveIncome(updated);
  return created;
}

export function updateIncomeRecord(
  id: string,
  updates: Partial<IncomeRecord>
): IncomeRecord[] {
  const current = getStoredIncome();
  const updated = current.map((item) => (item.id === id ? { ...item, ...updates } : item));
  saveIncome(updated);
  return updated;
}

export function deleteIncomeRecord(id: string): IncomeRecord[] {
  const current = getStoredIncome();
  const updated = current.filter((item) => item.id !== id);
  saveIncome(updated);
  return updated;
}

// Expense Operations
export function addExpenseRecord(record: Omit<ExpenseRecord, "id">): ExpenseRecord {
  const current = getStoredExpenses();
  const created: ExpenseRecord = {
    ...record,
    id: "exp-" + Date.now(),
  };
  const updated = [created, ...current];
  saveExpenses(updated);

  // Update category spentAmount using exact integer math
  const categories = getStoredCategories();
  const catUpdated = categories.map((cat) => {
    if (cat.name === record.category) {
      const newSpentCents = toCents(cat.spentAmount) + toCents(record.amount);
      return { ...cat, spentAmount: fromCents(newSpentCents) };
    }
    return cat;
  });
  saveCategories(catUpdated);

  return created;
}

export function updateExpenseRecord(
  id: string,
  updates: Partial<ExpenseRecord>
): ExpenseRecord[] {
  const current = getStoredExpenses();
  const updated = current.map((item) => (item.id === id ? { ...item, ...updates } : item));
  saveExpenses(updated);
  return updated;
}

export function deleteExpenseRecord(id: string): ExpenseRecord[] {
  const current = getStoredExpenses();
  const deletedItem = current.find((item) => item.id === id);
  const updated = current.filter((item) => item.id !== id);
  saveExpenses(updated);

  if (deletedItem) {
    const categories = getStoredCategories();
    const catUpdated = categories.map((cat) => {
      if (cat.name === deletedItem.category) {
        const newSpentCents = Math.max(0, toCents(cat.spentAmount) - toCents(deletedItem.amount));
        return { ...cat, spentAmount: fromCents(newSpentCents) };
      }
      return cat;
    });
    saveCategories(catUpdated);
  }

  return updated;
}

// Category Operations
export function addExpenseCategory(
  category: Omit<ExpenseCategory, "id" | "spentAmount">
): ExpenseCategory {
  const current = getStoredCategories();
  const created: ExpenseCategory = {
    ...category,
    id: "cat-" + Date.now(),
    spentAmount: 0,
  };
  const updated = [...current, created];
  saveCategories(updated);
  return created;
}

export function updateExpenseCategory(
  id: string,
  updates: Partial<ExpenseCategory>
): ExpenseCategory[] {
  const current = getStoredCategories();
  const updated = current.map((c) => (c.id === id ? { ...c, ...updates } : c));
  saveCategories(updated);
  return updated;
}

export function deleteExpenseCategory(id: string): ExpenseCategory[] {
  const current = getStoredCategories();
  const updated = current.filter((c) => c.id !== id);
  saveCategories(updated);
  return updated;
}

// Non-floating point Financial Metrics
export function calculateFinanceMetrics(): FinancialMetricSummary {
  const incomeList = getStoredIncome();
  const expenseList = getStoredExpenses();

  const totalIncome = sumMoney(incomeList.map((i) => i.amount));
  const totalExpenses = sumMoney(expenseList.map((e) => e.amount));
  const netCashFlow = subtractMoney(totalIncome, totalExpenses);

  const profitMarginPercent =
    totalIncome > 0
      ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
      : 0;

  const retainersIncome = sumMoney(
    incomeList
      .filter((i) => i.incomeSource.toLowerCase().includes("retainer"))
      .map((i) => i.amount)
  );

  const oneTimeIncome = subtractMoney(totalIncome, retainersIncome);

  return {
    totalIncome,
    totalExpenses,
    netCashFlow,
    profitMarginPercent,
    activeRetainersIncome: retainersIncome,
    oneTimeProjectsIncome: oneTimeIncome,
  };
}
