export type Category = "Full Stack" | "Mobile" | "AI" | "Systems";
export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  categories: Category[];
  stack: string[];
  repository: string;
  visual: "spectra" | "ran" | "loan" | "cafe" | "kiosk" | "erp";
  context: string;
  scope: string[];
  note: string;
  source: string;
  detailsReady?: boolean;
};
export const filters = [
  "All",
  "Full Stack",
  "Mobile",
  "AI",
  "Systems",
] as const;
const projectSummaries: Project[] = [
  {
    slug: "spectraleaf",
    detailsReady: true,
    name: "SpectraLeaf",
    subtitle: "Turning tea fermentation into a readable signal.",
    description:
      "An IoT tea fermentation project connecting monitoring interfaces, a mobile app, and a cloud-backed data pipeline.",
    categories: ["Full Stack", "Mobile", "Systems"],
    stack: [
      "Next.js",
      "TypeScript",
      "React Native",
      "Expo",
      "Node.js",
      "Express",
      "AWS SDK",
      "DynamoDB",
      "Amplify",
    ],
    repository: "https://github.com/cepdnaclk/e21-3yp-SPECTRA-LEAF",
    visual: "spectra",
    context:
      "A team project at the Department of Computer Engineering, University of Peradeniya.",
    scope: [
      "Web interfaces and a React Native mobile application present fermentation monitoring data.",
      "A Node.js and Express backend connects application requests with DynamoDB.",
      "The project explores how sensing and digital batch profiles can support tea fermentation monitoring.",
    ],
    note: "Team research prototype. My contribution covers the software platform; hardware and embedded development were part of the wider team project.",
    source: "Project details and screenshots supplied by Deshan Dinidu.",
  },
  {
    slug: "ran-technology",
    detailsReady: true,
    name: "RAN Technology",
    subtitle: "Computer shopping. Repair services. One connected place.",
    description:
      "A full-stack computer-products storefront connecting shopping, orders, repair bookings and quote requests.",
    categories: ["Full Stack", "Systems"],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "Node.js",
      "Express",
      "Supabase",
      "Cloudinary",
    ],
    repository: "https://github.com/deshandinidu2001/RAN-Technology-",
    visual: "ran",
    context:
      "An end-to-end computer-products storefront and repair-services platform.",
    scope: [
      "Product discovery, customer accounts, shopping carts, checkout and order management.",
      "Repair bookings, quotation requests, service statuses and shop administration.",
    ],
    note: "A substantial implementation with Vercel deployment configuration. Current live deployment and exact completion dates are not documented.",
    source: "Project details and screenshots supplied by Deshan Dinidu.",
  },
  {
    slug: "smartloan",
    detailsReady: true,
    name: "Smartloan BLMS",
    subtitle: "Loan management, with AI-assisted eligibility prediction.",
    description:
      "AI-assisted loan eligibility and risk prediction, connected to customer records, approvals and repayment management in a full-stack prototype.",
    categories: ["Full Stack", "AI", "Systems"],
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Prisma",
      "SQLite",
      "Python",
      "Flask",
      "scikit-learn",
    ],
    repository: "https://github.com/deshandinidu2001/Smartloan_BLMS",
    visual: "loan",
    context:
      "A functional local loan-management prototype for administrators and loan officers.",
    scope: [
      "Role-aware customer, KYC, application, approval and repayment workflows.",
      "An Express/Prisma backend and a separate Flask eligibility service connect the React interface to SQLite and experimental model outputs.",
    ],
    note: "A local prototype. Production hosting, model accuracy and real-customer outcomes have not been established.",
    source: "Project details and screenshots supplied by Deshan Dinidu.",
  },
  {
    slug: "gaming-cafe",
    name: "Gaming Café",
    subtitle: "One server. Every session connected.",
    description:
      "A Node.js server manages session timers and sends TCP/JSON lock and unlock commands to .NET 8 Windows clients.",
    categories: ["Systems", "Full Stack"],
    stack: ["Node.js", "TypeScript", ".NET 8", "TCP / JSON"],
    repository: "https://github.com/deshandinidu2001/game-cafe-new",
    visual: "cafe",
    context: "A client-server gaming café management system.",
    scope: [
      "The server tracks sessions and sends newline-delimited JSON commands over TCP.",
      "Windows clients register with the server and process lock, unlock, and heartbeat messages.",
      "The client connection service includes reconnect handling.",
    ],
    note: "The README states that session timers are held in memory and cleared by a server restart. It describes optional IP restrictions; this is not a claim of a security audit.",
    source: "Public repository README; reviewed 23 October 2026.",
  },
  {
    slug: "peraverse-kiosk",
    name: "Peraverse Kiosk",
    subtitle: "An event, always in view.",
    description:
      "A React and Vite digital signage display for PeraVerse, cycling through welcome, schedule, and event information.",
    categories: ["Systems"],
    stack: ["JavaScript", "React", "Vite", "CSS"],
    repository: "https://github.com/deshandinidu2001/Peraverse_Kiosk-main",
    visual: "kiosk",
    context:
      "Digital signage for a PeraVerse event at the Faculty of Engineering, University of Peradeniya.",
    scope: [
      "A display cycles through welcome, event schedule, and trending pages.",
      "The nested project README documents a React 18 and Vite application.",
      "The interface includes event information and a live clock.",
    ],
    note: "The README lists visitor and engagement displays. Their presence is not evidence of verified live analytics. TODO: Add actual screenshots and personal contribution notes.",
    source: "Nested Peraverse_Kiosk-main/README.md; reviewed 23 October 2026.",
  },
  {
    slug: "skill-erp",
    name: "Skill ERP",
    subtitle: "Many workflows. One connected project.",
    description:
      "A construction operations demo linking enquiries, estimates, quotations, projects, procurement, and accounting.",
    categories: ["Full Stack", "Systems"],
    stack: ["TypeScript", "Next.js", "React", "Supabase", "Tailwind CSS"],
    repository: "https://github.com/deshandinidu2001/skill-erp",
    visual: "erp",
    context: "A working construction ERP demo built with Next.js and Supabase.",
    scope: [
      "Linked workflows connect customer enquiries, QS estimates, quotations, and projects.",
      "Role-aware pages and API checks cover operational modules.",
      "Accounting views read posted journal lines rather than summing raw operational records.",
    ],
    note: "Working demo, not production-ready ERP. The README documents demo role selection, an external schema requirement, prototype actions, and non-atomic financial writes.",
    source: "Public repository README; reviewed 23 October 2026.",
  },
];
export const projects: Project[] = projectSummaries;
