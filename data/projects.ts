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
};
export const filters = [
  "All",
  "Full Stack",
  "Mobile",
  "AI",
  "Systems",
] as const;
export const projects: Project[] = [
  {
    slug: "spectraleaf",
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
    note: "Team project. This portfolio does not claim individual ownership of every component or measured improvements in tea quality. Artwork is a conceptual system study; real screenshots are still to be supplied.",
    source:
      "Public repository README and web, mobile, backend package manifests; reviewed 23 October 2026.",
  },
  {
    slug: "ran-technology",
    name: "RAN Technology",
    subtitle: "A TypeScript project, taking shape.",
    description:
      "A TypeScript project. A fuller write-up will follow when its scope and contribution notes are ready.",
    categories: [], // Scope is not documented well enough to assign a discipline yet.
    stack: ["TypeScript"],
    repository: "https://github.com/deshandinidu2001/RAN-Technology-",
    visual: "ran",
    context:
      "Personal repository. The public repository does not currently include a project README.",
    scope: [
      "The repository contains the ran-tech-shop application directory.",
      "TypeScript is the primary language reported by GitHub.",
    ],
    note: "TODO: Supply project scope, role, screenshots, and implementation notes. No business outcomes or deployment claims are made.",
    source:
      "GitHub repository metadata and root directory; reviewed 23 October 2026.",
  },
  {
    slug: "smartloan",
    name: "Smartloan BLMS",
    subtitle: "A JavaScript system in progress.",
    description:
      "A JavaScript project with frontend and backend directories. Project details are being documented.",
    categories: ["Full Stack", "Systems"],
    stack: ["JavaScript"],
    repository: "https://github.com/deshandinidu2001/Smartloan_BLMS",
    visual: "loan",
    context:
      "Personal repository. A project README was not available during content review.",
    scope: [
      "The public repository separates frontend and backend code.",
      "An ai-model directory is present; model behavior and results have not been verified.",
    ],
    note: "TODO: Supply scope, personal contribution, screenshots, and current status. Directory names alone are not evidence of completed AI functionality.",
    source:
      "GitHub repository metadata and root directory; reviewed 23 October 2026.",
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
