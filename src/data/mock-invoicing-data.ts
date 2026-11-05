import { Invoice, Quotation, PaymentRecord } from "@/types/invoicing";

export const initialInvoices: Invoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "INV-2024-001",
    customerId: "cust-1",
    customerName: "Pinnacle Media Group",
    customerEmail: "vikram@pinnaclemedia.in",
    customerAddress: "402 Nariman Point, Express Towers, Mumbai, MH 400021",
    customerTaxId: "27AABCP1234F1Z8",
    issueDate: "2024-10-01",
    dueDate: "2024-10-31",
    items: [
      {
        id: "item-101",
        description: "Enterprise SaaS Growth Retainer - October 2024",
        quantity: 1,
        unitPriceCents: 35000000, // ₹3,50,000.00
        amountCents: 35000000,
      },
      {
        id: "item-102",
        description: "Custom AI Content Pipeline Integration",
        quantity: 20,
        unitPriceCents: 450000, // ₹4,500.00/hr
        amountCents: 9000000, // ₹90,000.00
      },
    ],
    subtotalCents: 44000000,
    discountPercent: 5,
    discountCents: 2200000, // ₹22,000.00 discount
    taxPercent: 18,
    taxCents: 7524000, // 18% of (44000000 - 2200000) = 75,240.00
    totalCents: 49324000, // ₹4,93,240.00
    amountPaidCents: 49324000,
    amountDueCents: 0,
    status: "paid",
    currency: "INR",
    notes: "Monthly retainer and integration hours for October. Thank you for your partnership!",
    terms: "Payment received in full via HDFC Bank Wire Transfer.",
    paymentInstructions: {
      bankName: "HDFC Bank Ltd.",
      accountName: "Nexora Technologies Pvt Ltd",
      accountNumber: "50200088921832",
      routingCode: "HDFC0000128",
      upiId: "nexora@hdfcbank",
    },
    createdAt: "2024-10-01T09:00:00Z",
    updatedAt: "2024-10-15T14:30:00Z",
  },
  {
    id: "inv-002",
    invoiceNumber: "INV-2024-002",
    customerId: "cust-2",
    customerName: "Apex Retail Brands",
    customerEmail: "ananya@apexretail.com",
    customerAddress: "Sector 18, Cyber City Phase 2, Gurugram, HR 122002",
    customerTaxId: "06AAICA5432G1Z3",
    issueDate: "2024-10-05",
    dueDate: "2024-10-25", // Overdue!
    items: [
      {
        id: "item-201",
        description: "Omnichannel Customer Experience Audit & Design",
        quantity: 1,
        unitPriceCents: 18000000, // ₹1,80,000.00
        amountCents: 18000000,
      },
      {
        id: "item-202",
        description: "Executive Team Training Workshop (2 Days)",
        quantity: 2,
        unitPriceCents: 3500000, // ₹35,000.00
        amountCents: 7000000, // ₹70,000.00
      },
    ],
    subtotalCents: 25000000,
    discountPercent: 0,
    discountCents: 0,
    taxPercent: 18,
    taxCents: 4500000, // ₹45,000.00
    totalCents: 29500000, // ₹2,95,000.00
    amountPaidCents: 0,
    amountDueCents: 29500000,
    status: "overdue",
    currency: "INR",
    notes: "Please remit payment at your earliest convenience to avoid service interruption.",
    terms: "Net 20 days. 2% interest per month applies to overdue balances.",
    paymentInstructions: {
      bankName: "HDFC Bank Ltd.",
      accountName: "Nexora Technologies Pvt Ltd",
      accountNumber: "50200088921832",
      routingCode: "HDFC0000128",
      upiId: "nexora@hdfcbank",
    },
    createdAt: "2024-10-05T10:15:00Z",
    updatedAt: "2024-10-26T00:00:00Z",
  },
  {
    id: "inv-003",
    invoiceNumber: "INV-2024-003",
    customerId: "cust-3",
    customerName: "Orbit Global Technologies",
    customerEmail: "david.chen@orbitglobal.io",
    customerAddress: "100 California Street, Suite 800, San Francisco, CA 94111",
    customerTaxId: "US-EIN-94-2849102",
    issueDate: "2024-10-12",
    dueDate: "2024-11-12",
    items: [
      {
        id: "item-301",
        description: "Cloud Architecture Refactor & Performance Optimization",
        quantity: 1,
        unitPriceCents: 22000000, // ₹2,20,000.00
        amountCents: 22000000,
      },
      {
        id: "item-302",
        description: "Database Partitioning & Latency Tuning",
        quantity: 1,
        unitPriceCents: 8000000, // ₹80,000.00
        amountCents: 8000000,
      },
    ],
    subtotalCents: 30000000,
    discountPercent: 10,
    discountCents: 3000000, // ₹30,000.00
    taxPercent: 18,
    taxCents: 4860000, // ₹48,600.00
    totalCents: 31860000, // ₹3,18,600.00
    amountPaidCents: 15930000, // ₹1,59,300.00 (50% Milestone 1 paid)
    amountDueCents: 15930000,
    status: "partially_paid",
    currency: "INR",
    notes: "Milestone 1 deposit paid. Milestone 2 balance due upon final production deployment.",
    terms: "50% upfront deposit, 50% net 30 days after milestone completion.",
    paymentInstructions: {
      bankName: "HDFC Bank Ltd.",
      accountName: "Nexora Technologies Pvt Ltd",
      accountNumber: "50200088921832",
      routingCode: "HDFC0000128",
      upiId: "nexora@hdfcbank",
    },
    createdAt: "2024-10-12T11:45:00Z",
    updatedAt: "2024-10-16T16:20:00Z",
  },
  {
    id: "inv-004",
    invoiceNumber: "INV-2024-004",
    customerId: "cust-4",
    customerName: "BlueSky Logistics",
    customerEmail: "priya@blueskylogistics.com",
    customerAddress: "MIDC Andheri East, Mumbai, MH 400093",
    customerTaxId: "27AAGCB9876H1ZT",
    issueDate: "2024-10-20",
    dueDate: "2024-11-20",
    items: [
      {
        id: "item-401",
        description: "Fleet Telematics & Route Optimization Dashboard",
        quantity: 1,
        unitPriceCents: 17500000, // ₹1,75,000.00
        amountCents: 17500000,
      },
    ],
    subtotalCents: 17500000,
    discountPercent: 0,
    discountCents: 0,
    taxPercent: 18,
    taxCents: 3150000, // ₹31,500.00
    totalCents: 20650000, // ₹2,06,500.00
    amountPaidCents: 0,
    amountDueCents: 20650000,
    status: "sent",
    currency: "INR",
    notes: "Phase 1 deliverable accepted. Invoiced per contract agreement #BSL-2024-4.",
    terms: "Net 30 days from date of invoice.",
    paymentInstructions: {
      bankName: "HDFC Bank Ltd.",
      accountName: "Nexora Technologies Pvt Ltd",
      accountNumber: "50200088921832",
      routingCode: "HDFC0000128",
      upiId: "nexora@hdfcbank",
    },
    createdAt: "2024-10-20T14:00:00Z",
    updatedAt: "2024-10-20T14:15:00Z",
  },
  {
    id: "inv-005",
    invoiceNumber: "INV-2024-005",
    customerId: "cust-5",
    customerName: "Zenith Software Labs",
    customerEmail: "marcus@zenithsoftware.dev",
    customerAddress: "Austin Tech Hub, 500 Congress Ave, Austin, TX 78701",
    customerTaxId: "US-EIN-74-1298401",
    issueDate: "2024-10-28",
    dueDate: "2024-11-28",
    items: [
      {
        id: "item-501",
        description: "Mobile App Design System & Figma Tokens",
        quantity: 1,
        unitPriceCents: 12000000, // ₹1,20,000.00
        amountCents: 12000000,
      },
    ],
    subtotalCents: 12000000,
    discountPercent: 0,
    discountCents: 0,
    taxPercent: 0,
    taxCents: 0,
    totalCents: 12000000,
    amountPaidCents: 0,
    amountDueCents: 12000000,
    status: "draft",
    currency: "INR",
    notes: "Draft prepared for upcoming design handoff sprint.",
    terms: "Payment upon final component delivery approval.",
    paymentInstructions: {
      bankName: "HDFC Bank Ltd.",
      accountName: "Nexora Technologies Pvt Ltd",
      accountNumber: "50200088921832",
      routingCode: "HDFC0000128",
      upiId: "nexora@hdfcbank",
    },
    createdAt: "2024-10-28T16:30:00Z",
    updatedAt: "2024-10-28T16:30:00Z",
  },
  {
    id: "inv-006",
    invoiceNumber: "INV-2024-006",
    customerId: "cust-6",
    customerName: "Redwood Hospitality",
    customerEmail: "karan@redwoodhotels.in",
    customerAddress: "12 Marine Drive, Fort, Mumbai, MH 400001",
    customerTaxId: "27AABCR6543M1Z2",
    issueDate: "2024-09-15",
    dueDate: "2024-10-15", // Overdue!
    items: [
      {
        id: "item-601",
        description: "Guest Concierge Mobile App Maintenance",
        quantity: 3,
        unitPriceCents: 4500000, // ₹45,000.00
        amountCents: 13500000, // ₹1,35,000.00
      },
    ],
    subtotalCents: 13500000,
    discountPercent: 0,
    discountCents: 0,
    taxPercent: 18,
    taxCents: 2430000, // ₹24,300.00
    totalCents: 15930000, // ₹1,59,300.00
    amountPaidCents: 0,
    amountDueCents: 15930000,
    status: "overdue",
    currency: "INR",
    notes: "Overdue notice dispatched. Please remit payment immediately.",
    terms: "Net 30 days. Late payment penalty applied.",
    paymentInstructions: {
      bankName: "HDFC Bank Ltd.",
      accountName: "Nexora Technologies Pvt Ltd",
      accountNumber: "50200088921832",
      routingCode: "HDFC0000128",
      upiId: "nexora@hdfcbank",
    },
    createdAt: "2024-09-15T09:00:00Z",
    updatedAt: "2024-10-16T08:00:00Z",
  },
  {
    id: "inv-007",
    invoiceNumber: "INV-2024-007",
    customerId: "cust-7",
    customerName: "Nordic Clean Energy",
    customerEmail: "elena@nordicenergy.se",
    customerAddress: "Kungsgatan 44, Stockholm, Sweden 111 35",
    customerTaxId: "SE-556123-4567",
    issueDate: "2024-10-18",
    dueDate: "2024-11-18",
    items: [
      {
        id: "item-701",
        description: "Solar Array IoT Telemetry Ingestion Engine",
        quantity: 1,
        unitPriceCents: 48000000, // ₹4,80,000.00
        amountCents: 48000000,
      },
      {
        id: "item-702",
        description: "Dashboard Realtime WebSockets Cluster Setup",
        quantity: 1,
        unitPriceCents: 12000000, // ₹1,20,000.00
        amountCents: 12000000,
      },
    ],
    subtotalCents: 60000000,
    discountPercent: 5,
    discountCents: 3000000,
    taxPercent: 18,
    taxCents: 10260000, // 18% of 57000000 = ₹1,02,600.00
    totalCents: 67260000, // ₹6,72,600.00
    amountPaidCents: 67260000,
    amountDueCents: 0,
    status: "paid",
    currency: "INR",
    notes: "Full payment received with international wire clearance.",
    terms: "Net 30 days. Paid via SWIFT transfer.",
    paymentInstructions: {
      bankName: "HDFC Bank Ltd.",
      accountName: "Nexora Technologies Pvt Ltd",
      accountNumber: "50200088921832",
      routingCode: "HDFC0000128",
      upiId: "nexora@hdfcbank",
    },
    createdAt: "2024-10-18T10:00:00Z",
    updatedAt: "2024-10-29T11:20:00Z",
  },
];

