export type ProjectScreenshot = {
  src: string;
  width: number;
  height: number;
  label: string;
  alt: string;
  caption: string;
  format?: "mobile";
};
export type ProjectStudy = {
  role: string;
  period: string;
  status: string;
  audience: string;
  purpose: string;
  contribution: string;
  handwritten: string;
  features: { title: string; text: string }[];
  flow: { title: string; text: string }[];
  challenge: string;
  solution: string;
  outcomes: string[];
  boundary: string;
  technologies: { label: string; tools: string[] }[];
  screenshots: ProjectScreenshot[];
  websitePreview?: { src: string; width: number; height: number; alt: string };
  aiFeature?: {
    title: string;
    intro: string;
    inputs: string[];
    outputs: { label: string; text: string }[];
    service: string;
  };
  liveUrl?: string;
  liveLabel?: string;
};

export const projectStudies: Record<string, ProjectStudy> = {
  spectraleaf: {
    role: "Software platform development · team project",
    period: "April — September 2026",
    status: "Research prototype",
    audience: "Factory officers, factory managers and general managers",
    purpose:
      "Black-tea fermentation is often assessed through manual observation. SpectraLeaf connects temperature, humidity, colour and gas readings to individual batches, giving factory teams a shared view of the process as it happens.",
    contribution:
      "As part of the SpectraLeaf team at the University of Peradeniya, I designed and developed the software platform: backend APIs and data processing, the web dashboards, the React Native/Expo application, AWS and database integration, and the public project website. The wider team developed the sensing hardware and embedded system. My work also covered responsive interface design, documentation, galleries, project videos, and deployment configuration.",
    handwritten: "From readings to decisions.",
    features: [
      {
        title: "Live batch monitoring",
        text: "Temperature, humidity, colour and three gas-response channels are presented alongside batch identity and fermentation status.",
      },
      {
        title: "A view for each responsibility",
        text: "Factory officers monitor operations; factory managers review batches and prices; general managers see a factory-level overview.",
      },
      {
        title: "Fermentation controls",
        text: "Start and stop actions pass through the backend and synchronise device state through AWS IoT Device Shadow.",
      },
      {
        title: "History, quality and pricing",
        text: "Historical graphs, Good Leaf Percentage recording, batch prices and revenue summaries keep batch information connected.",
      },
      {
        title: "Mobile access",
        text: "An Expo application gives factory officers access to batch monitoring and controls, with light and dark interfaces.",
      },
      {
        title: "A public engineering record",
        text: "The project website brings together the architecture, experiments, testing, hardware, AI direction, gallery and team documentation.",
      },
    ],
    flow: [
      {
        title: "Sense",
        text: "Readings are linked to a device, factory, batch and timestamp.",
      },
      { title: "Transmit", text: "MQTT messages enter the AWS IoT pipeline." },
      {
        title: "Process",
        text: "Backend services validate readings and prepare application responses.",
      },
      {
        title: "Store",
        text: "DynamoDB holds time-series readings and batch summaries.",
      },
      {
        title: "Understand",
        text: "Web and mobile dashboards use REST APIs to display readings, history and controls.",
      },
    ],
    challenge:
      "Keeping the sensing system, AWS services, backend, web dashboard and mobile app consistent meant handling more than a stream of numbers. Batch identity, fermentation state and incomplete cloud responses all had to agree across the platform.",
    solution:
      "I used a common batch-linked data structure, validated incoming readings, organised DynamoDB keys and indexes, and prepared graph-ready API responses. Device-state synchronisation and fallback handling helped the interfaces remain useful when data was incomplete or temporarily unavailable.",
    outcomes: [
      "A connected backend, web dashboard, mobile application and documentation platform.",
      "Batch-linked readings and role-based views for prototype fermentation monitoring.",
      "Structured data that can support future calibration and machine-learning research.",
      "A public technical project website deployed through GitHub Pages.",
    ],
    boundary:
      "A working research prototype with laboratory experimentation and prototype validation. Factory-scale pilots, further sensor calibration, model training, automated alerts and commercial deployment remain future objectives.",
    technologies: [
      {
        label: "Web",
        tools: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Recharts",
          "Zustand",
        ],
      },
      {
        label: "Mobile",
        tools: ["React Native", "Expo", "TypeScript", "Zustand"],
      },
      {
        label: "Backend & data",
        tools: [
          "Node.js",
          "Express",
          "REST APIs",
          "Axios",
          "AWS SDK",
          "DynamoDB",
        ],
      },
      {
        label: "Cloud & identity",
        tools: [
          "AWS IoT Core",
          "Device Shadow",
          "Lambda",
          "API Gateway",
          "Amplify",
          "Cognito",
          "JWT",
          "GitHub Pages",
        ],
      },
    ],
    screenshots: [
      {
        src: "/images/SpectraLeaf/Factory_Officer_dashbord.png",
        width: 1917,
        height: 944,
        label: "Factory officer",
        alt: "SpectraLeaf factory officer dashboard with live readings, batch records and fermentation controls",
        caption:
          "The operational view brings live readings, batch status and fermentation controls into one dashboard.",
      },
      {
        src: "/images/SpectraLeaf/Factory_Manager_dashbord.png",
        width: 1919,
        height: 941,
        label: "Factory manager",
        alt: "SpectraLeaf factory manager dashboard showing batch history, Good Leaf Percentage and pricing",
        caption:
          "Factory managers review batch records, recorded quality values and pricing information.",
      },
      {
        src: "/images/SpectraLeaf/General_Manager_dashbord.png",
        width: 1919,
        height: 947,
        label: "General manager",
        alt: "SpectraLeaf general manager dashboard with a factory overview and revenue comparison chart",
        caption:
          "The general manager view gathers factory-level summaries for a broader operational picture.",
      },
      {
        src: "/images/SpectraLeaf/Login page.png",
        width: 1917,
        height: 946,
        label: "Role-based sign-in",
        alt: "SpectraLeaf sign-in screen with factory officer, factory manager and general manager role options",
        caption:
          "A shared entry point leads users into the interface for their factory responsibility.",
      },
      {
        src: "/images/SpectraLeaf/mobile_dashbord_light.jpeg",
        width: 812,
        height: 1599,
        label: "Mobile · light",
        alt: "SpectraLeaf mobile dashboard in light theme with a start fermentation action and batch status",
        caption: "Factory officer access in the light mobile interface.",
        format: "mobile",
      },
      {
        src: "/images/SpectraLeaf/mobile_dashbord_dark.jpeg",
        width: 812,
        height: 1599,
        label: "Mobile · dark",
        alt: "SpectraLeaf mobile dashboard in dark theme with fermentation controls and batch counts",
        caption: "The same workflow adapted to the dark mobile interface.",
        format: "mobile",
      },
    ],
    liveUrl: "https://cepdnaclk.github.io/e21-3yp-SPECTRA-LEAF/",
    liveLabel: "Visit the project website",
    websitePreview: {
      src: "/images/SpectraLeaf/project-website-preview.webp",
      width: 1440,
      height: 900,
      alt: "The public SpectraLeaf project website showing its tea-estate hero, project introduction and engineering navigation",
    },
  },
  smartloan: {
    role: "Full-stack development & AI loan-prediction integration",
    period: "2026",
    status: "Functional local prototype",
    audience: "Loan officers and financial-institution administrators",
    purpose:
      "Smartloan BLMS connects AI-assisted loan eligibility and risk prediction with the complete loan-management workflow. Loan officers review applicant finances, model outputs and repayment calculations in one place; administrators manage approvals, customer records, reports and configuration.",
    contribution:
      "I designed and implemented the React interface, Express APIs, Prisma database models, authentication and role-based access. I also integrated the Python/Flask prediction service with the loan application workflow, bringing eligibility estimates, risk indicators, EMI figures and recommendations into the officer’s interface. The wider implementation includes repayments, document handling and administration.",
    handwritten: "A prediction needs its context.",
    aiFeature: {
      title: "AI-assisted loan prediction.",
      intro:
        "Applicant financial details pass from the React interface through the authenticated Express API to a dedicated Python/Flask service. The scikit-learn and joblib service returns an eligibility prediction and risk assessment alongside loan calculations and recommendations, so the officer can review the result in context.",
      inputs: [
        "Monthly income",
        "Credit score",
        "Requested loan amount",
        "Loan duration",
        "Interest rate",
        "Existing monthly debt",
      ],
      service: "Python · Flask · scikit-learn · joblib",
      outputs: [
        {
          label: "Eligibility prediction",
          text: "A model-assisted estimate of the applicant’s loan eligibility.",
        },
        {
          label: "Risk indicator",
          text: "A risk score or level returned by the prediction service.",
        },
        {
          label: "EMI & repayment context",
          text: "Monthly instalment and repayment figures displayed alongside the prediction.",
        },
        {
          label: "Recommendations",
          text: "Supporting response details presented for review with the application.",
        },
      ],
    },
    features: [
      {
        title: "Role-aware access",
        text: "Administrators and loan officers sign in to dashboards and routes appropriate to their responsibilities.",
      },
      {
        title: "Customer and application records",
        text: "Customer profiles, KYC information, document uploads and loan applications stay connected through the approval process.",
      },
      {
        title: "Loan configuration",
        text: "Configurable loan types and interest rates support the application and EMI calculation workflow.",
      },
      {
        title: "Repayments and overdue tracking",
        text: "Payment schedules, EMI values, overdue balances and penalties provide a detailed view of an active loan.",
      },
      {
        title: "AI loan eligibility & risk prediction",
        text: "A dedicated Flask service connects scikit-learn model outputs to the loan application, returning eligibility, risk and recommendations alongside EMI calculations.",
      },
      {
        title: "Operational visibility",
        text: "Dashboard statistics, reports, notifications and activity logs help staff follow the state of the system.",
      },
    ],
    flow: [
      {
        title: "Sign in",
        text: "JWT authentication establishes the user’s role and permitted interface.",
      },
      {
        title: "Apply",
        text: "The React client sends authenticated customer and loan requests to Express.",
      },
      {
        title: "Validate & store",
        text: "Business rules are applied and Prisma reads or updates SQLite records.",
      },
      {
        title: "Assess",
        text: "Applicant data is sent to the Flask prediction service for eligibility outputs.",
      },
      {
        title: "Manage",
        text: "Approvals, repayments, notifications and reports reflect the updated loan state.",
      },
    ],
    challenge:
      "Loan calculations, repayment status, access permissions and model outputs had to stay consistent across a JavaScript application and a Python prediction service.",
    solution:
      "I separated the React frontend, Express/Prisma backend and Flask prediction API. Shared request and response contracts and role-aware routes kept responsibilities clear while connecting the application, repayment and assessment workflows.",
    outcomes: [
      "A working local loan-management implementation across React, Express and Flask.",
      "Connected customer, application, approval and repayment workflows.",
      "An integrated eligibility service presented alongside loan calculations and recommendations.",
      "Responsive administrator and loan-officer dashboards.",
    ],
    boundary:
      "This case study describes a local prototype. Production hosting, real-customer usage, model accuracy and measurable business outcomes have not been established.",
    technologies: [
      {
        label: "Frontend",
        tools: [
          "React",
          "Vite",
          "React Router",
          "Tailwind CSS",
          "Recharts",
          "Lucide React",
          "Axios",
        ],
      },
      {
        label: "Backend & data",
        tools: [
          "Node.js",
          "Express",
          "Prisma",
          "SQLite",
          "JWT",
          "bcrypt",
          "Multer",
        ],
      },
      {
        label: "AI service",
        tools: ["Python", "Flask", "scikit-learn", "joblib"],
      },
      { label: "Communications", tools: ["Nodemailer", "Twilio"] },
    ],
    screenshots: [
      {
        src: "/images/Smartloan BLMS/BLMS (3).png",
        width: 1916,
        height: 945,
        label: "AI loan prediction",
        alt: "Smartloan experimental eligibility screen with financial inputs, a prediction and repayment recommendations",
        caption:
          "The AI prediction interface combines applicant inputs with an eligibility estimate, risk indicator, EMI calculation and recommendations.",
      },
      {
        src: "/images/Smartloan BLMS/BLMS (8).png",
        width: 1918,
        height: 946,
        label: "Administrator overview",
        alt: "Smartloan administrator dashboard with portfolio figures, loan trends and recent activity",
        caption:
          "The administrator dashboard connects portfolio summaries, loan trends and recent activity.",
      },
      {
        src: "/images/Smartloan BLMS/BLMS (5).png",
        width: 1917,
        height: 943,
        label: "Loan officer",
        alt: "Smartloan loan-officer dashboard showing loan counts and recent application activity",
        caption:
          "Loan officers get a focused operational overview for their day-to-day work.",
      },
      {
        src: "/images/Smartloan BLMS/BLMS (4).png",
        width: 1917,
        height: 943,
        label: "Loan application",
        alt: "Smartloan application form with customer details, loan configuration and an eligibility action",
        caption:
          "The application workflow combines customer selection, loan terms and the eligibility check.",
      },
      {
        src: "/images/Smartloan BLMS/BLMS (2).png",
        width: 1918,
        height: 944,
        label: "Loan records",
        alt: "Smartloan loan records table with customer names, amounts, terms and approval statuses",
        caption:
          "A searchable loan register helps staff follow applications and their status.",
      },
      {
        src: "/images/Smartloan BLMS/BLMS (6).png",
        width: 1918,
        height: 943,
        label: "Repayment detail",
        alt: "Smartloan loan detail in dark theme with a repayment schedule, paid amounts and overdue entries",
        caption:
          "A detailed repayment schedule makes due, paid and overdue amounts visible for an individual loan.",
      },
      {
        src: "/images/Smartloan BLMS/BLMS (1).png",
        width: 1919,
        height: 947,
        label: "Notifications",
        alt: "Smartloan notification centre showing alerts for missed payments and application activity",
        caption:
          "The notification centre brings repayment alerts and communication tasks together.",
      },
      {
        src: "/images/Smartloan BLMS/BLMS (7).png",
        width: 1919,
        height: 944,
        label: "Sign-in",
        alt: "Smartloan welcome screen with administrator and loan-officer sign-in options",
        caption:
          "Separate role entry points introduce the loan-management workspace.",
      },
    ],
  },
  "ran-technology": {
    role: "Full-stack development · end to end",
    period: "2026",
    status: "Built implementation",
    audience: "Computer-product customers and repair-service staff",
    purpose:
      "RAN Technology brings computer shopping and repair requests into one website. Customers can browse products, build a cart or plan a PC, then book a repair or request a quote without moving to a separate service channel.",
    contribution:
      "I built the project end to end as the full-stack developer, including the customer-facing website, backend API, database integration and administration features. The work connected product discovery and checkout with a separate repair-booking and quotation workflow.",
    handwritten: "A storefront, with a workshop behind it.",
    features: [
      {
        title: "Product discovery",
        text: "Product browsing, filtering, reviews and PC build pages help customers explore computer products.",
      },
      {
        title: "Accounts and checkout",
        text: "Customer accounts, shopping carts and checkout connect browsing to an order.",
      },
      {
        title: "Order management",
        text: "The API creates orders and updates stock so purchase activity is reflected in the database.",
      },
      {
        title: "Repair bookings",
        text: "Customers choose a repair service and submit a booking for staff to manage.",
      },
      {
        title: "Quotes and follow-up",
        text: "Repair quote requests, booking statuses and reminders support the service workflow.",
      },
      {
        title: "Shop administration",
        text: "Administration features and contact-message handling give staff a way to manage the store and its requests.",
      },
    ],
    flow: [
      {
        title: "Explore",
        text: "Customers browse products or choose a computer repair service.",
      },
      {
        title: "Request",
        text: "The React client sends cart, order, booking or quotation actions to the API.",
      },
      {
        title: "Handle",
        text: "Express routes and controllers apply the relevant purchase or service workflow.",
      },
      {
        title: "Record",
        text: "Supabase stores orders, stock and service requests; Cloudinary holds product images.",
      },
      {
        title: "Follow through",
        text: "Staff manage orders, repair bookings and quote requests through the administration tools.",
      },
    ],
    challenge:
      "Product ordering and repair services share customer information, but they need different workflows and status changes. Both had to connect cleanly across the interface, API and database.",
    solution:
      "I organised the backend into routes and controllers, and used database migrations to support repair quotations, booking statuses and reminders. This kept the shopping and service flows distinct while giving them a shared data foundation.",
    outcomes: [
      "A customer-facing storefront and computer-repair experience.",
      "Connected product, order, stock, booking and quotation workflows.",
      "Backend routes, database integration and administration features.",
      "Vercel deployment configuration included in the project.",
    ],
    boundary:
      "The project has a substantial implementation and deployment configuration. A current live deployment, production usage and exact completion date are not documented here.",
    technologies: [
      {
        label: "Frontend",
        tools: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand"],
      },
      { label: "Backend", tools: ["Node.js", "Express", "TypeScript"] },
      {
        label: "Data & media",
        tools: ["Supabase PostgreSQL", "Cloudinary", "Database migrations"],
      },
      { label: "Deployment configuration", tools: ["Vercel"] },
    ],
    screenshots: [
      {
        src: "/images/RAN Technology/RAN  (4).png",
        width: 1918,
        height: 945,
        label: "Storefront",
        alt: "RAN Technology storefront with computer products, shopping navigation and a repair-services entry point",
        caption:
          "The storefront connects computer-product discovery with access to repair services.",
      },
      {
        src: "/images/RAN Technology/RAN  (6).png",
        width: 1919,
        height: 949,
        label: "Product catalogue",
        alt: "RAN Technology product catalogue with category filters, stock information and add-to-cart actions",
        caption:
          "Customers browse and filter the catalogue, check stock and add computer products to their cart.",
      },
      {
        src: "/images/RAN Technology/RAN  (7).png",
        width: 1917,
        height: 943,
        label: "Product detail & support",
        alt: "RAN Technology product-detail view with quantity selection, add-to-cart action and a customer-support chat panel",
        caption:
          "The product detail brings pricing, stock and purchase actions together, with support available alongside the shopping experience.",
      },
      {
        src: "/images/RAN Technology/RAN  (3).png",
        width: 1918,
        height: 949,
        label: "Shopping and repairs",
        alt: "RAN Technology landing page introducing premium technology and computer repair services",
        caption:
          "A shared landing experience gives shopping and repair requests equal prominence.",
      },
      {
        src: "/images/RAN Technology/RAN  (5).png",
        width: 1918,
        height: 948,
        label: "Repair services",
        alt: "RAN Technology device-repair page with an exploded laptop illustration and schedule-repair action",
        caption:
          "The service page introduces the repair workflow and a direct route to booking.",
      },
      {
        src: "/images/RAN Technology/RAN  (1).png",
        width: 1919,
        height: 946,
        label: "Repair booking",
        alt: "RAN Technology repair-booking screen with a date-selection calendar and booking steps",
        caption:
          "A guided booking flow starts with choosing a date and time for a repair.",
      },
    ],
  },
};
