import type { IconType } from "react-icons";
import { SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiBootstrap, SiNodedotjs, SiExpress, SiMongodb, SiJsonwebtokens, SiFirebase, SiGit, SiGithub, SiVite, SiPostman, SiVercel, SiNetlify, SiWordpress, SiElementor, SiWoocommerce, SiGooglesearchconsole, SiSemrush, SiLocal, SiUpstash, SiPostgresql, SiCloudinary, SiGraphql, SiGooglegemini, SiFigma } from "react-icons/si";
import { FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp, FaWpforms } from "react-icons/fa6";
import { TbBrandVscode } from "react-icons/tb";
import { CodeXml, FileText, Gauge, Mail, MonitorSmartphone, Network, Palette, Search, Settings2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socials } from "@/data/site";
import { ext } from "./ui";

const skillIcons: Record<string, IconType> = {
  HTML5: SiHtml5, CSS3: SiCss, JavaScript: SiJavascript,
  React: SiReact, "Next.js": SiNextdotjs, "Tailwind CSS": SiTailwindcss, Bootstrap: SiBootstrap,
  "Node.js": SiNodedotjs, "Express.js": SiExpress, MongoDB: SiMongodb,
  "JWT Authentication": SiJsonwebtokens, Firebase: SiFirebase, Git: SiGit,
  GitHub: SiGithub, Vite: SiVite, Postman: SiPostman, Vercel: SiVercel, Netlify: SiNetlify,
  "VS Code": TbBrandVscode,
  WordPress: SiWordpress, Elementor: SiElementor, WooCommerce: SiWoocommerce,
  "Google Search Console": SiGooglesearchconsole, "SEMrush (Basic familiarity)": SiSemrush,
  LocalWP: SiLocal, "Upstash Redis": SiUpstash, PostgreSQL: SiPostgresql,
  Cloudinary: SiCloudinary, "GraphQL APIs": SiGraphql, "Gemini API": SiGooglegemini,
  "Figma (Basic)": SiFigma, WPForms: FaWpforms,
};

const fallbackIcons = {
  "Responsive Design": MonitorSmartphone,
  "REST APIs": Network,
  Gutenberg: FileText,
  "Theme & Plugin Configuration": Settings2,
  "Contact Form 7": Mail,
  "Rank Math SEO": Search,
  "All-in-One WP Migration": Upload,
  "Basic On-Page SEO": Search,
  "Keyword Research": Search,
  "Google PageSpeed Insights": Gauge,
  "Canva (Basic)": Palette,
};

export function SkillIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const Icon = skillIcons[name];
  if (Icon) return <Icon aria-hidden="true" data-brand={name} className={`skill-brand shrink-0 ${className}`} />;
  const Fallback = fallbackIcons[name as keyof typeof fallbackIcons] ?? CodeXml;
  return <Fallback aria-hidden="true" className={`shrink-0 text-primary ${className}`} />;
}

const socialItems = [
  { key: "github", label: "GitHub", icon: FaGithub },
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedinIn },
  { key: "instagram", label: "Instagram", icon: FaInstagram },
  { key: "whatsapp", label: "WhatsApp", icon: FaWhatsapp },
] as const;

export function SocialLinks() {
  return <div className="flex flex-wrap items-center gap-3">{socialItems.map(({ key, label, icon: Icon }) => <Button key={key} asChild variant="outline" size="icon" className="h-11 w-11 rounded-full"><a href={socials[key]} {...ext} aria-label={label} title={label}><Icon className="h-5 w-5" /></a></Button>)}</div>;
}