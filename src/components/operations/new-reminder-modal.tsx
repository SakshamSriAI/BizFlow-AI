"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ReminderUrgency } from "@/types/operations";
import { addReminder } from "@/lib/operations-store";

interface NewReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export function NewReminderModal({
  isOpen,
  onClose,
  onCreated,
}: NewReminderModalProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState<
    "Tax & Compliance" | "Client Billing" | "Contract Renewal" | "Operations" | "Team Review"
  >("Tax & Compliance");
  const [urgency, setUrgency] = React.useState<ReminderUrgency>("high");
  const [dueDate, setDueDate] = React.useState(
    new Date(Date.now() + 86400000 * 5).toISOString().split("T")[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addReminder({
      title: title.trim(),
      description: description.trim(),
      category,
      urgency,
      dueDate,
    });

    setTitle("");
    setDescription("");
    onCreated?.();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create System Reminder" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Reminder Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. GST Filing for Q3 2026"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Key notes, deadlines, instructions..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value as
                    | "Tax & Compliance"
                    | "Client Billing"
                    | "Contract Renewal"
                    | "Operations"
                    | "Team Review"
                )
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Tax & Compliance">Tax & Compliance</option>
              <option value="Client Billing">Client Billing</option>
              <option value="Contract Renewal">Contract Renewal</option>
              <option value="Operations">Operations</option>
              <option value="Team Review">Team Review</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Urgency
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as ReminderUrgency)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Create Reminder
          </Button>
        </div>
      </form>
    </Modal>
  );
}
