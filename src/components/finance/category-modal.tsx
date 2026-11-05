"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExpenseCategory } from "@/types/finance";
import { Tag, Palette, DollarSign } from "lucide-react";

export interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (categoryData: any) => void;
  initialCategory?: ExpenseCategory | null;
}

export function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  initialCategory,
}: CategoryModalProps) {
  const [name, setName] = React.useState("");
  const [allocatedBudget, setAllocatedBudget] = React.useState(25000);
  const [color, setColor] = React.useState("#6366f1");
  const [description, setDescription] = React.useState("");
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    if (initialCategory) {
      setName(initialCategory.name);
      setAllocatedBudget(initialCategory.allocatedBudget);
      setColor(initialCategory.color);
      setDescription(initialCategory.description);
    } else {
      setName("");
      setAllocatedBudget(25000);
      setColor("#6366f1");
      setDescription("");
    }
    setErrors({});
  }, [initialCategory, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Category name is required";
    if (allocatedBudget <= 0) newErrors.allocatedBudget = "Budget must be greater than zero";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name,
      allocatedBudget: Number(allocatedBudget),
      color,
      description,
    });
    onClose();
  };

  const presetColors = [
    "#6366f1", // Indigo
    "#0ea5e9", // Sky
    "#8b5cf6", // Purple
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ec4899", // Pink
    "#ef4444", // Red
    "#64748b", // Slate
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialCategory ? "Edit Expense Category" : "Create Expense Category"}
      description="Define a spending budget limit and classification for business operations."
      maxWidth="md"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {initialCategory ? "Save Changes" : "Create Category"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-1">
        <Input
          label="Category Name *"
          placeholder="e.g. Cloud Hosting, Subcontractors, SaaS"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          leftIcon={<Tag className="w-4 h-4" />}
        />

        <Input
          label="Monthly Budget Limit (₹) *"
          type="number"
          value={allocatedBudget}
          onChange={(e) => setAllocatedBudget(Number(e.target.value))}
          error={errors.allocatedBudget}
        />

        <div>
          <label className="text-xs font-medium text-slate-700 block mb-2">
            Badge & Chart Color
          </label>
          <div className="flex items-center gap-2">
            {presetColors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${
                  color === c ? "scale-110 border-slate-900 shadow-xs" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700 block mb-1.5">
            Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What costs fall under this category? (e.g. Servers, database...)"
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 placeholder:text-slate-400 shadow-2xs focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/10"
          />
        </div>
      </form>
    </Modal>
  );
}
