import type { IconType } from "react-icons";
import { SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiJsonwebtokens, SiFirebase, SiGit, SiGithub, SiVite, SiPostman, SiVercel, SiNetlify } from "react-icons/si";
import { FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { CodeXml, MonitorSmartphone, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socials } from "@/data/site";
import { ext } from "./ui";

const skillIcons: Record<string, IconType> = {
  HTML5: SiHtml5, CSS3: SiCss, JavaScript: SiJavascript, TypeScript: SiTypescript,
  React: SiReact, "Next.js": SiNextdotjs, "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs, "Express.js": SiExpress, MongoDB: SiMongodb,
  "JWT Authentication": SiJsonwebtokens, Firebase: SiFirebase, Git: SiGit,
  GitHub: SiGithub, Vite: SiVite, Postman: SiPostman, Vercel: SiVercel, Netlify: SiNetlify,
};

export function SkillIcon({ name }: { name: string }) {
  const Icon = skillIcons[name];
  if (Icon) return <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />;
  const Fallback = name === "Responsive Design" ? MonitorSmartphone : name === "REST APIs" ? Network : CodeXml;
  return <Fallback aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />;
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