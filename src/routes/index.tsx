import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/site/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Abdul Moiz — Full-Stack Web Developer" },
    { name: "description", content: "Abdul Moiz's portfolio: React web experiences, Node.js backend systems, selected projects and certifications. Based in Karachi, Pakistan." },
    { property: "og:title", content: "Abdul Moiz — Full-Stack Web Developer" },
    { property: "og:description", content: "Explore Abdul Moiz's web development projects, technical skills and certifications. Let's build something meaningful." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Portfolio,
});
