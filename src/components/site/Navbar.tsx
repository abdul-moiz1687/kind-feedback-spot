import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { navLinks, profile } from "@/data/site";
import { Monogram } from "./Brand";
import { ThemeSelector } from "./theme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors",
        "bg-background/85 backdrop-blur-md",
        scrolled || open ? "border-border" : "border-transparent",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <nav className="container-site flex h-16 items-center justify-between gap-4" aria-label="Main">
        <a href="#top" className="group flex min-w-0 items-center gap-3" aria-label={`${profile.name} — home`}>
          <span className="brand-tag rounded-md border border-border-strong bg-surface px-2.5 py-1 text-base transition-colors group-hover:border-primary">
            <span className="text-primary">&lt;</span>AM<span className="text-primary"> /&gt;</span>
          </span>
          <span className="hidden truncate font-display text-sm font-semibold sm:inline">{profile.name}</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm transition-colors",
                  active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
                {active === l.id && (
                  <motion.span layoutId="nav-dot" className="absolute inset-x-3 -bottom-0.5 h-px bg-primary" />
                )}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeSelector />
          <Button asChild className="hidden h-10 sm:inline-flex"><a href="#contact">
            Let's talk
          </a></Button>
          <Button
            variant="outline"
            ref={toggleRef}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>
      <motion.div className="h-px origin-left bg-primary" style={{ scaleX: progress }} aria-hidden="true" />
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <ul className="container-site flex flex-col py-4">
              {navLinks.map((l, i) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    autoFocus={i === 0}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-border py-4 font-display text-xl"
                  >
                    {l.label}
                    <span className="eyebrow">0{i + 1}</span>
                  </a>
                </li>
              ))}
              <li className="pt-5">
                <a href="#contact" onClick={() => setOpen(false)} className="flex h-12 items-center justify-center rounded-md bg-primary font-medium text-primary-foreground">
                  Let's talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
