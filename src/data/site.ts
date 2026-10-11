// Central content for the portfolio. Edit here; components read from this file.

export const profile = {
  name: "Abdul Moiz",
  role: "Full-Stack Web Developer",
  tagline: "Building modern web experiences and practical backend systems.",
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
];

export const ongoingTraining = { title: "WordPress & SEO", issuer: "DigiSkills", status: "In progress" };
