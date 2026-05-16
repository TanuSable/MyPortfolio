export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  points: string[];
};

export type ProjectItem = {
  name: string;
  stack: string;
  points: string[];
  image: string;
  category: "web" | "fullstack";
  role: string;
  description: string;
  demoUrl?: string;
};

export type SkillEntry = {
  name: string;
  percent: number;
};

export type SkillCategory = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  skills: SkillEntry[];
};

export type ServiceItem = {
  title: string;
  icon: string;
  description: string;
  features: string[];
};

export type TimelineItem = {
  title: string;
  subtitle: string;
  period: string;
};

export type HighlightItem = {
  quote: string;
  date: string;
  title: string;
  detail: string;
};

export const profile = {
  name: "Tanu Sable",
  shortName: "T",
  location: "Indore, Madhya Pradesh, India",
  email: "tanu2002w@gmail.com",
  phone: "+91-7898878935",
  whatsapp: "+917898878935",
  resumeUrl: "/resume/TanuSableFS.pdf",
  title: "Full Stack Developer",
  avatar: "/images/profile.png",
  homeBg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
  summary:
    "Full Stack Developer with 2+ years of experience building responsive, scalable, and high-performance web applications using React.js, Next.js, Node.js, Express.js, MongoDB, SQL, and TypeScript.",
  aboutDescription:
    "I build end-to-end web products — from pixel-perfect UIs and reusable component systems to REST APIs, databases, and real-time features. I enjoy translating Figma designs into production-ready apps and collaborating in agile teams."
};

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/tanusable/",
  github: "https://github.com/TanuSable"
};

export const aboutStats = [
  { icon: "uil-award", title: "Experience", subtitle: "2+ Years" },
  { icon: "uil-suitcase-alt", title: "Completed", subtitle: "3+ Projects" },
  { icon: "uil-headphones-alt", title: "Support", subtitle: "Available" }
];

export const educationTimeline: TimelineItem[] = [
  {
    title: "Shri Vaishnav Vidyapeeth Vishwavidyalaya",
    subtitle: "BCA + MCA",
    period: "2025"
  }
];

export const experienceTimeline: TimelineItem[] = [
  {
    title: "Duredev Private Limited, Indore",
    subtitle: "Frontend Developer (Full Stack responsibilities)",
    period: "Jan 2024 — Present"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    subtitle: "2+ years",
    icon: "uil-brackets-curly",
    skills: [
      { name: "React.js", percent: 95 },
      { name: "Next.js", percent: 92 },
      { name: "TypeScript", percent: 90 },
      { name: "Tailwind CSS", percent: 90 }
    ]
  },
  {
    id: "backend",
    title: "Backend Developer",
    subtitle: "2+ years",
    icon: "uil-server-network",
    skills: [
      { name: "Node.js", percent: 90 },
      { name: "Express.js", percent: 88 },
      { name: "MongoDB", percent: 86 },
      { name: "SQL", percent: 84 }
    ]
  },
  {
    id: "tools",
    title: "APIs & Tools",
    subtitle: "Production ready",
    icon: "uil-wrench",
    skills: [
      { name: "REST APIs", percent: 92 },
      { name: "GraphQL", percent: 85 },
      { name: "WebSockets", percent: 85 },
      { name: "Git & CI/CD", percent: 88 }
    ]
  }
];

export const experience: ExperienceItem[] = [
  {
    role: "Frontend Developer",
    company: "Duredev Private Limited, Indore",
    period: "Jan 2024 — Present",
    points: [
      "Developed responsive, scalable web applications with React.js, Next.js, TypeScript, and Tailwind CSS.",
      "Built backend services and REST APIs with Node.js and Express.js for workflows and integrations.",
      "Designed schemas and queries with MongoDB and SQL for storage and backend operations.",
      "Translated Figma designs into pixel-perfect, reusable components with strong responsiveness.",
      "Integrated REST and GraphQL APIs with robust async handling for dynamic applications.",
      "Shipped real-time features with WebSockets, Git workflows, CI/CD, and agile collaboration."
    ]
  }
];

