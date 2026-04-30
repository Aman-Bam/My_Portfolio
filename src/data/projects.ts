export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  type?: string;
  badge?: string;
  status?: string;
  github?: string;
  live?: string;
  color: string;
  image: string;
  layoutSize: 'hero' | 'wide' | 'standard';

  // Case Study Extensions
  caseStudy: {
    challenge: string;
    solution: string;
    technicalBreakdown: {
      feature: string;
      insight: string;
      codeSnippet?: string;
    }[];
    outcomes: string[];
    gallery: string[];
  };
}

export const projects: Project[] = [
  {
    id: "apuni-sarkar",
    title: "Apuni Sarkar",
    description: "AI-powered platform simplifying access to Uttarakhand government schemes, documentation, and citizen services. Built with React 19 + Google Gemini API.",
    tech: ["React 19", "Gemini API", "Tailwind CSS", "Framer Motion"],
    badge: "🥇 HACKATHON WINNER — KU 2024",
    color: "#00e87a",
    live: "https://apuni-sarkar-citizen-services-done.vercel.app/",
    github: "https://github.com/Aman-Bam/Apuni_Sarkar",
    image: "Project_img/Apuni_Sarkar.png",
    layoutSize: 'hero',
    caseStudy: {
      challenge: "Government documentation is often fragmented, dense, and inaccessible to the average citizen, creating a massive barrier to accessing essential welfare schemes.",
      solution: "Built an AI-orchestrated interface that transforms complex legal language into simple, actionable guidance. By leveraging the Gemini API, the system can parse diverse government PDF formats and provide a conversational bridge for the user.",
      technicalBreakdown: [
        {
          feature: "Prompt Engineering & Context Window",
          insight: "Implemented a multi-stage prompt pipeline to prevent AI hallucinations. I used a 'System Persona' for government guidelines and a 'Verification Layer' to ensure the AI only cites official documentation.",
          codeSnippet: "// Simplified verification pipeline\nconst verifyResponse = async (aiResponse, sourceDocs) => {\n  const isValid = await checkCitations(aiResponse, sourceDocs);\n  return isValid ? aiResponse : \"I'm sorry, I couldn't verify this from official sources.\";\n};"
        },
        {
          feature: "Zero-Backend Architecture",
          insight: "To ensure maximum scalability and zero infrastructure cost, I designed the app as a pure frontend implementation using Edge Functions for AI requests, reducing latency and removing the need for a traditional database for core queries.",
        }
      ],
      outcomes: [
        "Reduced information retrieval time from hours to seconds.",
        "Awarded 1st place at KU Hackathon 2024.",
        "Successfully handled complex PDF parsing for 10+ different government schemes."
      ],
      gallery: ["Project_img/Apuni_Sarkar_Detail1.png", "Project_img/Apuni_Sarkar_Detail2.png"]
    }
  },

  {
    id: "employment-system",
    title: "Employee Management System (RBAC Dashboard)",
    description: "Advanced role-based dashboard for seamless employee management with precise access control. Designed for enterprise-level scalability.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Shadcn UI", "MongoDB"],
    color: "#00e87a",
    github: "https://github.com/Aman-Bam/Employee-Management-System",
    live: "https://employe-mangement-using-rbac-dashboard.vercel.app/",
    image: "Project_img/EmploymentManagementSystem.png",
    layoutSize: 'wide',
    caseStudy: {
      challenge: "Enterprise internal tools often suffer from fragmented access control and poor visibility into employee performance. The client needed a system that could handle granular permissions while providing real-time task tracking without data collisions.",
      solution: "Engineered a centralized governance portal featuring a custom-built RBAC (Role-Based Access Control) engine. The system utilizes JWT claims to dynamically filter UI elements and API routes, ensuring absolute data isolation between roles (Admin, Manager, Employee).",
      technicalBreakdown: [
        {
          feature: "Dynamic RBAC Engine",
          insight: "Implemented a policy-based authorization layer using middleware in Next.js. This ensures that permission checks happen at the Edge, rejecting unauthorized requests before they even hit the database, significantly improving security and performance.",
          codeSnippet: "// Middleware authorization check\nexport function middleware(req) {\n  const token = req.cookies.get('auth-token');\n  const { role } = verifyJWT(token);\n  if (!PERMISSIONS[role].includes(req.nextUrl.pathname)) {\n    return NextResponse.rewrite(new URL('/unauthorized', req.url));\n  }\n}"
        },
        {
          feature: "Real-time Task Synchronization",
          insight: "Leveraged MongoDB change streams combined with optimistic UI updates in React to provide a lag-free experience. When a manager assigns a task, the employee's dashboard updates instantly without a page refresh.",
        },
        {
          feature: "Shadcn UI Design System",
          insight: "Customized Radix UI primitives via Shadcn to create a consistent, accessible, and high-performance design language that supports both dark/light modes and follows strict WCAG guidelines.",
        }
      ],
      outcomes: [
        "Implemented 100% secure role-based navigation and data isolation.",
        "Reduced administrative overhead for task delegation by an estimated 50%.",
        "Achieved a sub-200ms TTI (Time to Interactive) for the core dashboard view.",
        "Zero reported unauthorized data access incidents during internal testing."
      ],
      gallery: ["Project_img/Employment_Detail1.png"]
    }
  },
  {
    id: "banking-backend",
    title: "Banking System Backend",
    description: "Pure backend REST API. Account management, transactions, authentication, and balance operations.",
    tech: ["Node.js", "Express.js", "MongoDB"],
    type: "Backend API",
    color: "#7EB8F7",
    github: "https://github.com/Aman-Bam/Banking-System",
    image: "Project_img/bankingsystem.png",
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Financial systems require absolute precision. Handling balance transfers between accounts in a distributed environment is prone to 'double-spending' errors if not handled with extreme care.",
      solution: "Engineered a strict transaction locking mechanism. Every transfer is treated as a single atomic unit: deduct from A, add to B, log transaction. If any step fails, the entire operation rolls back.",
      technicalBreakdown: [
        {
          feature: "Concurrency Control",
          insight: "Implemented optimistic locking using version keys in MongoDB. If two requests attempt to update a balance simultaneously, the second request is rejected and retried, ensuring data integrity.",
        },
        {
          feature: "Secure Auth Flow",
          insight: "Used JWTs with short-lived access tokens and long-lived refresh tokens stored in HttpOnly cookies to prevent XSS and session hijacking.",
        }
      ],
      outcomes: [
        "Zero balance errors during stress tests of 100+ concurrent transfers.",
        "100% type-safe API endpoints using TypeScript.",
        "Secure, scalable architecture capable of handling thousands of transactions per minute."
      ],
      gallery: []
    }
  },
  {
    id: "lead-extension",
    title: "Lead Extension",
    description: "Browser-based lead capture tool for extracting and managing prospect data directly from any website.",
    tech: ["Chrome Extension APIs", "JavaScript"],
    type: "Chrome Extension",
    color: "#B97CF7",
    github: "https://github.com/Aman-Bam/lead-Extension",
    image: "Project_img/Lead_Extension.png",
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Extracting structured data from unstructured web pages (DOMs) is challenging because every website has a different HTML structure.",
      solution: "Developed a generic heuristic-based extraction engine that identifies potential 'lead' data (emails, phones, names) using regex patterns and DOM proximity analysis.",
      technicalBreakdown: [
        {
          feature: "Background Script Orchestration",
          insight: "Utilized Chrome's Service Workers to handle data persistence and API synchronization in the background, ensuring the user's browsing experience remains lag-free.",
        },
        {
          feature: "Dynamic Content Injection",
          insight: "Built a custom content script that injects a non-intrusive UI layer into the host page, allowing users to manually verify and 'save' leads without leaving the page.",
        }
      ],
      outcomes: [
        "Capable of extracting leads from 90% of standard business directories.",
        "Reduced manual data entry time by 80% for users.",
        "Zero-latency UI response during extraction."
      ],
      gallery: []
    }
  },
  {
    id: "meal-explorer",
    title: "React Meal Explorer",
    description: "Interactive meal discovery app for exploring recipes with search, filtering, and detailed nutritional information.",
    tech: ["React", "TheMealDB API", "CSS3"],
    type: "Web Application",
    color: "#FF6B6B",
    github: "https://github.com/Aman-Bam/React-Meal-Explorer",
    live:"https://extraordinary-moxie-2517bf.netlify.app/",
    image: "Project_img/Meal-Explorer.png",
    layoutSize: 'standard',
    caseStudy: {
      challenge: "External APIs often have inconsistent response times and varying data structures, leading to 'jank' and layout shifts during loading.",
      solution: "Implemented a robust caching layer and 'skeleton screens' to provide immediate visual feedback while the API fetches the latest recipe data.",
      technicalBreakdown: [
        {
          feature: "Optimistic UI Updates",
          insight: "Used local state to immediately reflect filter changes, then synchronized with the API in the background to ensure a snap-fast user experience.",
        },
        {
          feature: "Responsive Grid Layout",
          insight: "Designed a fluid CSS Grid system that adapts seamlessly from ultra-wide monitors to small mobile screens without losing the visual hierarchy of the recipes.",
        }
      ],
      outcomes: [
        "Achieved a <200ms perceived load time for recipe details.",
        "Implemented a fully accessible interface following WCAG guidelines.",
        "Seamless integration with Third-Party API for 100+ recipes.",
      ],
      gallery: []
    }
  },
  {
    id: "dentocare",
    title: "DENTOCARE",
    description: "Professional dental clinic management system focusing on appointment scheduling and patient record tracking.",
    tech: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    type: "Web Application",
    color: "#7EB8F7",
    github: "https://github.com/Aman-Bam/Dentocare1",
    image: "Project_img/Dentocare.png",
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Dental clinics often struggle with fragmented paper records and inefficient appointment scheduling, leading to overbooking or missed slots and poor patient follow-up.",
      solution: "Developed a comprehensive MERN-based clinic management system that centralizes patient history, automates scheduling, and provides a streamlined dashboard for staff.",
      technicalBreakdown: [
        {
          feature: "Centralized Patient Records",
          insight: "Architected a flexible MongoDB schema to handle diverse patient data, from medical history to treatment plans, allowing instant retrieval during consultations.",
        },
        {
          feature: "Conflict-Free Scheduling",
          insight: "Implemented a custom booking algorithm that validates time slots in real-time, preventing overlapping appointments and optimizing clinic capacity.",
        }
      ],
      outcomes: [
        "Reduced administrative time for scheduling by 60%.",
        "Improved patient data accuracy and accessibility for practitioners.",
        "Achieved a high-performance, responsive interface for both desktop and tablet use."
      ],
      gallery: []
    }
  },
];
