import React from "react";
import {
  FileText,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  CheckCheck,
} from "lucide-react";
import { InvoiceStatus, QuotationStatus } from "@/types/invoicing";

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

export function InvoiceStatusBadge({ status, className = "" }: InvoiceStatusBadgeProps) {
  switch (status) {
    case "paid":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Paid
        </span>
      );
    case "partially_paid":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 ${className}`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          Partially Paid
        </span>
      );
    case "overdue":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 ${className}`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          Overdue
        </span>
      );
    case "sent":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 ${className}`}
        >
          <Send className="w-3.5 h-3.5 text-blue-600" />
          Sent
        </span>
      );
    case "draft":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          Draft
        </span>
      );
    case "cancelled":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-500 border border-slate-200 line-through ${className}`}
        >
          <XCircle className="w-3.5 h-3.5 text-slate-400" />
          Cancelled
        </span>
      );
    default:
      return null;
  }
}

interface QuotationStatusBadgeProps {
  status: QuotationStatus;
  className?: string;
}

export function QuotationStatusBadge({ status, className = "" }: QuotationStatusBadgeProps) {
  switch (status) {
    case "accepted":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Accepted
        </span>
      );
    case "converted":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200 ${className}`}
        >
          <CheckCheck className="w-3.5 h-3.5 text-violet-600" />
          Converted to Invoice
        </span>
      );
    case "sent":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 ${className}`}
        >
          <Send className="w-3.5 h-3.5 text-blue-600" />
          Sent
        </span>
      );
    case "expired":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 ${className}`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          Expired
        </span>
      );
    case "rejected":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 ${className}`}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          Declined
        </span>
      );
    case "draft":
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          Draft
        </span>
      );
  }
}
