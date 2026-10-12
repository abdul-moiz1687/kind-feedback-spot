import { ArrowDown, ArrowDownToLine, ArrowUpRight, Award, Braces, Database, Github, GraduationCap, Linkedin, MapPin, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { certifications, education, ongoingTraining, profile, socials } from "@/data/site";
import portrait from "@/assets/abdul-moiz.png.asset.json";
import { Navbar } from "./Navbar";
import { Reveal, SectionHeader, ext } from "./ui";
import { Projects } from "./Projects";
import { Contact } from "./Contact";

const skillGroups = [
  { title: "Frontend", icon: Braces, skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Responsive Design"] },
  { title: "Backend & Data", icon: Database, skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Authentication", "Firebase"] },
  { title: "Tools & Workflow", icon: Terminal, skills: ["Git", "GitHub", "Vite", "VS Code", "Postman", "Vercel", "Netlify"] },
];

export function Portfolio() {
  return (
    <div id="top">
      <Navbar />
      <main id="main">
        <section className="portfolio-hero relative isolate overflow-hidden border-b border-border">
          <div className="hero-photo absolute inset-y-0 right-0 -z-20"><img src={portrait.url} alt="Abdul Moiz" className="h-full w-full object-cover object-top" fetchPriority="high" /></div>
          <div className="hero-shade absolute inset-0 -z-10" />
          <div className="container-site relative pb-14 pt-36 md:pb-20 md:pt-44">
            <Reveal className="max-w-2xl">
              <p className="eyebrow mb-6 flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-success" />Full-Stack Web Developer</p>
              <h1 className="hero-name font-semibold leading-[1.03]">Abdul<br /><span className="text-primary">Moiz.</span></h1>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">{profile.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="h-12"><a href="#projects">View my work<ArrowUpRight /></a></Button><Button asChild variant="outline" size="lg" className="h-12"><a href={profile.cvPath} download={profile.cvFilename}>Download CV<ArrowDownToLine /></a></Button></div>
              <div className="mt-8 flex items-center gap-5"><a href={socials.github} {...ext} aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-primary"><Github size={20} /></a><a href={socials.linkedin} {...ext} aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-primary"><Linkedin size={20} /></a><span className="h-5 w-px bg-border-strong" /><span className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin size={14} />{profile.location}</span></div>
            </Reveal>
            <div className="mt-14 flex items-end justify-between border-t border-border pt-6"><p className="font-mono text-xs text-muted-foreground">FRONTEND PRECISION. BACKEND THINKING.</p><a href="#about" aria-label="Scroll to About" className="ml-4 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-strong text-muted-foreground"><ArrowDown size={16} /></a></div>
          </div>
        </section>
        <section id="about" className="py-20 md:py-28"><div className="container-site"><SectionHeader index="01" eyebrow="A little about me" title={<>Thoughtful design.<br />Reliable development.</>} /><div className="grid gap-10 md:grid-cols-2 md:gap-20"><Reveal><p className="text-lg leading-relaxed">I'm Abdul Moiz, a full-stack web developer based in Karachi, Pakistan. I build modern web experiences with a focus on clean interfaces and practical functionality.</p><p className="mt-5 leading-relaxed text-muted-foreground">My work spans React frontends, e-commerce applications, and Node.js backends. I enjoy connecting the details people see with the systems that make everything work.</p></Reveal><Reveal delay={0.1} className="grid grid-cols-2 gap-6"><div className="border-t border-border-strong pt-5"><p className="font-display text-4xl font-semibold text-primary">09</p><p className="mt-2 text-sm text-muted-foreground">Featured projects</p></div><div className="border-t border-border-strong pt-5"><p className="font-display text-4xl font-semibold text-primary">06</p><p className="mt-2 text-sm text-muted-foreground">Certifications</p></div><div className="col-span-2 border-t border-border-strong pt-5"><p className="eyebrow mb-3">My approach</p><p className="text-sm leading-relaxed text-muted-foreground">Understand the problem. Keep the experience simple. Build with care.</p></div></Reveal></div></div></section>
        <Projects />
        <section id="skills" className="border-t border-border bg-surface py-20 md:py-28"><div className="container-site"><SectionHeader index="03" eyebrow="Technical toolkit" title="The tools behind the work." intro="From the first interface to the final API, a practical stack for building complete web applications." /><div className="grid gap-10 md:grid-cols-3">{skillGroups.map(({ title, icon: Icon, skills }, i) => <Reveal key={title} delay={i * 0.08}><Icon size={28} className="mb-5 text-primary" /><h3 className="mb-6 text-xl font-semibold">{title}</h3><ul className="space-y-3">{skills.map((skill) => <li key={skill} className="flex items-center gap-3 border-b border-border pb-3 text-sm text-muted-foreground"><span className="h-1 w-1 bg-primary" />{skill}</li>)}</ul></Reveal>)}</div></div></section>
        <section id="education" className="border-t border-border py-20 md:py-28"><div className="container-site"><SectionHeader index="04" eyebrow="Education" title="A foundation for what's next." />{education.map((e) => <Reveal key={e.school} className="grid gap-4 border-t border-border py-7 md:grid-cols-[1fr_2fr]"><p className="font-mono text-xs text-muted-foreground">{e.period}</p><div><h3 className="flex items-start gap-3 text-xl font-semibold"><GraduationCap className="mt-1 h-5 w-5 shrink-0 text-primary" />{e.program}</h3><p className="mt-2 text-sm text-muted-foreground">{e.school}</p>{e.status && <span className="mt-3 inline-block text-xs text-success">{e.status}</span>}</div></Reveal>)}<div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-7"><div><p className="text-sm font-medium">{ongoingTraining.title}</p><p className="mt-1 text-sm text-muted-foreground">{ongoingTraining.issuer}</p></div><span className="rounded-md bg-accent px-3 py-1.5 text-xs text-accent-foreground">{ongoingTraining.status}</span></div></div></section>
        <section id="certifications" className="border-t border-border py-20 md:py-28"><div className="container-site"><SectionHeader index="05" eyebrow="Certifications" title="Learning, put into practice." intro="Credentials across web development, technology, and business." /><div className="grid gap-4 md:grid-cols-2">{certifications.map((c, i) => <Reveal key={c.file} delay={i * 0.04}><a href={c.file} {...ext} className="group flex h-full items-start gap-4 rounded-lg border border-border p-6 transition-colors hover:border-border-strong hover:bg-surface"><Award className="mt-1 h-6 w-6 shrink-0 text-primary" /><div className="min-w-0 flex-1"><h3 className="text-base font-semibold leading-snug">{c.title}</h3><p className="mt-3 text-sm text-muted-foreground">{c.issuer}</p><p className="mt-2 font-mono text-[11px] text-muted-foreground">{c.date}</p></div><ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" /></a></Reveal>)}</div></div></section>
        <Contact />
      </main>
      <footer className="border-t border-border py-8"><div className="container-site flex flex-wrap items-center justify-between gap-4"><p className="font-display text-sm font-semibold">Abdul Moiz<span className="text-primary">.</span></p><p className="text-xs text-muted-foreground">© 2026 Abdul Moiz. All rights reserved.</p><a href="#top" className="flex items-center gap-2 text-xs text-muted-foreground">Back to top<ArrowUpRight size={14} /></a></div></footer>
    </div>
  );
}