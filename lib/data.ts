import type {
  AboutContent,
  Certification,
  ContactContent,
  Education,
  ExperienceItem,
  HeroContent,
  NavLink,
  Project,
  SiteConfig,
  SkillGroup,
} from "@/lib/types";

/*
 * All site content lives here. Components import from this file only.
 * Search for `TODO_` to find values that still need to be filled in.
 */

export const siteConfig: SiteConfig = {
  name: "Shivam Ruhela",
  initials: "SR",
  title: "Full-Stack Developer",
  tagline: "I build full-stack products end to end.",
  description:
    "Shivam Ruhela is a full-stack developer and Computer Science graduate (DTU, 2026) who builds production web apps with Next.js, NestJS, TypeScript and SQL. Currently a Software Developer Intern at Infinity Assurance.",
  url: "TODO_SITE_URL", // e.g. https://shivamruhela.vercel.app
  locale: "en_IN",
  location: "Delhi NCR, India", // TODO: confirm
  email: "TODO_EMAIL",
  resumeUrl: "TODO_RESUME_URL", // e.g. /resume.pdf placed in /public
  photo: {
    src: "TODO_PHOTO", // e.g. /images/shivam.jpg placed in /public/images
    alt: "Portrait of Shivam Ruhela",
  },
  socials: [
    { platform: "github", label: "GitHub", href: "TODO_GITHUB_URL" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/shivam-dtu" },
    { platform: "leetcode", label: "LeetCode", href: "TODO_LEETCODE_URL" },
    { platform: "email", label: "Email", href: "mailto:TODO_EMAIL" },
  ],
  github: {
    username: "TODO_GITHUB_USERNAME",
  },
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub", href: "#github" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const hero: HeroContent = {
  greeting: "Hi, I'm",
  roles: [
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js + NestJS Builder",
    "CS Graduate, DTU '26",
  ],
  pitch:
    "I design, build and ship web products end to end: from data model and API to a polished, accessible UI. Currently the sole developer on InfyVault at Infinity Assurance, and looking for a full-time Full Stack / SDE role.",
  primaryCta: { label: "View Projects", href: "#projects" },
  secondaryCta: { label: "Contact Me", href: "#contact" },
};

export const about: AboutContent = {
  paragraphs: [
    "I'm a Computer Science graduate from Delhi Technological University (2026) who likes owning a product from the first schema to the last pixel. At Infinity Assurance I'm the sole developer on InfyVault, a customer-facing platform built with Next.js, NestJS and SQL Server.",
    "Before that I automated quality testing for a production GenAI chatbot at Amdocs and built backend APIs for an organisational dashboard at AIDEOA. Outside work I've shipped solo projects like QuickAI, a full-stack AI app, and solved 500+ DSA problems.",
    "I care about clean architecture, honest error handling and interfaces that feel fast. I'm currently looking for a full-time Full Stack / SDE role where I can keep shipping end to end.",
  ],
  facts: [
    { label: "Based in", value: "Delhi NCR, India" }, // TODO: confirm
    { label: "Education", value: "B.Tech CSE, DTU (2026)" },
    { label: "Currently", value: "SDE Intern @ Infinity Assurance" },
    { label: "Focus", value: "Full-stack TypeScript" },
    { label: "DSA", value: "500+ problems solved" },
    { label: "Open to", value: "Full Stack / SDE roles" },
  ],
};

export const experience: ExperienceItem[] = [
  {
    id: "infinity-assurance",
    company: "Infinity Assurance",
    role: "Software Developer Intern",
    type: "Internship",
    location: "India", // TODO: confirm city
    start: "Aug 2026",
    end: "Present",
    summary:
      "Sole developer on InfyVault, a customer-facing product-lifecycle platform; earlier contributed to InfyShield, the InfyMaster admin panel and InfyMeet.",
    highlights: [
      "Sole developer on InfyVault, where customers register their electronics, store bills and documents, track warranties and protection plans, and raise claims.",
      "Own the full stack end to end: Next.js frontend, NestJS REST API and a SQL Server data layer built on stored procedures, from feature design through to production.",
      "Built OTP-based login with HttpOnly JWT cookies, document uploads to Azure Blob Storage, and the online protection-plan purchase flow with payment-gateway integration.",
      "Earlier shipped features across InfyShield (the D2C protection-plan storefront), the InfyMaster admin panel and InfyMeet on the same TypeScript stack.",
    ],
    stack: ["Next.js", "NestJS", "TypeScript", "SQL Server", "Azure Blob Storage", "JWT"],
  },
  {
    id: "amdocs",
    company: "Amdocs",
    role: "Software Engineer Intern",
    type: "Internship",
    location: "Gurugram, India",
    start: "Jan 2026",
    end: "Jun 2026",
    summary:
      "Automated regression testing and LLM-based quality evaluation for a production GenAI billing chatbot.",
    highlights: [
      "Built a Python regression-testing framework for a GenAI billing chatbot, cutting validation time per run from 2–3 hours to 30–40 minutes across 2–3 releases a week.",
      "Automated an LLM-based evaluation pipeline in Langfuse that scores daily conversation traces for completeness and factual correctness.",
      "Shipped pipeline-ready automation scripts into the team's Azure DevOps CI/CD workflow and resolved script-level issues during integration.",
      "Caught a defect where the chatbot answered confidently from incomplete billing data instead of surfacing the failure; tracked it to resolution in Octane.",
    ],
    stack: ["Python", "Langfuse", "Azure DevOps", "Octane", "LLM Evaluation"],
  },
  {
    id: "aideoa",
    company: "AIDEOA",
    role: "Full Stack Developer Intern",
    type: "Internship",
    location: "Remote",
    start: "Jan 2025",
    end: "Jul 2025",
    summary:
      "Backend APIs and MongoDB-backed features for an internal organisational dashboard.",
    highlights: [
      "Delivered backend APIs and MongoDB-integrated features for the internal dashboard staff use to manage and view association data.",
      "Maintained RESTful APIs across multiple dashboard modules with MongoDB persistence.",
      "Extended the JWT authentication system with backend token validation and frontend token handling so only authenticated users can reach the dashboard.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "JWT", "React"],
  },
];

export const projects: Project[] = [
  {
    id: "infyvault",
    title: "InfyVault",
    tagline: "Product lifecycle platform for registered electronics",
    description:
      "Customer-facing web app where users register their devices, store bills and documents, track warranties and protection plans, raise claims and buy new plans online. I own the entire stack as the sole developer.",
    kind: "case-study",
    category: "Full Stack",
    stack: ["Next.js", "NestJS", "TypeScript", "SQL Server", "Azure Blob Storage", "JWT"],
    links: {},
    image: { src: "/images/projects/infyvault.svg", alt: "InfyVault dashboard preview" }, // TODO: add image
    featured: true,
    role: "Sole developer",
    period: "Aug 2026 – Present",
    highlights: [
      "OTP login with HttpOnly JWT cookies and route protection",
      "Stored-procedure-backed REST API with NestJS",
      "Document uploads to Azure Blob Storage",
      "Protection-plan checkout with payment-gateway integration",
    ],
  },
  {
    id: "infymaster-admin",
    title: "InfyMaster Admin Panel",
    tagline: "Internal admin panel for operations teams",
    description:
      "Internal admin panel used by the operations team to manage customers, plans and claims. Contributed modules across data grids, forms and API integration.", // TODO: confirm wording
    kind: "case-study",
    category: "Full Stack",
    stack: ["Next.js", "TypeScript", "SQL Server"], // TODO: confirm stack
    links: {},
    image: { src: "/images/projects/infymaster.svg", alt: "InfyMaster admin panel preview" }, // TODO: add image
    featured: false,
    role: "Developer",
    period: "2026",
  },
  {
    id: "infyshield",
    title: "InfyShield",
    tagline: "D2C storefront for device protection plans",
    description:
      "Direct-to-consumer site where customers browse and buy protection plans for their devices. Worked on the plan catalogue, checkout flow and API integration.", // TODO: confirm wording
    kind: "case-study",
    category: "Full Stack",
    stack: ["Next.js", "TypeScript", "REST API"], // TODO: confirm stack
    links: {},
    image: { src: "/images/projects/infyshield.svg", alt: "InfyShield storefront preview" }, // TODO: add image
    featured: false,
    role: "Developer",
    period: "2026",
  },
  {
    id: "infymeet",
    title: "InfyMeet",
    tagline: "Internal web app for the Infinity Assurance team", // TODO: confirm
    description:
      "Internal web application built for Infinity Assurance. Contributed frontend and API features.", // TODO: replace with a one-line, non-confidential description
    kind: "case-study",
    category: "Full Stack",
    stack: ["Next.js", "TypeScript"], // TODO: confirm stack
    links: {},
    image: { src: "/images/projects/infymeet.svg", alt: "InfyMeet preview" }, // TODO: add image
    featured: false,
    role: "Developer",
    period: "2026",
  },
  {
    id: "quickai",
    title: "QuickAI",
    tagline: "Full-stack AI toolkit with Gemini",
    description:
      "Solo full-stack AI app shipped in two weeks: content generation, PDF resume analysis with ATS feedback, an AI chat assistant and image generation, with PostgreSQL-backed auth and per-user history.",
    kind: "personal",
    category: "AI / LLM",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Gemini API", "ClipDrop API", "Vercel"],
    links: { github: "TODO_QUICKAI_GITHUB", live: "TODO_QUICKAI_LIVE" },
    image: { src: "/images/projects/quickai.svg", alt: "QuickAI app preview" }, // TODO: add image
    featured: true,
    period: "2025",
    highlights: [
      "Resume pipeline: pdf-parse text extraction, structured Gemini prompts, strengths / weaknesses / ATS feedback",
      "Separate image-generation pipeline via the ClipDrop API",
      "PostgreSQL-backed authentication with per-user generation history",
    ],
  },
  {
    id: "wanderlust",
    title: "WanderLust",
    tagline: "Airbnb-style rental platform",
    description:
      "Full-stack rental listings app with image uploads, reviews and map integration. Ownership-based authorisation in Express middleware checks the logged-in user against each listing's creator before edits or deletes.",
    kind: "personal",
    category: "Backend",
    stack: ["Node.js", "Express", "MongoDB", "Cloudinary", "Mapbox"],
    links: { github: "TODO_WANDERLUST_GITHUB", live: "TODO_WANDERLUST_LIVE" },
    image: { src: "/images/projects/wanderlust.svg", alt: "WanderLust listings preview" }, // TODO: add image
    featured: false,
    period: "2024",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    description: "Accessible, responsive interfaces",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "HTML & CSS", icon: "html" },
    ],
  },
  {
    name: "Backend",
    description: "APIs, auth and integrations",
    skills: [
      { name: "Node.js", icon: "nodejs" },
      { name: "NestJS", icon: "nestjs" },
      { name: "Express", icon: "express" },
      { name: "REST API design", icon: "api" },
      { name: "JWT auth", icon: "jwt" },
      { name: "Python", icon: "python" },
      { name: "LLM integration (Gemini)", icon: "gemini" },
    ],
  },
  {
    name: "Database",
    description: "Modelling, queries and stored procedures",
    skills: [
      { name: "SQL Server", icon: "sqlserver" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    name: "Tools",
    description: "Shipping and quality",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Postman", icon: "postman" },
      { name: "Vercel", icon: "vercel" },
      { name: "Azure DevOps", icon: "azuredevops" },
      { name: "Langfuse", icon: "langfuse" },
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Delhi Technological University",
    institutionUrl: "https://www.dtu.ac.in",
    degree: "B.Tech",
    field: "Computer Science",
    start: "2022",
    end: "2026",
    location: "New Delhi, India",
    highlights: ["JEE Main: 99.02 percentile (AIR 8915)"],
    coursework: [
      "Data Structures",
      "Operating Systems",
      "DBMS",
      "OOP",
      "Computer Networks",
      "Software Engineering",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "Desh Ke Mentor — Certified Mentor",
    issuer: "Government of Delhi",
    year: "TODO_YEAR",
    description: "Guided 4–5 Class 12 students on career and higher-education planning.",
  },
];

export const contact: ContactContent = {
  heading: "Let's build something",
  description:
    "Have a role, a project or just a question? Send a message and I'll get back to you soon.",
  availability: "Open to full-time Full Stack / SDE roles.",
};
