import { motion, useReducedMotion } from "motion/react";
import type { ReactNode, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({ index, eyebrow, title, intro }: { index: string; eyebrow: string; title: ReactNode; intro?: string }) {
  return (
    <Reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
      <div>
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span className="text-primary">{index}</span>
          <span className="h-px w-8 bg-border-strong" />
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-5xl">{title}</h2>
      </div>
      {intro && <p className="max-w-md text-muted-foreground md:justify-self-end">{intro}</p>}
    </Reveal>
  );
}

const variants = {
  primary: "bg-primary text-primary-foreground hover:brightness-110",
  outline: "border border-border-strong text-foreground hover:bg-muted",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-muted",
};

type BtnProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: keyof typeof variants };

export function ButtonLink({ variant = "primary", className, children, ...props }: BtnProps) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition-[filter,background-color]",
        variants[variant],
        className,
      )}
      {...(props as object)}
    >
      {children}
    </motion.a>
  );
}

export const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