export const initialQuotations: Quotation[] = [
  {
    id: "quote-001",
    quoteNumber: "EST-2024-001",
    customerId: "cust-8",
    customerName: "Kavya FinTech Solutions",
    customerEmail: "sameer@kavyafintech.com",
    issueDate: "2024-10-22",
    expiryDate: "2024-11-22",
    items: [
      {
        id: "qitem-1",
        description: "Core Banking Open Banking API Gateway Integration",
        quantity: 1,
        unitPriceCents: 55000000, // ₹5,50,000.00
        amountCents: 55000000,
      },
      {
        id: "qitem-2",
        description: "PCI-DSS Security Compliance & Encryption Audit",
        quantity: 1,
        unitPriceCents: 18000000, // ₹1,80,000.00
        amountCents: 18000000,
      },
    ],
    subtotalCents: 73000000,
    discountPercent: 5,
    discountCents: 3650000,
    taxPercent: 18,
    taxCents: 12483000,
    totalCents: 81833000, // ₹8,18,330.00
    status: "sent",
    notes: "Quotation includes 90 days complimentary post-launch bug triage.",
    terms: "Estimate valid for 30 calendar days from issue date.",
    createdAt: "2024-10-22T10:00:00Z",
    updatedAt: "2024-10-22T10:00:00Z",
  },
  {
    id: "quote-002",
    quoteNumber: "EST-2024-002",
    customerId: "cust-9",
    customerName: "Aura Luxury Apparel",
    customerEmail: "tara@auraluxury.in",
    issueDate: "2024-10-25",
    expiryDate: "2024-11-25",
    items: [
      {
        id: "qitem-3",
        description: "Headless E-Commerce Shopify Plus Frontend Experience",
        quantity: 1,
        unitPriceCents: 42000000, // ₹4,20,000.00
        amountCents: 42000000,
      },
      {
        id: "qitem-4",
        description: "3D Garment Configurator & Virtual Try-On Canvas",
        quantity: 1,
        unitPriceCents: 25000000, // ₹2,50,000.00
        amountCents: 25000000,
      },
    ],
    subtotalCents: 67000000,
    discountPercent: 10,
    discountCents: 6700000,
    taxPercent: 18,
    taxCents: 10854000,
    totalCents: 71154000, // ₹7,11,540.00
    status: "accepted", // Ready to convert to Invoice!
    notes: "Client signed off on technical proposal on Oct 28. Ready for invoice generation.",
    terms: "50% upfront deposit upon invoice issuance.",
    createdAt: "2024-10-25T11:30:00Z",
    updatedAt: "2024-10-28T15:00:00Z",
  },
  {
    id: "quote-003",
    quoteNumber: "EST-2024-003",
    customerId: "cust-10",
    customerName: "Crown Capital Advisors",
    customerEmail: "arthur@crowncap.com",
    issueDate: "2024-09-10",
    expiryDate: "2024-10-10", // Expired
    items: [
      {
        id: "qitem-5",
        description: "Private Equity Portfolio Analytics SaaS Portal",
        quantity: 1,
        unitPriceCents: 85000000, // ₹8,50,000.00
        amountCents: 85000000,
      },
    ],
    subtotalCents: 85000000,
    discountPercent: 0,
    discountCents: 0,
    taxPercent: 18,
    taxCents: 15300000,
    totalCents: 100300000, // ₹10,03,000.00
    status: "expired",
    notes: "Client requested renegotiation on scope for Q1 2025.",
    terms: "Estimate expired after 30 days.",
    createdAt: "2024-09-10T09:00:00Z",
    updatedAt: "2024-10-11T00:00:00Z",
  },
  {
    id: "quote-004",
    quoteNumber: "EST-2024-004",
    customerId: "cust-11",
    customerName: "UrbanNest Coworking",
    customerEmail: "neha@urbannest.in",
    issueDate: "2024-10-30",
    expiryDate: "2024-11-30",
    items: [
      {
        id: "qitem-6",
        description: "Automated Desk & Meeting Room Booking System",
        quantity: 1,
        unitPriceCents: 28000000, // ₹2,80,000.00
        amountCents: 28000000,
      },
    ],
    subtotalCents: 28000000,
    discountPercent: 0,
    discountCents: 0,
    taxPercent: 18,
    taxCents: 5040000,
    totalCents: 33040000,
    status: "draft",
    notes: "Internal draft reviewing hardware badge reader requirements.",
    terms: "Standard Nexora professional service agreement.",
    createdAt: "2024-10-30T14:00:00Z",
    updatedAt: "2024-10-30T14:00:00Z",
  },
];

