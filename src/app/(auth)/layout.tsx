import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-800">
      {/* Background radial gradient accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-linear-to-b from-indigo-100/50 via-slate-50 to-transparent pointer-events-none blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-xs group-hover:bg-indigo-700 transition-colors">
            N
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
            Nexora
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to website</span>
        </Link>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/60">
        <div className="flex items-center gap-1.5 text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted 256-bit Mock Workspace Environment</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-600 cursor-pointer">Privacy Notice</span>
          <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-600 cursor-pointer">Security Protocol</span>
        </div>
      </footer>
    </div>
  );
}
