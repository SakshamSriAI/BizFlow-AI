import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                N
              </div>
              <span className="font-bold text-base text-slate-900 tracking-tight">
                Nexora
              </span>
            </Link>
            <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
              The operating system for modern business. Connect customers, sales pipeline, finances, invoicing, and autonomous AI workflows in one unified platform.
            </p>
            <div className="flex items-center gap-2 pt-2 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
              <span className="text-slate-300">•</span>
              <span>Next.js Architecture</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <div className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-indigo-600 transition-colors">
                  CRM & Leads
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-indigo-600 transition-colors">
                  Financial Management
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-indigo-600 transition-colors">
                  Invoicing & Payments
                </a>
              </li>
              <li>
                <a href="#ai" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                  AI Business Assistant
                  <span className="text-[9px] bg-indigo-50 text-indigo-700 px-1 rounded font-semibold">AI</span>
                </a>
              </li>
              <li>
                <a href="#ai" className="hover:text-indigo-600 transition-colors">
                  Autonomous Agents
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-indigo-600 transition-colors">
                  Business Analytics
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <div className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
              Solutions
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#solutions" className="hover:text-indigo-600 transition-colors">
                  Digital Agencies
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-indigo-600 transition-colors">
                  Solo Freelancers
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-indigo-600 transition-colors">
                  Consultants & Advisors
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-indigo-600 transition-colors">
                  Early-Stage Startups
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-indigo-600 transition-colors">
                  Growing Companies
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Legal */}
          <div className="space-y-3">
            <div className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
              Platform & Legal
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="hover:text-indigo-600 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-indigo-600 transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <Link href="/app" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                  Launch Demo App
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-400">Terms of Service</span>
              </li>
              <li>
                <span className="text-slate-400">Security Architecture</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div>
            © {new Date().getFullYear()} Nexora Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Built with Next.js, React, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
