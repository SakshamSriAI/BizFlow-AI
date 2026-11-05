"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { TaskCategory, TaskPriority } from "@/types/operations";
import { addTask } from "@/lib/operations-store";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export function NewTaskModal({ isOpen, onClose, onCreated }: NewTaskModalProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState<TaskCategory>("Operations");
  const [priority, setPriority] = React.useState<TaskPriority>("medium");
  const [assigneeName, setAssigneeName] = React.useState("Alex Morgan");
  const [assigneeRole, setAssigneeRole] = React.useState("Head of Growth");
  const [dueDate, setDueDate] = React.useState(
    new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0]
  );
  const [tagsInput, setTagsInput] = React.useState("Operations, Priority");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      priority,
      status: "todo",
      assignee: {
        name: assigneeName,
        role: assigneeRole,
      },
      dueDate,
      tags,
    });

    setTitle("");
    setDescription("");
    onCreated?.();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Operational Task" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Task Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Prepare Q4 Strategic Review Deck"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add specific context, action items, or relevant links..."
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
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Operations">Operations</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="Client">Client</option>
              <option value="Team">Team</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Assignee
            </label>
            <select
              value={assigneeName}
              onChange={(e) => {
                setAssigneeName(e.target.value);
                if (e.target.value === "Alex Morgan") setAssigneeRole("Head of Growth");
                else if (e.target.value === "Marcus Vance") setAssigneeRole("Finance Director");
                else if (e.target.value === "Elena Rostova") setAssigneeRole("Operations Lead");
                else setAssigneeRole("Specialist");
              }}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Alex Morgan">Alex Morgan (Head of Growth)</option>
              <option value="Marcus Vance">Marcus Vance (Finance Director)</option>
              <option value="Elena Rostova">Elena Rostova (Operations Lead)</option>
              <option value="Sara Chen">Sara Chen (Senior Account Executive)</option>
            </select>
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
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. Q4, Billing, Enterprise"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
