import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  Award,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { about, certifications, education, ongoingTraining, profile } from "@/data/site";
import portrait from "@/assets/abdul-moiz.png";
import { Navbar } from "./Navbar";
import { Reveal, SectionHeader, ext } from "./ui";
import { Projects } from "./Projects";
import { Contact } from "./Contact";
import { SocialLinks } from "./icons";
import { Skills } from "./Skills";
import { Footer } from "./Footer";
import { AnimatedBackground, CursorFollower } from "./Effects";
import { TypedRole } from "./TypedRole";

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    let frameId = 0;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const startTime = performance.now();
      const duration = 900;

      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        setCount(Math.round(target * easedProgress));
        if (progress < 1) frameId = requestAnimationFrame(animate);
      };

      frameId = requestAnimationFrame(animate);
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
      return () => cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        start();
        observer.disconnect();
      }
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [target]);

  return <span ref={counterRef}>{String(count).padStart(2, "0")}</span>;
}

export function Portfolio() {
  return (
    <div id="top" className="relative isolate">
      <AnimatedBackground />
      <CursorFollower />
      <Navbar />
      <main id="main">
        <section className="portfolio-hero relative isolate overflow-hidden border-b border-border">
          <div className="container-site relative flex flex-col justify-center pb-12 pt-36 md:pb-16 md:pt-40">
            <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between md:gap-16">
              <Reveal className="hero-copy">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Hello, I'm</p>
                <h1 className="hero-name mt-4 font-semibold leading-[1.05]">Abdul Moiz</h1>
                <p className="mt-3 font-display text-2xl font-semibold sm:text-3xl"><TypedRole text={profile.role} /></p>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{profile.tagline}</p>
                <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="h-12"><a href="#projects">View my work<ArrowUpRight /></a></Button><Button asChild variant="outline" size="lg" className="h-12"><a href={profile.cvPath} download={profile.cvFilename}>Download CV<ArrowDownToLine /></a></Button></div>
                <div className="mt-6"><SocialLinks /><span className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><MapPin size={14} />{profile.location}</span></div>
              </Reveal>
              <Reveal delay={0.12} className="hero-photo shrink-0 self-center">
                <div className="relative">
                  <div aria-hidden="true" className="absolute -inset-3 rounded-2xl border border-border bg-surface/60" />
                  <img src={portrait} alt="Abdul Moiz" className="relative aspect-[4/5] w-full rounded-xl border border-border-strong object-cover object-top" fetchPriority="high" />
                </div>
              </Reveal>
            </div>
            <div className="mt-12 flex items-end justify-between border-t border-border pt-6"><p className="font-mono text-xs text-muted-foreground">FRONTEND PRECISION. BACKEND THINKING.</p><a href="#about" aria-label="Scroll to About" className="ml-4 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-strong text-muted-foreground"><ArrowDown size={16} /></a></div>
          </div>
        </section>
<section id="about" className="py-20 md:py-28"><div className="container-site"><SectionHeader index="01" eyebrow="A little about me" title={<>Thoughtful design.<br />Reliable development.</>} />
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
            <Reveal className="mx-auto w-full max-w-[360px]">
              <div className="relative">
                <div aria-hidden="true" className="absolute -left-4 -top-4 h-full w-full rounded-2xl border-2 border-primary/40" />
                <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl">
                  <img src={portrait} alt="Abdul Moiz portrait" loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl border border-border bg-background/85 px-4 py-3 backdrop-blur">
                    <div><p className="font-display text-sm font-semibold">Abdul Moiz</p><p className="text-xs text-muted-foreground">{profile.role}</p></div>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin size={12} className="text-primary" />Karachi</span>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5">{about.paragraphs.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}</div>
              <div className="mt-8 rounded-2xl border border-border bg-surface/60 p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-primary">My approach</h3>
                <p className="mt-3 text-base leading-8">{about.approach}</p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[["12", "Projects"], ["08", "Certificates"], ["MERN", "Stack"]].map(([n, l]) => <div key={l} className="rounded-xl border border-border p-4 text-center"><p className="font-display text-2xl font-semibold text-primary sm:text-3xl">{/^\d+$/.test(n) ? <Counter target={Number(n)} /> : n}</p><p className="mt-1 text-xs text-muted-foreground">{l}</p></div>)}
              </div>
              <div className="mt-8 flex flex-wrap gap-3"><Button asChild><a href="#contact">Let's talk<ArrowUpRight /></a></Button><Button asChild variant="outline"><a href={profile.cvPath} download={profile.cvFilename}>Download CV<ArrowDownToLine /></a></Button></div>
            </Reveal>
          </div></div></section>
        <Projects />
        <Skills />
        <section id="education" className="border-t border-border py-20 md:py-28"><div className="container-site"><SectionHeader index="04" eyebrow="Education" title="A foundation for what's next." />{education.map((e) => <Reveal key={e.school} className="grid gap-4 border-t border-border py-7 md:grid-cols-[1fr_2fr]"><p className="font-mono text-xs text-muted-foreground">{e.period}</p><div><h3 className="flex items-start gap-3 text-xl font-semibold"><GraduationCap className="mt-1 h-5 w-5 shrink-0 text-primary" />{e.program}</h3><p className="mt-2 text-sm text-muted-foreground">{e.school}</p>{e.status && <span className="mt-3 inline-block text-xs text-success">{e.status}</span>}</div></Reveal>)}<div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-7"><div><p className="text-sm font-medium">{ongoingTraining.title}</p><p className="mt-1 text-sm text-muted-foreground">{ongoingTraining.issuer}</p></div><span className="rounded-md bg-accent px-3 py-1.5 text-xs text-accent-foreground">{ongoingTraining.status}</span></div></div></section>
        <section id="certifications" className="border-t border-border py-20 md:py-28"><div className="container-site"><SectionHeader index="05" eyebrow="Certifications" title="Learning, put into practice." intro="Credentials across web development, technology, and business." /><div className="grid gap-4 md:grid-cols-2">{certifications.map((c, i) => <Reveal key={c.file} delay={i * 0.04}><a href={c.file} {...ext} className="group flex h-full items-start gap-4 rounded-lg border border-border p-6 transition-colors hover:border-border-strong hover:bg-surface"><Award className="mt-1 h-6 w-6 shrink-0 text-primary" /><div className="min-w-0 flex-1"><h3 className="text-base font-semibold leading-snug">{c.title}</h3><p className="mt-3 text-sm text-muted-foreground">{c.issuer}</p><p className="mt-2 font-mono text-[11px] text-muted-foreground">{c.date}</p></div><ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" /></a></Reveal>)}</div></div></section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}