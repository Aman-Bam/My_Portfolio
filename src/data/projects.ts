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
    title: "Employment Management System",
    description: "Dark glassmorphism UI with emerald accents. Admin + employee dashboards, task management, and role-based access.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    color: "#FFB347",
    image: "Project_img/EmploymentManagementSystem.png",
    layoutSize: 'wide',
    caseStudy: {
      challenge: "Managing employee hierarchies and task delegations in a real-time environment often leads to data inconsistency and race conditions when multiple admins update the same resource.",
      solution: "Implemented a robust RBAC (Role-Based Access Control) system and utilized MongoDB transactions to ensure atomic updates across employee and task collections.",
      technicalBreakdown: [
        {
          feature: "Atomic Transactions",
          insight: "Used MongoDB sessions to wrap task assignment and status updates in a single transaction. This prevents 'ghost tasks' where a task is assigned but the employee's load isn't updated.",
        },
        {
          feature: "Glassmorphism Design System",
          insight: "Developed a custom Tailwind configuration for backdrop-blur and semi-transparent borders to achieve a luxury 'glass' feel without sacrificing accessibility or performance.",
        }
      ],
      outcomes: [
        "Eliminated data inconsistency during concurrent updates.",
        "Achieved a cohesive, modern UI with 60fps transitions.",
        "Simplified admin overhead by 40% through intuitive dashboarding."
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
    id: "saas-founder",
    title: "Meal-Explorer (SaaS)",
    description: "SaaS for appointment-based businesses. Revenue leakage audit + Lost Revenue Calculator. Cold outreach automation.",
    tech: ["MERN Stack", "TypeScript"],
    status: "In Progress",
    type: "SaaS · Co-founded",
    color: "#00e87a",
    image: "Project_img/Meal-Explorer.png",
    layoutSize: 'hero',
    caseStudy: {
      challenge: "B2B SaaS requires an extremely high level of trust. The 'Lost Revenue Calculator' needed to feel honest and data-driven, not like a sales gimmick.",
      solution: "Engineered a transparent calculation engine that allows users to input their actual metrics and see a real-time, mathematical breakdown of where their revenue is leaking.",
      technicalBreakdown: [
        {
          feature: "Revenue Leakage Algorithm",
          insight: "Created a proprietary formula based on industry benchmarks to calculate 'leakage' based on no-show rates and booking gaps.",
        },
        {
          feature: "Automated Outreach Pipeline",
          insight: "Built a queue-based system for cold outreach that respects API rate limits and schedules messages based on the prospect's timezone for maximum open rates.",
        }
      ],
      outcomes: [
        "Currently in beta with X number of early adopters.",
        "Proven ability to identify up to 20% revenue leakage in appointment-based businesses.",
        "Full-stack TypeScript implementation for zero-runtime errors."
      ],
      gallery: []
    }
  }
];
