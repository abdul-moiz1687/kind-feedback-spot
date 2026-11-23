import { useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, Code2, ExternalLink, Github, Layers, ShoppingBag } from "lucide-react";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeader, ext } from "./ui";
import shopco from "@/assets/projects/shopco.jpg";
import maintainiq from "@/assets/projects/maintainiq.jpg";
import timenest from "@/assets/projects/timenest.jpg";
import applio from "@/assets/projects/applio.jpg";
import voido from "@/assets/projects/void.jpg";
import shopflow from "@/assets/projects/shopflow.jpg";
import campusConnect from "@/assets/projects/campus-connect.jpg";
import electroshop from "@/assets/projects/electroshop.jpg";
import portfolioShot from "@/assets/projects/moizdev-portfolio.jpg";
import firebite from "@/assets/projects/firebite.png";

const filters = ["All", "Full-Stack", "Frontend", "Backend"] as const;
const images: Record<string, string> = {
  FIREBITE: firebite,
  "SHOP.CO": shopco,
  MaintainIQ: maintainiq,
  TimeNest: timenest,
  APPLIO: applio,
  "VOIDØ": voido,
  ShopFlow: shopflow,
  "Campus Connect": campusConnect,
  ElectroShop: electroshop,
  "React Portfolio App": portfolioShot,
};

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [showAll, setShowAll] = useState(false);
  const filteredProjects = projects.filter((p) => filter === "All" || p.type === filter);
  const visibleProjects = filter === "All" && !showAll ? filteredProjects.slice(0, 4) : filteredProjects;

  return (
    <section id="projects" className="border-t border-border py-20 md:py-28">
      <div className="container-site">
        <SectionHeader index="02" eyebrow="Selected work" title={<>Ideas turned into<br />working products.</>} intro="A collection of web applications, commerce experiences, and practical backend systems." />
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {filters.map((item) => <Button key={item} variant={filter === item ? "default" : "outline"} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</Button>)}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((p, i) => {
            const projectNumber = String(projects.indexOf(p) + 1).padStart(2, "0");
            const preview = images[p.title]
              ? <img src={images[p.title]} alt={`${p.title} website screenshot`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
              : <div className="flex h-full flex-col justify-between p-6"><div className="flex items-center justify-between text-muted-foreground"><span className="font-mono text-xs">PROJECT / {projectNumber}</span>{p.type === "Backend" ? <Code2 size={24} /> : p.subtitle.toLowerCase().includes("commerce") || p.subtitle.includes("Store") ? <ShoppingBag size={24} /> : <Layers size={24} />}</div><div><p className="font-display text-3xl font-semibold text-foreground">{p.title}</p><p className="mt-2 text-sm text-muted-foreground">{p.subtitle}</p></div><div className="h-px bg-primary/50" /></div>;
            return (
            <Reveal key={p.title} delay={Math.min(i * 0.04, 0.15)} className="h-full">
              <article
                className="project-card group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card"
                onMouseMove={(event) => {
                  const bounds = event.currentTarget.getBoundingClientRect();
                  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                  event.currentTarget.style.setProperty("--tilt-x", `${y * -5}deg`);
                  event.currentTarget.style.setProperty("--tilt-y", `${x * 6}deg`);
                  event.currentTarget.style.setProperty("--glare-x", `${(x + 0.5) * 100}%`);
                  event.currentTarget.style.setProperty("--glare-y", `${(y + 0.5) * 100}%`);
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.setProperty("--tilt-x", "0deg");
                  event.currentTarget.style.setProperty("--tilt-y", "0deg");
                  event.currentTarget.style.setProperty("--glare-x", "50%");
                  event.currentTarget.style.setProperty("--glare-y", "50%");
                }}
              >
                <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3"><span className="flex gap-1.5" aria-hidden="true"><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="h-1.5 w-1.5 rounded-full bg-border-strong" /><span className="h-1.5 w-1.5 rounded-full bg-border-strong" /></span><span className="font-mono text-[10px] text-muted-foreground">PROJECT {projectNumber}</span><span className="font-mono text-[10px] text-primary">{p.type}</span></div>
                {p.url ? <a href={p.url} {...ext} aria-label={`Open ${p.title}`} className="relative block aspect-[1.5] overflow-hidden border-b border-border bg-surface">{preview}<span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-md border border-border bg-background text-foreground"><ArrowUpRight size={18} /></span></a> : <div className="aspect-[1.5] overflow-hidden border-b border-border bg-surface">{preview}</div>}
                <div className="flex flex-1 flex-col p-5"><h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mb-3 mt-2 text-sm font-medium text-primary">{p.subtitle}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <ul className="mb-6 mt-5 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="rounded border border-border bg-surface px-2 py-1 font-mono text-[10px] text-muted-foreground">{t}</li>)}</ul>
                <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4">{p.url ? <Button asChild variant="ghost" className="h-9 px-0 text-foreground hover:bg-transparent hover:text-primary"><a href={p.url} {...ext}>View project<ExternalLink size={15} /></a></Button> : p.repo ? <Button asChild variant="ghost" className="h-9 px-0 text-foreground hover:bg-transparent hover:text-primary"><a href={p.repo} {...ext}><Github size={15} />View source</a></Button> : null}{p.url && p.repo && <Button asChild variant="outline" size="icon"><a href={p.repo} {...ext} aria-label={`${p.title} source code`}><Github size={16} /></a></Button>}</div></div>
              </article>
            </Reveal>
          );})}
        </div>
        {filter === "All" && <div className="mt-10 flex justify-center">
          <Button variant="outline" className="group gap-2" onClick={() => setShowAll((current) => !current)} aria-expanded={showAll}>
            {showAll ? <>Show fewer projects<ArrowUp size={16} /></> : <>View all projects ({projects.length})<ArrowDown className="transition-transform duration-300 group-hover:translate-y-0.5" size={16} /></>}
          </Button>
        </div>}
      </div>
    </section>
  );
}