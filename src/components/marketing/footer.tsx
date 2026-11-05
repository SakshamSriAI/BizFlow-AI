import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="bg-[#101820] border-t border-[#17232D] pt-16 pb-12 text-[#667482] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#17232D] border border-[#263746] flex items-center justify-center text-[#F7F9FB] font-bold text-sm shadow-xs group-hover:bg-[#20B8A5] group-hover:text-[#101820] transition-colors">
                N
              </div>
              <span className="font-bold text-base text-[#F7F9FB] tracking-tight">
                Nexora
              </span>
            </Link>
            <p className="text-[#667482] text-xs max-w-sm leading-relaxed">
              The premium business operating system. Connect customer pipelines, double-entry financials, automated invoicing, and autonomous agents in one intelligent workspace.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[#667482]">
              <span className="w-2 h-2 rounded-full bg-[#20B8A5] animate-pulse" />
              <span className="text-[#F7F9FB] font-medium">All Systems Operational</span>
              <span className="text-[#263746]">•</span>
              <span>Production Ready</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <div className="font-semibold text-[#F7F9FB] text-xs uppercase tracking-wider">
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-[#2F80ED] transition-colors">
                  CRM & Pipelines
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#2F80ED] transition-colors">
                  Financial Ledger
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#2F80ED] transition-colors">
                  Invoicing & Billing
                </a>
              </li>
              <li>
                <a href="#ai" className="hover:text-[#20B8A5] transition-colors flex items-center gap-1.5">
                  <span>AI Business Copilot</span>
                  <span className="text-[9px] bg-[#17232D] text-[#20B8A5] px-1.5 py-0.5 rounded border border-[#263746] font-semibold">AI</span>
                </a>
              </li>
              <li>
                <a href="#ai" className="hover:text-[#20B8A5] transition-colors">
                  Autonomous Agents
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#2F80ED] transition-colors">
                  Executive Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <div className="font-semibold text-[#F7F9FB] text-xs uppercase tracking-wider">
              Solutions
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#solutions" className="hover:text-[#F7F9FB] transition-colors">
                  Digital Agencies
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-[#F7F9FB] transition-colors">
                  Solo Founders
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-[#F7F9FB] transition-colors">
                  Consultants & Advisory
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-[#F7F9FB] transition-colors">
                  Growing Startups
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-[#F7F9FB] transition-colors">
                  Enterprise Services
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-3">
            <div className="font-semibold text-[#F7F9FB] text-xs uppercase tracking-wider">
              Platform
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="hover:text-[#F7F9FB] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#F7F9FB] transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <Link href="/app" className="hover:text-[#2F80ED] transition-colors flex items-center gap-1 text-[#F7F9FB]">
                  Launch Application
                  <ArrowUpRight className="w-3 h-3 text-[#667482]" />
                </Link>
              </li>
              <li>
                <span className="text-[#667482]">Security Architecture</span>
              </li>
              <li>
                <span className="text-[#667482]">Privacy & Compliance</span>
              </li>
              <li>
                <span className="text-[#667482]">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#17232D] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#667482]">
          <div>
            © {new Date().getFullYear()} Nexora Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Built with precision for modern enterprise operations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
