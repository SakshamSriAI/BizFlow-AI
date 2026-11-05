"use client";

import * as React from "react";
import {
  X,
  Building2,
  Mail,
  Phone,
  Calendar,
  FileText,
  DollarSign,
  TrendingUp,
  CreditCard,
  Edit,
  Trash2,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/crm";

export interface CustomerProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  currencySymbol?: string;
}

export function CustomerProfileDrawer({
  isOpen,
  onClose,
  customer,
  onEdit,
  onDelete,
  currencySymbol = "₹",
}: CustomerProfileDrawerProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  React.useEffect(() => {
    setShowDeleteConfirm(false);
  }, [customer]);

  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-fade-in">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-xs shrink-0">
                {customer.company.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900 leading-tight">
                    {customer.company}
                  </h2>
                  <Badge
                    variant={customer.status === "Active" ? "success" : "secondary"}
                    size="sm"
                  >
                    {customer.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {customer.industry} • Joined {customer.joinedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(customer)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
                title="Edit Customer"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* LTV & Retainer Stats */}
          <div className="px-5 py-4 border-b border-slate-100 bg-white grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Total Lifetime Value
              </span>
              <span className="text-base font-bold text-slate-900 font-mono">
                {currencySymbol}
                {customer.lifetimeValue.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Monthly Retainer
              </span>
              <span className="text-base font-bold text-indigo-600 font-mono">
                {currencySymbol}
                {customer.monthlyRetainer.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Projects Active
              </span>
              <span className="text-base font-bold text-emerald-600">
                {customer.activeProjectsCount} Projects
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <a
              href={`mailto:${customer.email}`}
              className="flex items-center gap-1.5 hover:text-indigo-600"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{customer.email}</span>
            </a>
            <a
              href={`tel:${customer.phone}`}
              className="flex items-center gap-1.5 hover:text-indigo-600"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{customer.phone}</span>
            </a>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Primary Contact Person */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase">
                Primary Contact Person
              </span>
              <div className="text-sm font-bold text-slate-900">
                {customer.primaryContactRole}
              </div>
            </div>

            {/* Account Notes */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">
                Contract & Billing Notes
              </span>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                {customer.notes || "No special account terms logged."}
              </p>
            </div>

            {/* Recent Billing Milestones */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase">
                  Invoice History ({customer.invoicesCount})
                </span>
                <span className="text-[11px] text-indigo-600 font-medium">
                  {currencySymbol}{customer.lifetimeValue.toLocaleString()} billed
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-xs text-slate-600 flex items-center justify-between">
                <span>Monthly Recurring Wire Retainer</span>
                <Badge variant="success" size="sm">Settled</Badge>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/70">
            {showDeleteConfirm ? (
              <div className="flex items-center gap-2 w-full justify-between animate-fade-in">
                <span className="text-xs text-rose-600 font-medium">
                  Delete customer record?
                </span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      onDelete(customer.id);
                      onClose();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                  leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
                  className="text-rose-600 hover:bg-rose-50"
                >
                  Delete Record
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      alert("Invoicing module (Phase 6) will generate this client invoice.")
                    }
                    leftIcon={<FileText className="w-3.5 h-3.5 text-indigo-600" />}
                  >
                    Create Invoice
                  </Button>
                  <Button variant="primary" size="sm" onClick={onClose}>
                    Done
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
