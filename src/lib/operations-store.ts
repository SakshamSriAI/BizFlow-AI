"use client";

import * as React from "react";
import { OperationalTask, OperationalReminder, TaskStatus } from "@/types/operations";
import { initialMockTasks, initialMockReminders } from "@/data/mock-operations-data";

const TASKS_KEY = "businessos_tasks_v1";
const REMINDERS_KEY = "businessos_reminders_v1";
const OPERATIONS_EVENT = "businessos_operations_updated";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function notifySubscribers() {
  if (isBrowser()) {
    window.dispatchEvent(new Event(OPERATIONS_EVENT));
  }
}

// ----------------- Tasks Store -----------------

export function getStoredTasks(): OperationalTask[] {
  if (!isBrowser()) return initialMockTasks;
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    if (!raw) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(initialMockTasks));
      return initialMockTasks;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read tasks from localStorage", err);
    return initialMockTasks;
  }
}

export function saveTasks(tasks: OperationalTask[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    notifySubscribers();
  } catch (err) {
    console.error("Failed to save tasks", err);
  }
}

export function addTask(newTask: Omit<OperationalTask, "id" | "createdAt">): OperationalTask {
  const current = getStoredTasks();
  const created: OperationalTask = {
    ...newTask,
    id: `task-${Date.now()}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
  saveTasks([created, ...current]);
  return created;
}

export function updateTaskStatus(id: string, status: TaskStatus): void {
  const current = getStoredTasks();
  const updated = current.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        status,
        completedAt: status === "completed" ? new Date().toISOString().split("T")[0] : undefined,
      };
    }
    return task;
  });
  saveTasks(updated);
}

export function updateTask(updatedTask: OperationalTask): void {
  const current = getStoredTasks();
  const updated = current.map((t) => (t.id === updatedTask.id ? updatedTask : t));
  saveTasks(updated);
}

export function deleteTask(id: string): void {
  const current = getStoredTasks();
  saveTasks(current.filter((t) => t.id !== id));
}

// ----------------- Reminders Store -----------------

export function getStoredReminders(): OperationalReminder[] {
  if (!isBrowser()) return initialMockReminders;
  try {
    const raw = localStorage.getItem(REMINDERS_KEY);
    if (!raw) {
      localStorage.setItem(REMINDERS_KEY, JSON.stringify(initialMockReminders));
      return initialMockReminders;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read reminders from localStorage", err);
    return initialMockReminders;
  }
}

export function saveReminders(reminders: OperationalReminder[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
    notifySubscribers();
  } catch (err) {
    console.error("Failed to save reminders", err);
  }
}

export function addReminder(newReminder: Omit<OperationalReminder, "id" | "createdAt" | "isCompleted">): OperationalReminder {
  const current = getStoredReminders();
  const created: OperationalReminder = {
    ...newReminder,
    id: `rem-${Date.now()}`,
    createdAt: new Date().toISOString().split("T")[0],
    isCompleted: false,
  };
  saveReminders([created, ...current]);
  return created;
}

export function toggleReminderComplete(id: string): void {
  const current = getStoredReminders();
  const updated = current.map((r) => {
    if (r.id === id) {
      return { ...r, isCompleted: !r.isCompleted };
    }
    return r;
  });
  saveReminders(updated);
}

export function snoozeReminder(id: string, daysToAdd: number = 3): void {
  const current = getStoredReminders();
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysToAdd);
  const snoozeStr = targetDate.toISOString().split("T")[0];

  const updated = current.map((r) => {
    if (r.id === id) {
      return { ...r, snoozedUntil: snoozeStr, dueDate: snoozeStr };
    }
    return r;
  });
  saveReminders(updated);
}

export function deleteReminder(id: string): void {
  const current = getStoredReminders();
  saveReminders(current.filter((r) => r.id !== id));
}

// ----------------- React Hooks -----------------

export function useOperationsTasks() {
  const [tasks, setTasks] = React.useState<OperationalTask[]>([]);
  const [mounted, setMounted] = React.useState(false);

  const refresh = React.useCallback(() => {
    setTasks(getStoredTasks());
  }, []);

  React.useEffect(() => {
    setMounted(true);
    refresh();

    const handleUpdate = () => refresh();
    window.addEventListener(OPERATIONS_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(OPERATIONS_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [refresh]);

  return {
    tasks,
    mounted,
    addTask,
    updateTaskStatus,
    updateTask,
    deleteTask,
    refresh,
  };
}

export function useOperationsReminders() {
  const [reminders, setReminders] = React.useState<OperationalReminder[]>([]);
  const [mounted, setMounted] = React.useState(false);

  const refresh = React.useCallback(() => {
    setReminders(getStoredReminders());
  }, []);

  React.useEffect(() => {
    setMounted(true);
    refresh();

    const handleUpdate = () => refresh();
    window.addEventListener(OPERATIONS_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(OPERATIONS_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [refresh]);

  return {
    reminders,
    mounted,
    addReminder,
    toggleReminderComplete,
    snoozeReminder,
    deleteReminder,
    refresh,
  };
}