export const projects: ProjectItem[] = [
  {
    name: "TalentPass — Credential Platform",
    stack: "React.js, Next.js, Node.js, Express.js, MongoDB",
    image: "/images/TalentPass.png",
    category: "fullstack",
    role: "full stack",
    description:
      "Decentralized credential platform based on DID and Verifiable Credentials with issuer, holder, and verifier workflows.",
    points: [
      "Built a decentralized credential platform on DID and Verifiable Credentials architecture.",
      "Delivered issuer, holder, and verifier flows with reusable frontend modules.",
      "Developed Node.js and Express.js APIs for credential management and validation.",
      "Added AI-powered real-time chat with efficient frontend-backend communication."
    ]
  },
  {
    name: "Cityfeed",
    stack: "React.js, Node.js, Express.js, MongoDB, SQL",
    image: "/images/cityfeed.png",
    category: "fullstack",
    role: "full stack",
    description:
      "Multi-role smart city platform with wallet, membership, authentication, and payment integrations.",
    points: [
      "Developed a multi-role smart city platform with responsive UI and dynamic workflows.",
      "Built REST APIs for wallet, membership, and authentication modules.",
      "Integrated payment gateways, OTP authentication, and real-time REST operations."
    ]
  },
  {
    name: "Duredev Website",
    stack: "Next.js, TypeScript, Tailwind CSS",
    image: "/images/duredev.png",
    category: "web",
    role: "frontend",
    description:
      "Company website focused on SEO, performance, accessibility, and reusable component architecture.",
    points: [
      "Built a responsive company website with SEO and performance optimization.",
      "Implemented reusable components and scalable application architecture.",
      "Ensured accessibility and cross-browser compatibility."
    ],
    demoUrl: "https://duredev.com"
  }
];

export const services: ServiceItem[] = [
  {
    title: "Full Stack\nDevelopment",
    icon: "uil-web-grid",
    description:
      "End-to-end application development with modern JavaScript stacks, from UI to APIs and databases.",
    features: [
      "React & Next.js application development",
      "Node.js & Express REST APIs",
      "MongoDB & SQL data modeling",
      "Authentication & payment integrations",
      "Performance optimization & deployment"
    ]
  },
  {
    title: "Frontend\nEngineering",
    icon: "uil-arrow",
    description:
      "Responsive, accessible interfaces with reusable components and design-system thinking.",
    features: [
      "Figma to pixel-perfect UI implementation",
      "Component-based architecture",
      "State management (Redux, React Query)",
      "Real-time UI with WebSockets",
      "Cross-browser responsive design"
    ]
  },
  {
    title: "Backend &\nAPIs",
    icon: "uil-edit",
    description:
      "Secure, scalable backend services with clean API design and robust error handling.",
    features: [
      "REST & GraphQL API development",
      "Database schema design & queries",
      "Async workflows & validations",
      "Third-party API integrations",
      "CI/CD & Git-based delivery"
    ]
  }
];

export const highlights: HighlightItem[] = [
  {
    quote:
      "Built production-ready full stack applications with React, Next.js, and Node.js — from UI components to REST APIs and database design.",
    date: "2024 — Present",
    title: "Duredev Private Limited",
    detail: "Full Stack Web Development"
  },
  {
    quote:
      "Delivered a decentralized credential platform with DID architecture, real-time AI chat, and secure MongoDB-backed workflows.",
    date: "Client Project",
    title: "TalentPass",
    detail: "Confidential Full Stack Project"
  },
  {
    quote:
      "Shipped a multi-role smart city platform with payments, OTP auth, and transactional data handling across MongoDB and SQL.",
    date: "Cityfeed",
    title: "Smart City Platform",
    detail: "Full Stack Application"
  }
];

export const education = {
  institute: "Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore, MP",
  degree: "BCA + MCA",
  year: "2025"
};

export const workFilters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "fullstack", label: "Full Stack" }
] as const;

export type WorkFilter = (typeof workFilters)[number]["id"];

export const skills = skillCategories.flatMap((category) =>
  category.skills.map((skill) => skill.name)
);

export const heroImages = [profile.avatar, projects[0].image, projects[1].image];
