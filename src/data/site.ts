// Central content for the portfolio. Edit here; components read from this file.

export const profile = {
  name: "Abdul Moiz",
  role: "Full-Stack Web Developer",
  tagline: "I'm a web developer passionate about building modern, responsive, and user-friendly web applications. From crafting clean, engaging interfaces with React and Next.js to developing functional backend systems with Node.js, Express, and MongoDB, I enjoy turning ideas into practical digital solutions. Through hands-on projects and continuous learning, I'm strengthening my skills across the full development process and working toward building applications that are both useful and reliable.",
  location: "Karachi, Pakistan",
  email: "abdulmoizarain766@gmail.com",
  phone: "03022481495",
  phoneHref: "tel:+923022481495",
  whatsapp: "+92 317 0315120",
  cvPath: "/Abdul-Moiz-CV.pdf",
  cvFilename: "Abdul-Moiz-CV.pdf",
};

export const socials = {
  github: "https://github.com/abdul-moiz1687",
  linkedin: "https://www.linkedin.com/in/abdul-moiz-5108b3391/",
  instagram: "https://www.instagram.com/abdul_moiz995/",
  whatsapp: "https://wa.me/923170315120",
  email: "mailto:abdulmoizarain766@gmail.com",
};

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjygoeqo";

export const about = {
  paragraphs: [
    "I'm Abdul Moiz, a web developer based in Karachi, Pakistan. I completed SMIT's Modern Web Application Development course, where I studied both frontend and backend web development.",
    "I work with React and Next.js for frontend development, along with Node.js, Express.js and MongoDB for backend functionality. I apply these technologies through practical projects. For example, I built Applio, an application for managing appliance records, warranties and service history. I also developed TimeNest, a full-stack e-commerce website where users can browse products, manage their cart and place orders.",
    "Alongside web development, I completed DigiSkills courses in WordPress and SEO. I've practiced building websites using WordPress tools like Elementor and Gutenberg, and learned the fundamentals of on-page SEO.",
    "My main focus is web development. I'm currently working on improving my problem-solving skills, building practical projects and developing my ability to create useful and reliable web applications.",
  ],
  approach: "Understand the problem. Keep the experience simple. Build with care.",
};

export const skillGroups = [
  { title: "Frontend", skills: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap", "Responsive Design"] },
  { title: "Backend & Data", skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Firebase", "Upstash Redis", "Cloudinary", "REST APIs", "GraphQL APIs", "JWT Authentication"] },
  { title: "CMS & SEO", skills: ["WordPress", "Elementor", "WooCommerce", "Gutenberg", "Theme & Plugin Configuration", "WPForms", "Contact Form 7", "Rank Math SEO", "All-in-One WP Migration", "LocalWP", "Basic On-Page SEO", "Keyword Research", "Google Search Console", "Google PageSpeed Insights", "SEMrush (Basic familiarity)"] },
  { title: "Tools & Workflow", skills: ["Git", "GitHub", "Vite", "VS Code", "Postman", "Vercel", "Netlify", "CI/CD", "Gemini API", "Canva (Basic)", "Figma (Basic)"] },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const;

export type ThemeId = "midnight-cobalt" | "ivory-cobalt" | "graphite-emerald" | "paper-terracotta";

export const themes: { id: ThemeId; name: string; swatches: [string, string, string] }[] = [
  { id: "midnight-cobalt", name: "Midnight Cobalt", swatches: ["oklch(0.16 0.006 265)", "oklch(0.97 0.003 265)", "oklch(0.64 0.19 260)"] },
  { id: "ivory-cobalt", name: "Ivory Cobalt", swatches: ["oklch(0.975 0.012 85)", "oklch(0.2 0.02 265)", "oklch(0.5 0.2 262)"] },
  { id: "graphite-emerald", name: "Graphite Emerald", swatches: ["oklch(0.19 0.004 160)", "oklch(0.95 0.006 150)", "oklch(0.72 0.13 163)"] },
  { id: "paper-terracotta", name: "Warm Paper Terracotta", swatches: ["oklch(0.955 0.016 75)", "oklch(0.22 0.015 50)", "oklch(0.53 0.12 40)"] },
];
export const DEFAULT_THEME: ThemeId = "midnight-cobalt";

export const education = [
  { school: "Saylani Mass IT Training (SMIT)", program: "Modern Web Application Development", period: "Sep 2025 – Sep 2026", status: "Completed" },
  { school: "Govt. National College (Evening), Karachi", program: "Intermediate in Commerce", period: "2024 – 2026" },
  { school: "Elysian Public School", program: "Matriculation in Computer Science", period: "2022 – 2024" },
];

export const certifications = [
  { title: "Modern Web Application Development (Batch-18)", issuer: "Saylani IT Training Programme (SMIT)", date: "Sep 2025 – Sep 2026 · 13 months", file: "/certificates/smit-modern-web-app-development.pdf" },
  { title: "Legacy Responsive Web Design V8", issuer: "freeCodeCamp", date: "May 18, 2026", file: "/certificates/freecodecamp-responsive-web-design.pdf" },
  { title: "Coding Night-2026 (Hackathon) — Participation", issuer: "Saylani IT Training Programme (SMIT)", date: "2026 · 9 hours", file: "/certificates/smit-coding-night-2026.pdf" },
  { title: "Introduction to MS Excel", issuer: "Simplilearn SkillUp × Microsoft", date: "May 21, 2026", file: "/certificates/simplilearn-intro-ms-excel.pdf" },
  { title: "IT for Business Success", issuer: "HP LIFE (HP Foundation)", date: "Jan 28, 2026", file: "/certificates/hp-life-it-for-business-success.pdf" },
  { title: "Social Media Marketing", issuer: "HP LIFE (HP Foundation)", date: "Jan 31, 2026", file: "/certificates/hp-life-social-media-marketing.pdf" },
  { title: "WordPress (Batch 04)", issuer: "DigiSkills Training Program", date: "Aug 2026 – Oct 2026", file: "/certificates/digiskills-wordpress-batch-04.pdf" },
  { title: "SEO (Search Engine Optimization) (Batch 04)", issuer: "DigiSkills Training Program", date: "Aug 2026 – Oct 2026", file: "/certificates/digiskills-seo-batch-04.pdf" },
];

export const ongoingTraining = { title: "WordPress & SEO", issuer: "DigiSkills", status: "Completed" };
