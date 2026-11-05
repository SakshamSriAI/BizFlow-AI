"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Layers,
  Users,
  Target,
  FileText,
  CreditCard,
  TrendingUp,
  BarChart3,
  Bot,
  Zap,
  ShieldCheck,
  ChevronDown,
  Building2,
  Briefcase,
  Laptop,
  Rocket,
  Store,
  ArrowUpRight,
  Check,
  HelpCircle,
  Lock,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { AIChatSimulation } from "@/components/marketing/ai-chat-simulation";
import { cn } from "@/lib/utils";

export default function MarketingLandingPage() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "annual">("monthly");
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);
  const [selectedSolution, setSelectedSolution] = React.useState<string>("agencies");

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const problems = [
    {
      title: "Scattered Customer Information",
      description: "Client contact notes in WhatsApp, files in Drive, and emails buried across separate team inboxes.",
      icon: Users,
    },
    {
      title: "Missed Leads & Slow Follow-ups",
      description: "High-intent inquiries slip through the cracks when there is no structured follow-up pipeline.",
      icon: Target,
    },
    {
      title: "Disconnected Financial Records",
      description: "Expenses tracked in spreadsheets while bank receipts and invoices live in separate disconnected portals.",
      icon: CreditCard,
    },
    {
      title: "Manual Invoicing & Late Payments",
      description: "Creating PDF invoices manually and wasting precious business hours manually chasing overdue payments.",
      icon: FileText,
    },
    {
      title: "Overwhelming Tool Fatigue",
      description: "Paying for 6 different monthly subscriptions that don't talk to each other and require constant double-entry.",
      icon: Layers,
    },
  ];

  const features = [
    {
      id: "crm",
      title: "CRM & Lead Pipeline",
      description: "Visual Kanban board, status stages, deal values, and automated reminder schedules to convert more leads.",
      icon: Target,
      badge: "Sales",
    },
    {
      id: "customers",
      title: "Customer Directory",
      description: "Complete 360° client profiles tracking historical transactions, lifetime value, contracts, and notes.",
      icon: Users,
      badge: "CRM",
    },
    {
      id: "finance",
      title: "Income & Expense Tracking",
      description: "Double-entry bookkeeping concepts simplified for founders. Categorize spending and protect profit margins.",
      icon: TrendingUp,
      badge: "Finance",
    },
    {
      id: "invoicing",
      title: "Invoicing & Payment Collection",
      description: "Issue professional branded invoices, track live payment statuses, and collect payments on time.",
      icon: FileText,
      badge: "Billing",
    },
    {
      id: "operations",
      title: "Operations & Daily Tasks",
      description: "Connect your client deliverables directly to invoices and assigned team members without third-party tools.",
      icon: CheckCircle2,
      badge: "Operations",
    },
    {
      id: "analytics",
      title: "Executive Analytics & Reports",
      description: "Clear charts on revenue velocity, cash flow, expense categories, and conversion funnels with 1-click exports.",
      icon: BarChart3,
      badge: "Reports",
    },
    {
      id: "copilot",
      title: "AI Business Assistant",
      description: "Natural-language query copilot that understands your numbers, identifies risks, and surfaces actionable advice.",
      icon: Bot,
      badge: "AI Copilot",
    },
    {
      id: "agents",
      title: "Autonomous AI Agents",
      description: "Background workers that proactively draft follow-ups, detect overdue balances, and execute workflows.",
      icon: Workflow,
      badge: "Autonomous",
    },
  ];

  const solutions = [
    {
      id: "agencies",
      title: "Digital Agencies",
      icon: Rocket,
      headline: "Scale client retainers and project revenue seamlessly",
      description:
        "Manage multiple brand deliverables, track project expenses against client budgets, and ensure retainers are invoiced and collected on time every month.",
      benefits: [
        "Client retainer billing & automated renewals",
        "Expense tracking against specific client budgets",
        "Pipeline visibility for high-ticket service deals",
      ],
    },
    {
      id: "freelancers",
      title: "Solo Freelancers",
      icon: Laptop,
      headline: "Look like a polished agency of 10 without the overhead",
      description:
        "Stop managing your solo practice with clunky spreadsheets. Generate professional quotations, get paid faster with online invoices, and keep your taxes organized.",
      benefits: [
        "Fast branded invoice creation with PDF export",
        "Track unpaid balances with automated reminders",
        "Categorized expense ledger for easy tax time",
      ],
    },
    {
      id: "consultants",
      title: "Consultants & Advisors",
      icon: Briefcase,
      headline: "Focus on client strategy while AI manages operations",
      description:
        "Deliver premium advisory services with clean customer tracking, proposal generation, and automated follow-up cadences that keep clients engaged.",
      benefits: [
        "Proposal to invoice 1-click conversion",
        "AI executive summaries of weekly business performance",
        "Secure workspace with multi-currency support",
      ],
    },
    {
      id: "startups",
      title: "Early-Stage Startups",
      icon: Building2,
      headline: "One central command center before hiring an operations team",
      description:
        "Keep founders focused on product and revenue. Track runway, monitor cash in/out, and maintain a tight grip on enterprise sales conversations.",
      benefits: [
        "Real-time burn rate and net cash flow insights",
        "Sales pipeline with multi-stage deal tracking",
        "Team permissions and role management ready for scale",
      ],
    },
    {
      id: "smallbiz",
      title: "Small Businesses",
      icon: Store,
      headline: "Replace legacy software with modern connected intelligence",
      description:
        "Empower your staff to manage customer orders, track operational tasks, and view live daily receipts from anywhere on any device.",
      benefits: [
        "Simple, intuitive interface any employee can learn in minutes",
        "Receipt upload and expense categorization",
        "Clear financial statements without accounting jargon",
      ],
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      badge: "Forever Free",
      description: "Essential tools for solo founders and freelancers getting started.",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "Up to 25 Active Leads & Customers",
        "5 Invoices per month",
        "Basic Income & Expense Tracking",
        "Standard Business Dashboard",
        "Community Support",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Starter",
      badge: "Solo & Micro",
      description: "Complete operational suite for ambitious independent professionals.",
      monthlyPrice: billingCycle === "monthly" ? 1499 : 1199,
      annualPrice: 1199,
      features: [
        "Unlimited Leads & Customers",
        "Unlimited Invoices & Quotations",
        "Full Financial & Expense Ledgers",
        "AI Business Assistant (50 prompts/mo)",
        "Automated Payment Reminders",
        "Email Support",
      ],
      cta: "Start 14-Day Free Trial",
      popular: false,
    },
    {
      name: "Growth",
      badge: "Most Popular",
      description: "The complete AI-powered operating system for scaling agencies and companies.",
      monthlyPrice: billingCycle === "monthly" ? 3499 : 2799,
      annualPrice: 2799,
      features: [
        "Everything in Starter, plus:",
        "Unlimited AI Assistant Prompts",
        "3 Autonomous AI Workflow Agents",
        "Sales Pipeline Kanban Board",
        "Multi-Currency Transactions",
        "Up to 5 Team Members",
        "Priority Support",
      ],
      cta: "Start 14-Day Free Trial",
      popular: true,
    },
    {
      name: "Business",
      badge: "Unrestricted",
      description: "Enterprise control, custom integrations, and dedicated agent capacity.",
      monthlyPrice: billingCycle === "monthly" ? 7999 : 6399,
      annualPrice: 6399,
      features: [
        "Everything in Growth, plus:",
        "Unlimited Autonomous AI Agents",
        "Unlimited Team Members & Role Permissions",
        "Custom Workflow Automations",
        "Advanced Analytics & Export Engine",
        "Dedicated Account Specialist",
        "99.9% Uptime Guarantee",
      ],
      cta: "Contact Sales / Demo",
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "What makes Nexora different from traditional CRM or accounting software?",
      a: "Traditional tools force you into silos: CRM in one app, invoicing in another, expenses in a third, and task management in a fourth. Nexora unifies all four domains into a single connected operating system, enriched with autonomous AI agents that proactively execute work across your data instead of just displaying tables.",
    },
    {
      q: "How do the AI Assistant and Autonomous Agents work?",
      a: "Nexora features two levels of intelligence: The interactive AI Assistant (an executive copilot you can question in plain English about revenue, margins, or lead priority) and Autonomous AI Agents (background workers that listen for business events, such as an overdue invoice or stalled lead, and draft remedies for your approval).",
    },
    {
      q: "Can I import data from my existing spreadsheets or accounting tools?",
      a: "Yes. Nexora is architected with straightforward CSV and Excel import capabilities for contacts, leads, historical invoices, and expense ledgers, ensuring a seamless migration without data loss.",
    },
    {
      q: "Is my business and financial data kept private and secure?",
      a: "Absolutely. We enforce strict workspace isolation, role-based access control, and bank-grade TLS encryption. Your private financial information and client records are never used to train public machine learning models.",
    },
    {
      q: "Are the pricing plans shown here binding commercial commitments?",
      a: "The pricing displayed is illustrative for our beta launch. You can test all tiers with functional mock previews and start immediately without requiring a credit card.",
    },
    {
      q: "Which types of businesses does Nexora support best?",
      a: "Nexora is optimized for service businesses, digital agencies, consultancies, solo professionals, high-growth tech startups, and small enterprises that want streamlined operations without bloated enterprise software.",
    },
  ];

  const currentSolution =
    solutions.find((s) => s.id === selectedSolution) || solutions[0];

  return (
    <div className="space-y-24 sm:space-y-32 pt-24 pb-20">
      {/* =========================================================================
          SECTION 2: HERO
         ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Glow accent in background */}
        <div
          className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl opacity-20 pointer-events-none"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-indigo-600 to-violet-400 opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        {/* Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-200/60 text-indigo-700 text-xs font-medium mb-8 shadow-2xs hover:bg-indigo-100/70 transition-colors cursor-pointer">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
          <span>Introducing Nexora AI 1.0</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-0.5 font-semibold">
            Explore Beta <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.08]">
          Your Entire Business. <br className="hidden sm:inline" />
          <span className="bg-linear-to-r from-indigo-600 via-indigo-700 to-violet-600 bg-clip-text text-transparent">
            One Intelligent Platform.
          </span>
        </h1>

        {/* Supporting Message */}
        <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Manage customers, sales, finances, invoices and daily operations from one connected workspace, powered by intelligent AI.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link href="/app">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-8 shadow-md shadow-indigo-600/20 text-sm font-semibold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Get Started
            </Button>
          </Link>
          <Link href="/app">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 text-sm font-medium border-slate-300 hover:bg-slate-50"
            >
              Explore the Platform
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Full mock workspace ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Setup in under 60 seconds</span>
          </div>
        </div>

        {/* Visual Dashboard Preview */}
        <div className="mt-14 sm:mt-16">
          <DashboardPreview />
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE PROBLEM
         ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="danger" size="sm" dot className="mb-3">
            The Reality for Growing Businesses
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Running a business across 6 different tools is quietly bleeding your time and revenue.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500">
            When your customer conversations, sales pipeline, bank receipts, and invoices live in disconnected silos, growth becomes exhausting chaos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2 leading-snug">
                    {prob.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {prob.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-medium text-rose-600">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Costly inefficiency</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE SOLUTION
         ========================================================================= */}
      <section id="solution" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
        <div className="rounded-3xl border border-indigo-100 bg-linear-to-b from-indigo-50/60 via-white to-indigo-50/20 p-8 sm:p-12 lg:p-16 text-center shadow-xs">
          <Badge variant="indigo" size="sm" dot className="mb-4">
            The Nexora Solution
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
            One connected workspace where business management meets autonomous AI.
          </h2>
          <p className="mt-4 text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Nexora unifies your entire business architecture: from your first lead inquiry to the final tax-ready receipt, with an AI copilot that executes repetitive tasks for you.
          </p>

          {/* Core Pillars Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Unified Business Core</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Customers, deal stages, invoices, and bank expenses reference one single source of truth. No double entry, no mismatched numbers.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Intelligent AI Copilot</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Query your operational database in plain English. Get instant cash flow forecasts, client performance summaries, and overdue alerts.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Autonomous Workflow Agents</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Self-operating agents monitor your pipelines, draft personalized follow-ups, and flag delinquent invoices so you never drop the ball.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FEATURES
         ========================================================================= */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="indigo" size="sm" className="mb-3">
            Core Modules
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Eight essential business engines, unified into one elegant suite.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500">
            Every capability you need to acquire leads, service clients, track money, and streamline operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="secondary" size="sm">
                      {feat.badge}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Explore module</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: AI INTELLIGENCE SIMULATION
         ========================================================================= */}
      <section id="ai" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="indigo" size="sm" dot className="mb-3">
            Intelligent Copilot & Autonomous Agents
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Ask any question. Delegate any workflow.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500">
            Experience how the Nexora AI Assistant understands real business metrics and converts data into immediate, revenue-protecting actions.
          </p>
        </div>

        {/* Live Interactive Simulation Widget */}
        <AIChatSimulation />
      </section>

      {/* =========================================================================
          SECTION 7: HOW IT WORKS
         ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="secondary" size="sm" className="mb-3">
            Simple 4-Step Architecture
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            From chaos to complete clarity in 4 simple steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            {
              step: "01",
              title: "Create Your Workspace",
              description: "Configure your business entity, local currency, tax preference, and brand profile in under 60 seconds.",
            },
            {
              step: "02",
              title: "Organize Information",
              description: "Import or add your active clients, open leads, pending deals, and standard service catalog.",
            },
            {
              step: "03",
              title: "Manage Operations",
              description: "Issue professional invoices, record receipts, and manage project tasks from one central dashboard.",
            },
            {
              step: "04",
              title: "Let AI Assist You",
              description: "Autonomous agents monitor payment deadlines, summarize cash flow, and draft client follow-ups.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs relative"
            >
              <div className="text-3xl font-extrabold text-indigo-100 font-mono mb-3">
                {item.step}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: SOLUTIONS BY INDUSTRY
         ========================================================================= */}
      <section id="solutions" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="indigo" size="sm" className="mb-3">
            Tailored Solutions
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Engineered for every stage of modern business.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500">
            Whether you are a solo practitioner or an expanding company with 25 employees, Nexora adapts to your operational rhythm.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {solutions.map((sol) => (
            <button
              key={sol.id}
              onClick={() => setSelectedSolution(sol.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold transition-all",
                selectedSolution === sol.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              )}
            >
              {sol.title}
            </button>
          ))}
        </div>

        {/* Selected Solution Display Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="indigo" size="sm">Solution for {currentSolution.title}</Badge>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {currentSolution.headline}
              </h3>
            </div>
            <Link href="/app">
              <Button variant="primary" size="sm">
                Explore Workflow
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentSolution.description}
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Key Platform Capabilities
              </span>
              {currentSolution.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: PRICING
         ========================================================================= */}
      <section id="pricing" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="indigo" size="sm" className="mb-3">
            Transparent Pricing
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Simple, predictable plans that scale with your growth.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500">
            Placeholder pricing for planning purposes. Start free today without a credit card.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-6 inline-flex items-center gap-3 p-1 rounded-full bg-slate-100 border border-slate-200 text-xs">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-4 py-1.5 rounded-full font-medium transition-all",
                billingCycle === "monthly"
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "px-4 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5",
                billingCycle === "annual"
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded-full font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl bg-white p-6 flex flex-col justify-between transition-all relative border",
                plan.popular
                  ? "border-indigo-600 shadow-lg ring-1 ring-indigo-600"
                  : "border-slate-200/90 shadow-2xs hover:border-slate-300"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="indigo" size="sm" className="shadow-xs px-3">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                  <Badge variant={plan.popular ? "indigo" : "secondary"} size="sm">
                    {plan.badge}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 min-h-[34px] leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="my-5 pb-5 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      {plan.monthlyPrice === 0 ? "₹0" : `₹${plan.monthlyPrice.toLocaleString()}`}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {billingCycle === "annual" ? "Billed annually" : "Billed monthly"}
                  </span>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-2.5 mb-6 text-xs text-slate-700">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link href="/app" className="w-full">
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  size="md"
                  className="w-full justify-center"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FAQ ACCORDION
         ========================================================================= */}
      <section id="faq" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-28">
        <div className="text-center mb-12">
          <Badge variant="secondary" size="sm" className="mb-3">
            Got Questions?
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Everything you need to know about Nexora, our AI capabilities, and data privacy.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180 text-indigo-600"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: FINAL CALL TO ACTION
         ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-14 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle decorative glow */}
          <div
            className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-indigo-600/30 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <Badge variant="indigo" size="sm" className="bg-indigo-900/60 text-indigo-300 border-indigo-700/60">
              Start Your Free Workspace Today
            </Badge>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Everything Your Business Needs. <br className="hidden sm:inline" />
              Finally, Together.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Join modern founders, agency owners, and growing teams who have replaced fragmented tools with Nexora&apos;s intelligent business operating system.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/app">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto px-8 bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/app">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white"
                >
                  Explore Demo App
                </Button>
              </Link>
            </div>

            <div className="pt-2 text-xs text-slate-400">
              No credit card required • Instant access to mock workspace
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
