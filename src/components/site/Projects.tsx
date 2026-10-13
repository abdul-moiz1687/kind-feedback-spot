import { useState } from "react";
import { ArrowUpRight, Code2, Layers, ShoppingBag } from "lucide-react";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeader, ext } from "./ui";
import shopco from "@/assets/projects/shopco.jpg.asset.json";
import maintainiq from "@/assets/projects/maintainiq.jpg.asset.json";
import timenest from "@/assets/projects/timenest.jpg.asset.json";
import applio from "@/assets/projects/applio.jpg.asset.json";
import voido from "@/assets/projects/void.jpg.asset.json";
import shopflow from "@/assets/projects/shopflow.jpg.asset.json";
import campusConnect from "@/assets/projects/campus-connect.jpg.asset.json";
import electroshop from "@/assets/projects/electroshop.jpg.asset.json";
import portfolioShot from "@/assets/projects/moizdev-portfolio.jpg.asset.json";

const filters = ["All", "Full-Stack", "Frontend", "Backend"] as const;
const images: Record<string, string> = {
  "SHOP.CO": shopco.url,
  MaintainIQ: maintainiq.url,
  TimeNest: timenest.url,
  Applio: applio.url,
  "VOIDØ": voido.url,
  ShopFlow: shopflow.url,
  "Campus Connect": campusConnect.url,
  ElectroShop: electroshop.url,
  "React Portfolio App": portfolioShot.url,
};

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  return (
    <section id="projects" className="border-t border-border py-20 md:py-28">
      <div className="container-site">
        <SectionHeader index="02" eyebrow="Selected work" title={<>Ideas turned into<br />working products.</>} intro="A collection of web applications, commerce experiences, and practical backend systems." />
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {filters.map((item) => <Button key={item} variant={filter === item ? "default" : "outline"} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</Button>)}
        </div>
        <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.filter((p) => filter === "All" || p.type === filter).map((p, i) => (
            <Reveal key={p.title} delay={Math.min(i * 0.04, 0.15)}>
              <article className="group h-full">
                <a href={p.url} {...ext} aria-label={`Open ${p.title}`} className="relative mb-5 block aspect-[1.5] overflow-hidden rounded-lg border border-border bg-surface">
                  {images[p.title] ? <img src={images[p.title]} alt={`${p.title} website screenshot`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" /> : <div className="flex h-full flex-col justify-between p-6"><div className="flex items-center justify-between text-muted-foreground"><span className="font-mono text-xs">PROJECT / {String(projects.indexOf(p) + 1).padStart(2, "0")}</span>{p.type === "Backend" ? <Code2 size={24} /> : p.subtitle.toLowerCase().includes("commerce") || p.subtitle.includes("Store") ? <ShoppingBag size={24} /> : <Layers size={24} />}</div><div><p className="font-display text-3xl font-semibold text-foreground">{p.title}</p><p className="mt-2 text-sm text-muted-foreground">{p.subtitle}</p></div><div className="h-px bg-primary/50" /></div>}
                  <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-md border border-border bg-background text-foreground"><ArrowUpRight size={18} /></span>
                </a>
                <div className="mb-3 flex items-start justify-between gap-2"><h3 className="text-xl font-semibold">{p.title}</h3><span className="shrink-0 rounded border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground">{p.type}</span></div>
                <p className="mb-3 text-sm font-medium text-foreground">{p.subtitle}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">{p.tech.map((t) => <li key={t} className="font-mono text-[11px] text-accent-foreground">{t}</li>)}</ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}