export const initialPayments: PaymentRecord[] = [
  {
    id: "pay-001",
    paymentNumber: "PAY-2024-001",
    invoiceId: "inv-001",
    invoiceNumber: "INV-2024-001",
    customerId: "cust-1",
    customerName: "Pinnacle Media Group",
    amountCents: 49324000, // ₹4,93,240.00
    paymentDate: "2024-10-15",
    paymentMethod: "bank_transfer",
    reference: "UTR-HDFC-9938210492",
    notes: "Wire transfer processed through corporate net banking.",
    status: "completed",
    createdAt: "2024-10-15T14:30:00Z",
  },
  {
    id: "pay-002",
    paymentNumber: "PAY-2024-002",
    invoiceId: "inv-003",
    invoiceNumber: "INV-2024-003",
    customerId: "cust-3",
    customerName: "Orbit Global Technologies",
    amountCents: 15930000, // ₹1,59,300.00
    paymentDate: "2024-10-16",
    paymentMethod: "stripe",
    reference: "ch_3Nzk41K2jA8390L",
    notes: "50% upfront retainer via Stripe corporate card.",
    status: "completed",
    createdAt: "2024-10-16T16:20:00Z",
  },
  {
    id: "pay-003",
    paymentNumber: "PAY-2024-003",
    invoiceId: "inv-007",
    invoiceNumber: "INV-2024-007",
    customerId: "cust-7",
    customerName: "Nordic Clean Energy",
    amountCents: 67260000, // ₹6,72,600.00
    paymentDate: "2024-10-29",
    paymentMethod: "bank_transfer",
    reference: "SWIFT-SEB-88392019",
    notes: "International SWIFT remittance cleared.",
    status: "completed",
    createdAt: "2024-10-29T11:20:00Z",
  },
];
