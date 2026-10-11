import { useEffect, useRef, useState } from "react";
import { Palette, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { DEFAULT_THEME, themes, type ThemeId } from "@/data/site";

const KEY = "am-theme";

/** Inline script for <head>: applies the saved theme before paint. */
export const themeInitScript = `try{var t=localStorage.getItem("${KEY}");document.documentElement.setAttribute("data-theme",t||"${DEFAULT_THEME}")}catch(e){document.documentElement.setAttribute("data-theme","${DEFAULT_THEME}")}`;

export function ThemeSelector() {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme") as ThemeId | null;
    if (t && themes.some((x) => x.id === t)) setTheme(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const apply = (id: ThemeId) => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.setAttribute("data-theme", id);
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
    try {
      localStorage.setItem(KEY, id);
    } catch {
      /* ignore */
    }
    setTheme(id);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Choose color theme"
        className="grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
      >
        <Palette className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            role="radiogroup"
            aria-label="Color theme"
            className="absolute right-0 top-12 z-50 w-64 rounded-lg border border-border-strong bg-popover p-1.5 shadow-2xl"
          >
            <p className="eyebrow px-2.5 pb-1.5 pt-1">Theme</p>
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={theme === t.id}
                onClick={() => apply(t.id)}
                className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-sm hover:bg-muted"
              >
                <span className="flex shrink-0 overflow-hidden rounded-sm border border-border-strong">
                  {t.swatches.map((c) => (
                    <span key={c} className="h-5 w-3.5" style={{ background: c }} />
                  ))}
                </span>
                <span className="min-w-0 flex-1 truncate">{t.name}</span>
                {theme === t.id && <Check className="h-4 w-4 shrink-0 text-primary" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
