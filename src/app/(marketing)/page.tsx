"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  Variants,
} from "framer-motion";
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
  Kanban,
  CheckSquare,
  Clock,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { AIChatSimulation } from "@/components/marketing/ai-chat-simulation";
import { cn } from "@/lib/utils";

export default function MarketingLandingPage() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "annual">("monthly");
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);
  const [selectedSolution, setSelectedSolution] = React.useState<string>("agencies");
  const shouldReduceMotion = useReducedMotion();

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Motion Variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardItem: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const problems = [
    {
      title: "Scattered Customer Notes",
      description: "Client contact notes in WhatsApp, files in Drive, and emails buried across team inboxes.",
      icon: Users,
    },
    {
      title: "Missed Deal Follow-ups",
      description: "High-intent inquiries slip through the cracks without a structured deal pipeline.",
      icon: Target,
    },
    {
      title: "Disconnected Ledgers",
      description: "Expenses tracked in spreadsheets while receipts and bank balances live elsewhere.",
      icon: CreditCard,
    },
    {
      title: "Manual Invoicing Chores",
      description: "Creating manual invoices and wasting hours chasing late payments without automation.",
      icon: FileText,
    },
  ];

  const solutions = [
    {
      id: "agencies",
      title: "Digital Agencies",
      icon: Briefcase,
      headline: "Run your entire client roster, retainers, and projects in one place",
      description:
        "Agencies waste hundreds of billable hours juggling CRM tools, separate invoicing software, and disconnected spreadsheets. Nexora unifies your client directory, recurring billing retainers, and deal pipeline into one synchronized hub.",
      benefits: [
        "Track client lifetime value (LTV) and historical deal stages",
        "Automated recurring retainer invoicing with auto-reconciliation",
        "AI agents that follow up on overdue client deliverables",
        "Team permissions and role-based workspace access",
      ],
    },
    {
      id: "freelancers",
      title: "Solo Freelancers",
      icon: Laptop,
      headline: "Look like a polished studio without the operational overhead",
      description:
        "Stop managing your solo practice with clunky spreadsheets. Generate professional quotations, get paid faster with online invoices, and keep your business finances organized effortlessly.",
      benefits: [
        "Fast branded invoice creation with instant PDF export",
        "Track unpaid balances with automated reminders",
        "Categorized expense ledger for effortless tax preparation",
        "Real-time visibility over net profit and income",
      ],
    },
    {
      id: "consultants",
      title: "Consultants & Advisory",
      icon: Compass,
      headline: "Focus on strategic client advisory while Nexora handles operations",
      description:
        "Deliver high-impact advisory services with clean customer tracking, proposal generation, and automated follow-up cadences that keep client agreements on schedule.",
      benefits: [
        "1-click Quotation to Invoice conversion",
        "AI executive summaries of weekly revenue and client velocity",
        "Secure workspace with multi-currency support",
        "Document contract milestones and project deliverables",
      ],
    },
    {
      id: "startups",
      title: "Early-Stage Startups",
      icon: Rocket,
      headline: "One central command center before hiring a full operations team",
      description:
        "Keep founders focused on product and revenue. Track runway, monitor cash in/out, and maintain a tight grip on enterprise sales conversations without software sprawl.",
      benefits: [
        "Real-time burn rate and net cash flow insights",
        "Sales pipeline with multi-stage deal tracking",
        "Double-entry bookkeeping concepts built for founders",
        "Comprehensive export engine for investor updates",
      ],
    },
    {
      id: "smallbiz",
      title: "Growing Service Companies",
      icon: Store,
      headline: "Replace legacy software with modern connected intelligence",
      description:
        "Empower your staff to manage customer orders, track operational tasks, and view live daily receipts from anywhere on any modern device.",
      benefits: [
        "Simple, intuitive interface any employee can learn in minutes",
        "Receipt uploads and automatic category breakdowns",
        "Clear financial statements without accounting jargon",
        "Daily operational tasks and compliance reminders",
      ],
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
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
      name: "Professional",
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
        "Everything in Professional, plus:",
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
      name: "Enterprise",
      badge: "Unrestricted",
      description: "Enterprise control, custom integrations, and dedicated agent capacity.",
      monthlyPrice: billingCycle === "monthly" ? 7999 : 6399,
      annualPrice: 6399,
      features: [
        "Everything in Growth, plus:",
        "Unlimited Autonomous AI Agents",
        "Unlimited Team Members & Role Permissions",
        "Custom Workflow Automations",
        "Advanced Analytics & Multi-Format Export",
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
      a: "Traditional tools force you into silos: CRM in one app, invoicing in another, expenses in a third, and task management in a fourth. Nexora unifies all core domains into a single connected operating system, enriched with autonomous AI agents that proactively execute work across your data instead of just displaying tables.",
    },
    {
      q: "How do the AI Assistant and Autonomous Agents work?",
      a: "Nexora features two levels of intelligence: The interactive AI Assistant (an executive copilot you can question in plain English about revenue, margins, or lead priority) and Autonomous AI Agents (background routines that monitor business events, such as overdue invoices or stalled leads, and draft remedies for your approval).",
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
      a: "The pricing displayed is illustrative for our platform launch. You can test all tiers with fully functional mock previews and start immediately without requiring a credit card.",
    },
    {
      q: "Which types of businesses does Nexora support best?",
      a: "Nexora is optimized for service businesses, digital agencies, consultancies, solo professionals, high-growth tech startups, and small enterprises that want streamlined operations without bloated enterprise software.",
    },
  ];

  const currentSolution =
    solutions.find((s) => s.id === selectedSolution) || solutions[0];

  return (
    <div className="space-y-24 sm:space-y-32 pt-28 pb-20 selection:bg-[#EBF3FC] selection:text-[#2F80ED]">
      {/* =========================================================================
          SECTION 1: HERO SECTION
         ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Subtle Architectural Grid Pattern */}
        <div
          className="absolute inset-0 -top-28 -z-10 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #CBD5E1 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        {/* Announcement Pill with subtle hover motion */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3FC] border border-[#C4DEFA] text-[#2F80ED] text-xs font-semibold mb-8 shadow-2xs hover:bg-[#E1EEFC] transition-colors cursor-pointer"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#20B8A5] animate-pulse" />
          <span>Nexora Platform 2.0</span>
          <span className="text-[#96C3F6]">•</span>
          <span className="flex items-center gap-1 font-semibold text-[#174FA7]">
            Intelligent Business Management <ArrowRight className="w-3 h-3" />
          </span>
        </motion.div>

        {/* Main Headline with upward reveal */}
        <motion.h1
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#17212B] max-w-4xl mx-auto leading-[1.08]"
        >
          Your Business Runs Better <br className="hidden sm:inline" />
          <span className="text-[#2F80ED]">With Nexora.</span>
        </motion.h1>

        {/* Supporting Message */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-xl text-[#667482] max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Manage customers, close deals, track finances and run daily operations from one intelligent workspace.
        </motion.p>

        {/* Primary & Secondary CTAs with micro-interaction */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <Link href="/signup">
            <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="dark"
                size="lg"
                className="w-full sm:w-auto px-8 text-sm font-semibold shadow-xs"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Get Started Free
              </Button>
            </motion.div>
          </Link>
          <Link href="/app">
            <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 text-sm font-medium border-[#E3E9EF] hover:bg-[#F7F9FB] text-[#17212B]"
              >
                Explore Nexora
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-6 text-xs text-[#667482]"
        >
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#20B8A5]" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#20B8A5]" />
            <span>Interactive workspace preview</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#20B8A5]" />
            <span>Setup in under 60 seconds</span>
          </div>
        </motion.div>

        {/* High-Precision Dashboard Preview with subtle entrance */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30, scale: shouldReduceMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-16"
        >
          <DashboardPreview />
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 2: PROBLEM VS SOLUTION (ASYMMETRICAL COMPARISON)
         ========================================================================= */}
      <motion.section
        id="solution"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-70px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
      >
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="accent" size="sm" className="mb-3">
            Why Nexora
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#17212B]">
            Running a business across 6 different tools is quietly draining your time and profit.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#667482]">
            When deal notes, bank receipts, client contracts, and invoices live in disconnected silos, growth becomes administrative chaos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: The Friction of Disconnected Tools */}
          <div className="lg:col-span-5 rounded-2xl border border-[#E3E9EF] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E9EF] mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#EF4444] flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  The Fragmented Stack
                </span>
                <span className="text-xs text-[#667482]">Legacy Chaos</span>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {problems.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <motion.div
                      key={idx}
                      variants={cardItem}
                      whileHover={shouldReduceMotion ? {} : { x: 3 }}
                      className="flex items-start gap-3.5 p-3 rounded-xl bg-[#F7F9FB] border border-[#E3E9EF] transition-transform"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#17212B]">{p.title}</h4>
                        <p className="text-[11px] text-[#667482] mt-0.5 leading-snug">{p.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3E9EF] text-xs text-[#667482] flex items-center justify-between">
              <span>Average founder penalty:</span>
              <span className="font-semibold text-[#DC2626]">12+ hrs lost per week</span>
            </div>
          </div>

          {/* Right Column: The Nexora Standard (Unified Surface) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#101820] text-[#F7F9FB] p-6 sm:p-8 flex flex-col justify-between shadow-card border border-[#17232D]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#263746] mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#20B8A5] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  The Nexora Unified Standard
                </span>
                <span className="text-xs text-[#667482]">Connected Clarity</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#F7F9FB] leading-snug">
                One synchronized operating system where customer relationships, cashflow, and AI converge.
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#A0B0C0] leading-relaxed">
                Nexora replaces fragmented tools with one cohesive source of truth. From your first inbound lead to automated bank reconciliation and AI-drafted follow-ups.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-xl bg-[#17232D] border border-[#263746] hover:border-[#20B8A5]/40 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#20B8A5] mb-1">
                    <Target className="w-4 h-4" />
                    <span>Single Customer Record</span>
                  </div>
                  <p className="text-[11px] text-[#A0B0C0] leading-relaxed">
                    Contacts, active deals, quotes, and paid invoices link to one client profile.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#17232D] border border-[#263746] hover:border-[#2F80ED]/40 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#2F80ED] mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Non-Floating Point Ledger</span>
                  </div>
                  <p className="text-[11px] text-[#A0B0C0] leading-relaxed">
                    Precise integer-cent financial balance. Zero rounding errors, tax-ready.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#17232D] border border-[#263746] hover:border-[#20B8A5]/40 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#20B8A5] mb-1">
                    <Zap className="w-4 h-4" />
                    <span>Autonomous Workflow Agents</span>
                  </div>
                  <p className="text-[11px] text-[#A0B0C0] leading-relaxed">
                    Background agents track late payments and draft reminders for 1-click approval.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#17232D] border border-[#263746] hover:border-[#2F80ED]/40 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#2F80ED] mb-1">
                    <Bot className="w-4 h-4" />
                    <span>Plain English Copilot</span>
                  </div>
                  <p className="text-[11px] text-[#A0B0C0] leading-relaxed">
                    Query metrics and generate board-level summaries in seconds.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#263746] flex items-center justify-between text-xs text-[#A0B0C0]">
              <span>Result: Zero tool switching</span>
              <span className="font-semibold text-[#20B8A5]">100% Operational Transparency</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =========================================================================
          SECTION 3: CORE FEATURES (BENTO GRID ARCHITECTURE)
         ========================================================================= */}
      <motion.section
        id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-70px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
      >
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="accent" size="sm" className="mb-3">
            Core Modules
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#17212B]">
            Engineered for precision. Built for daily business velocity.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#667482]">
            Six interconnected engines that cover every facet of client acquisition, revenue tracking, and daily operations.
          </p>
        </div>

        {/* Bento Grid with staggered reveal and subtle hover depth */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* Bento Card 1: CRM & Pipeline (Large, 2 cols) */}
          <motion.div
            variants={cardItem}
            whileHover={shouldReduceMotion ? {} : { y: -3 }}
            className="md:col-span-2 rounded-2xl border border-[#E3E9EF] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-card transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBF3FC] text-[#2F80ED] flex items-center justify-center">
                  <Kanban className="w-5 h-5" />
                </div>
                <Badge variant="accent" size="sm">Sales Engine</Badge>
              </div>
              <h3 className="text-xl font-bold text-[#17212B]">CRM & High-Velocity Sales Pipeline</h3>
              <p className="text-xs sm:text-sm text-[#667482] mt-2 max-w-xl leading-relaxed">
                Visual Kanban board tracking active deals, lead qualification stages, projected contract values, and automated follow-up cadences.
              </p>

              {/* Mini Pipeline Preview */}
              <div className="mt-6 grid grid-cols-3 gap-3 p-3 rounded-xl bg-[#F7F9FB] border border-[#E3E9EF]">
                <div className="p-2.5 rounded-lg bg-white border border-[#E3E9EF] text-xs space-y-1">
                  <span className="text-[10px] text-[#667482] uppercase font-semibold">Discovery</span>
                  <div className="font-bold text-[#17212B]">Acme Corp</div>
                  <div className="text-[11px] text-[#2F80ED] font-semibold">₹3,50,000</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#E3E9EF] text-xs space-y-1">
                  <span className="text-[10px] text-[#667482] uppercase font-semibold">Proposal</span>
                  <div className="font-bold text-[#17212B]">Stark Media</div>
                  <div className="text-[11px] text-[#2F80ED] font-semibold">₹5,20,000</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#E3E9EF] text-xs space-y-1">
                  <span className="text-[10px] text-[#20B8A5] uppercase font-semibold">Negotiation</span>
                  <div className="font-bold text-[#17212B]">Wayne Labs</div>
                  <div className="text-[11px] text-[#20B8A5] font-semibold">₹8,00,000</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3E9EF] flex items-center justify-between text-xs text-[#2F80ED] font-semibold">
              <Link href="/sales/pipeline" className="hover:underline flex items-center gap-1">
                <span>Explore Sales Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[#667482] font-normal text-[11px]">360° Customer Profiles</span>
            </div>
          </motion.div>

          {/* Bento Card 2: Financial Ledger (1 col) */}
          <motion.div
            variants={cardItem}
            whileHover={shouldReduceMotion ? {} : { y: -3 }}
            className="rounded-2xl border border-[#E3E9EF] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-card transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F8F6] text-[#20B8A5] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <Badge variant="teal" size="sm">Financial Core</Badge>
              </div>
              <h3 className="text-lg font-bold text-[#17212B]">Double-Entry Ledger</h3>
              <p className="text-xs text-[#667482] mt-2 leading-relaxed">
                Integer-cent precision bookkeeping. Track categorized expenses, receipts, and cashflow without floating-point errors.
              </p>

              <div className="mt-5 p-3 rounded-xl bg-[#F7F9FB] border border-[#E3E9EF] space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#667482]">Net Operating Margin</span>
                  <span className="font-bold text-[#20B8A5]">70.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#667482]">Receivables Health</span>
                  <span className="font-bold text-[#17212B]">98.2%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3E9EF] text-xs text-[#20B8A5] font-semibold">
              <Link href="/finance/overview" className="hover:underline flex items-center gap-1">
                <span>View Financial Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Bento Card 3: Invoicing & Collections (1 col) */}
          <motion.div
            variants={cardItem}
            whileHover={shouldReduceMotion ? {} : { y: -3 }}
            className="rounded-2xl border border-[#E3E9EF] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-card transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBF3FC] text-[#2F80ED] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <Badge variant="accent" size="sm">Billing</Badge>
              </div>
              <h3 className="text-lg font-bold text-[#17212B]">Invoices & Quotations</h3>
              <p className="text-xs text-[#667482] mt-2 leading-relaxed">
                Create bespoke estimates, convert quotes into invoices with 1-click, and auto-sync received payments into ledger.
              </p>

              <div className="mt-5 p-3 rounded-xl bg-[#F7F9FB] border border-[#E3E9EF] text-xs space-y-1.5">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-[#17212B]">INV-2026-001</span>
                  <span className="text-[#20B8A5] font-semibold">Paid</span>
                </div>
                <div className="text-[10px] text-[#667482]">Auto-reconciled with income ledger</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3E9EF] text-xs text-[#2F80ED] font-semibold">
              <Link href="/finance/invoices" className="hover:underline flex items-center gap-1">
                <span>Manage Invoices</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Bento Card 4: Autonomous Agents (1 col) */}
          <motion.div
            variants={cardItem}
            whileHover={shouldReduceMotion ? {} : { y: -3 }}
            className="rounded-2xl border border-[#E3E9EF] bg-[#101820] text-[#F7F9FB] p-6 sm:p-8 flex flex-col justify-between shadow-card transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#17232D] text-[#20B8A5] flex items-center justify-center border border-[#263746]">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#17232D] text-[#20B8A5] border border-[#263746]">
                  Autonomous
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#F7F9FB]">Autonomous AI Agents</h3>
              <p className="text-xs text-[#A0B0C0] mt-2 leading-relaxed">
                Dedicated agents for sales follow-ups, overdue payment chasing, and ledger variance alerts running quietly in the background.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#263746] text-xs text-[#20B8A5] font-semibold">
              <Link href="/ai-agents" className="hover:underline flex items-center gap-1">
                <span>View 4 Active Agents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Bento Card 5: Daily Operations & Tasks (1 col) */}
          <motion.div
            variants={cardItem}
            whileHover={shouldReduceMotion ? {} : { y: -3 }}
            className="rounded-2xl border border-[#E3E9EF] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-card transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#17212B] flex items-center justify-center">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <Badge variant="secondary" size="sm">Operations</Badge>
              </div>
              <h3 className="text-lg font-bold text-[#17212B]">Tasks & Compliance</h3>
              <p className="text-xs text-[#667482] mt-2 leading-relaxed">
                Stay on top of corporate tax deadlines, client deliverables, and team assignments with interactive status and priority controls.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3E9EF] text-xs text-[#17212B] font-semibold">
              <Link href="/operations/tasks" className="hover:underline flex items-center gap-1">
                <span>Open Operations Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* =========================================================================
          SECTION 4: DEDICATED CRM SPOTLIGHT (#crm)
         ========================================================================= */}
      <motion.section
        id="crm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-70px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
      >
        <div className="rounded-3xl border border-[#E3E9EF] bg-white p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-[#E3E9EF]">
            <div className="space-y-2">
              <Badge variant="accent" size="sm">CRM & Relationships</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
                Close deals faster with a visual, high-velocity sales pipeline.
              </h2>
              <p className="text-xs sm:text-sm text-[#667482] max-w-2xl leading-relaxed">
                Organize incoming inquiries, assign deal values, track stage progression, and never drop another follow-up.
              </p>
            </div>
            <Link href="/sales/leads">
              <Button variant="dark" size="md">
                Launch CRM Workspace
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-8">
            <div className="p-4 rounded-xl bg-[#F7F9FB] border border-[#E3E9EF] space-y-2">
              <span className="text-[11px] font-semibold text-[#667482] uppercase">New Inquiries</span>
              <div className="text-xl font-bold text-[#17212B]">12 Leads</div>
              <p className="text-[11px] text-[#667482]">Average response time under 15 minutes.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F9FB] border border-[#E3E9EF] space-y-2">
              <span className="text-[11px] font-semibold text-[#667482] uppercase">Active Proposals</span>
              <div className="text-xl font-bold text-[#2F80ED]">₹18,50,000</div>
              <p className="text-[11px] text-[#667482]">6 proposals under client review.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F9FB] border border-[#E3E9EF] space-y-2">
              <span className="text-[11px] font-semibold text-[#667482] uppercase">Win Rate</span>
              <div className="text-xl font-bold text-[#20B8A5]">42.8%</div>
              <p className="text-[11px] text-[#667482]">+8.4% improvement after follow-up automation.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F9FB] border border-[#E3E9EF] space-y-2">
              <span className="text-[11px] font-semibold text-[#667482] uppercase">Average Cycle</span>
              <div className="text-xl font-bold text-[#17212B]">14.2 Days</div>
              <p className="text-[11px] text-[#667482]">From first discovery call to signed contract.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =========================================================================
          SECTION 5: DEDICATED FINANCE & INVOICING SPOTLIGHT (#finance)
         ========================================================================= */}
      <motion.section
        id="finance"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-70px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
      >
        <div className="rounded-3xl border border-[#E3E9EF] bg-[#101820] text-[#F7F9FB] p-8 sm:p-12 shadow-card">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-[#263746]">
            <div className="space-y-2">
              <Badge variant="teal" size="sm">Financial Architecture</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F7F9FB]">
                Complete financial clarity without accounting headaches.
              </h2>
              <p className="text-xs sm:text-sm text-[#A0B0C0] max-w-2xl leading-relaxed">
                Nexora replaces manual spreadsheets with real double-entry records, instant invoice issuance, and live cashflow forecasting.
              </p>
            </div>
            <Link href="/finance/invoices">
              <Button variant="primary" size="md" className="bg-[#2F80ED] hover:bg-[#1E65D0]">
                Explore Invoicing
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="p-5 rounded-2xl bg-[#17232D] border border-[#263746] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#101820] flex items-center justify-center text-[#20B8A5]">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#F7F9FB]">1-Click Invoice Generation</h4>
              <p className="text-xs text-[#A0B0C0] leading-relaxed">
                Generate professional PDF invoices with accurate tax calculations, discount allocations, and client payment links in seconds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#17232D] border border-[#263746] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#101820] flex items-center justify-center text-[#2F80ED]">
                <CreditCard className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#F7F9FB]">Auto-Reconciling Payments</h4>
              <p className="text-xs text-[#A0B0C0] leading-relaxed">
                Recording a payment automatically closes invoice balances and posts an immediate credit entry to your business income ledger.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#17232D] border border-[#263746] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#101820] flex items-center justify-center text-[#20B8A5]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#F7F9FB]">Tax & Runway Visibility</h4>
              <p className="text-xs text-[#A0B0C0] leading-relaxed">
                Always know your net profit, operating burn rate, and pending tax liability before end of month arrives.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =========================================================================
          SECTION 6: AI INTELLIGENCE SIMULATION (#ai)
         ========================================================================= */}
      <motion.section
        id="ai"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-70px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="accent" size="sm" className="mb-3">
            Intelligent Copilot & Autonomous Agents
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#17212B]">
            Ask questions. Delegate workflows. Protect revenue.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#667482]">
            Experience how the Nexora AI Assistant understands real business metrics and converts data into immediate, revenue-protecting actions.
          </p>
        </div>

        {/* Live Interactive Simulation Widget */}
        <AIChatSimulation />
      </motion.section>

      {/* =========================================================================
          SECTION 7: HOW NEXORA WORKS (4-STEP TIMELINE)
         ========================================================================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-70px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="secondary" size="sm" className="mb-3">
            Simple 4-Step Architecture
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#17212B]">
            From administrative chaos to complete operational clarity.
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 relative"
        >
          {[
            {
              step: "01",
              title: "Create Your Entity",
              description: "Configure your business name, currency, tax preference, and brand profile in under 60 seconds.",
            },
            {
              step: "02",
              title: "Organize Clients & Leads",
              description: "Import active clients, open proposals, and your standard service pricing catalog.",
            },
            {
              step: "03",
              title: "Run Day-to-Day Operations",
              description: "Issue professional invoices, log expenses, and assign project tasks from one central interface.",
            },
            {
              step: "04",
              title: "Let AI Work in Background",
              description: "Autonomous agents monitor payment deadlines, summarize cash flow, and draft personalized follow-ups.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardItem}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              className="rounded-2xl border border-[#E3E9EF] bg-white p-6 shadow-2xs relative flex flex-col justify-between transition-all"
            >
              <div>
                <div className="text-2xl font-bold text-[#2F80ED] font-mono mb-3">
                  {item.step}
                </div>
                <h3 className="text-sm font-bold text-[#17212B] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#667482] leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#E3E9EF] flex items-center gap-1.5 text-[11px] text-[#20B8A5] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero configuration friction</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* =========================================================================
          SECTION 8: SOLUTIONS BY INDUSTRY (#solutions)
         ========================================================================= */}
      <motion.section
        id="solutions"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-70px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="accent" size="sm" className="mb-3">
            Tailored Solutions
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#17212B]">
            Engineered for every stage of modern business.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#667482]">
            Whether you are a solo consultant or an expanding company with 25 employees, Nexora adapts to your operational rhythm.
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
                  ? "bg-[#101820] text-[#F7F9FB] shadow-xs"
                  : "bg-white border border-[#E3E9EF] text-[#667482] hover:bg-[#F7F9FB] hover:text-[#17212B]"
              )}
            >
              {sol.title}
            </button>
          ))}
        </div>

        {/* Selected Solution Display Card with cross-fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSolution.id}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="rounded-3xl border border-[#E3E9EF] bg-white p-6 sm:p-10 shadow-sm max-w-4xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E9EF]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="accent" size="sm">Tailored for {currentSolution.title}</Badge>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                  {currentSolution.headline}
                </h3>
              </div>
              <Link href="/app">
                <Button variant="dark" size="sm">
                  Explore Workflow
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div>
                <p className="text-xs sm:text-sm text-[#667482] leading-relaxed">
                  {currentSolution.description}
                </p>
              </div>
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#667482] uppercase tracking-wider block">
                  Key Platform Capabilities
                </span>
                {currentSolution.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#17212B]">
                    <CheckCircle2 className="w-4 h-4 text-[#20B8A5] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* =========================================================================
          SECTION 9: PRICING PLANS (#pricing)
         ========================================================================= */}
      <motion.section
        id="pricing"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-70px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
      >
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="accent" size="sm" className="mb-3">
            Transparent Pricing
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#17212B]">
            Simple, predictable plans that scale with your growth.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#667482]">
            Transparent pricing for planning purposes. Start free today without a credit card.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-6 inline-flex items-center gap-3 p-1 rounded-full bg-[#F0F4F8] border border-[#E3E9EF] text-xs">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-4 py-1.5 rounded-full font-medium transition-all",
                billingCycle === "monthly"
                  ? "bg-white text-[#17212B] shadow-2xs font-semibold"
                  : "text-[#667482] hover:text-[#17212B]"
              )}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "px-4 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5",
                billingCycle === "annual"
                  ? "bg-white text-[#17212B] shadow-2xs font-semibold"
                  : "text-[#667482] hover:text-[#17212B]"
              )}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-[#E8F8F6] text-[#137A6D] px-2 py-0.5 rounded-full font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid with hover elevation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pricingPlans.map((plan) => {
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.name}
                variants={cardItem}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                className={cn(
                  "rounded-2xl p-6 flex flex-col justify-between transition-all relative border",
                  isPopular
                    ? "bg-[#101820] text-[#F7F9FB] border-[#17232D] shadow-xl ring-1 ring-[#20B8A5]/30"
                    : "bg-white text-[#17212B] border-[#E3E9EF] shadow-2xs hover:shadow-card"
                )}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="teal" size="sm" className="shadow-xs px-3 font-semibold">
                      Most Popular Tier
                    </Badge>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={cn("text-base font-bold", isPopular ? "text-[#F7F9FB]" : "text-[#17212B]")}>
                      {plan.name}
                    </h3>
                    <Badge variant={isPopular ? "teal" : "secondary"} size="sm">
                      {plan.badge}
                    </Badge>
                  </div>

                  <p className={cn("text-xs min-h-[34px] leading-relaxed", isPopular ? "text-[#A0B0C0]" : "text-[#667482]")}>
                    {plan.description}
                  </p>

                  {/* Price Display */}
                  <div className={cn("my-5 pb-5 border-b", isPopular ? "border-[#263746]" : "border-[#E3E9EF]")}>
                    <div className="flex items-baseline gap-1">
                      <span className={cn("text-3xl font-extrabold tracking-tight", isPopular ? "text-[#F7F9FB]" : "text-[#17212B]")}>
                        {plan.monthlyPrice === 0 ? "₹0" : `₹${plan.monthlyPrice.toLocaleString()}`}
                      </span>
                      <span className={cn("text-xs font-medium", isPopular ? "text-[#A0B0C0]" : "text-[#667482]")}>
                        / month
                      </span>
                    </div>
                    <span className={cn("text-[10px] mt-1 block", isPopular ? "text-[#A0B0C0]" : "text-[#667482]")}>
                      {billingCycle === "annual" ? "Billed annually" : "Billed monthly"}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-6 text-xs">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className={cn("w-3.5 h-3.5 shrink-0 mt-0.5", isPopular ? "text-[#20B8A5]" : "text-[#2F80ED]")} />
                        <span className={isPopular ? "text-[#E1EEFC]" : "text-[#17212B]"}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Link href="/signup" className="w-full">
                  <Button
                    variant={isPopular ? "primary" : "outline"}
                    size="md"
                    className={cn(
                      "w-full justify-center text-xs font-semibold",
                      isPopular
                        ? "bg-[#2F80ED] hover:bg-[#1E65D0] text-white shadow-xs"
                        : "border-[#E3E9EF] text-[#17212B] hover:bg-[#F7F9FB]"
                    )}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* =========================================================================
          SECTION 10: FREQUENTLY ASKED QUESTIONS (#faq)
         ========================================================================= */}
      <motion.section
        id="faq"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-70px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-28"
      >
        <div className="text-center mb-12">
          <Badge variant="secondary" size="sm" className="mb-3">
            Got Questions?
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#17212B]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-[#667482]">
            Everything you need to know about Nexora, our AI capabilities, and data security.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-2xl border bg-white overflow-hidden transition-colors shadow-2xs",
                  isOpen ? "border-[#2F80ED]" : "border-[#E3E9EF]"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-[#17212B] hover:text-[#2F80ED] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-[#667482] shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180 text-[#2F80ED]"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#667482] leading-relaxed border-t border-[#E3E9EF] pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* =========================================================================
          SECTION 11: FINAL CALL TO ACTION
         ========================================================================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-70px" }}
        variants={fadeInUp}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="rounded-3xl bg-[#101820] text-[#F7F9FB] p-8 sm:p-14 lg:p-20 text-center relative overflow-hidden shadow-2xl border border-[#17232D]">
          {/* Subtle architectural grid lines */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, #2F80ED 1px, transparent 1px), linear-gradient(to bottom, #2F80ED 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#17232D] text-[#20B8A5] border border-[#263746]">
              <Sparkles className="w-3.5 h-3.5" />
              Start Your Free Workspace Today
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-[#F7F9FB]">
              Everything Your Business Needs. <br className="hidden sm:inline" />
              Finally, Together.
            </h2>

            <p className="text-[#A0B0C0] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Join modern founders, agency owners, and growing service teams who have replaced fragmented tools with Nexora&apos;s intelligent business operating system.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup">
                <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto px-8 bg-[#2F80ED] hover:bg-[#1E65D0] text-white shadow-xs font-semibold"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Get Started Free
                  </Button>
                </motion.div>
              </Link>
              <Link href="/app">
                <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-8 bg-[#17232D] border-[#263746] text-[#F7F9FB] hover:bg-[#202E3B] hover:text-white"
                  >
                    Explore Demo App
                  </Button>
                </motion.div>
              </Link>
            </div>

            <div className="pt-2 text-xs text-[#667482]">
              No credit card required • Instant access to mock workspace
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
