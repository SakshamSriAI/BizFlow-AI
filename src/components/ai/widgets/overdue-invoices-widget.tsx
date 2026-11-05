"use client";

import React from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/button";
import { AlertCircle, Send, ArrowRight, Clock } from "lucide-react";

interface OverdueInvoiceItem {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  amountDueCents: number;
  dueDate: string;
  daysOverdue: number;
}

interface OverdueInvoicesWidgetProps {
  data: {
    totalOverdueCents: number;
    invoices: OverdueInvoiceItem[];
  };
  onTriggerReminder?: (invoice: OverdueInvoiceItem) => void;
}

export function OverdueInvoicesWidget({
  data,
  onTriggerReminder,
}: OverdueInvoicesWidgetProps) {
  if (!data?.invoices) return null;

  return (
    <div className="my-3 bg-white border border-rose-200 rounded-xl p-4 shadow-sm space-y-3.5 max-w-xl">
      <div className="flex items-center justify-between pb-2 border-b border-rose-100">
        <div className="flex items-center gap-2 text-rose-700 font-semibold text-xs">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span>Overdue Client Invoices</span>
        </div>
        <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
          Total: {formatMoney(data.totalOverdueCents, "INR")}
        </span>
      </div>

      <div className="space-y-2.5">
        {data.invoices.map((inv) => (
          <div
            key={inv.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-rose-50/40 border border-rose-100 gap-2.5"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-600">
                  {inv.invoiceNumber}
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  {inv.customerName}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                <span>Due: {inv.dueDate}</span>
                <span className="text-rose-600 font-medium flex items-center gap-0.5">
                  <Clock className="w-3 h-3" /> {inv.daysOverdue} days past due
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-sm font-bold text-slate-900 font-mono">
                {formatMoney(inv.amountDueCents, "INR")}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTriggerReminder?.(inv)}
                className="h-7 px-2.5 text-[11px] text-rose-700 hover:bg-rose-100 border-rose-300"
              >
                <Send className="w-3 h-3 mr-1 text-rose-600" />
                Remind
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1 flex justify-between items-center text-[11px] text-slate-500">
        <span>Reminders dispatch polite notifications with payment links</span>
        <Link
          href="/finance/invoices"
          className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5"
        >
          View all in Ledger <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
