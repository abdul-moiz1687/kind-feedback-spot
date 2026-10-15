import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Theme-aware moving circuit traces remain visible without obscuring content. */
export function AnimatedBackground() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const traces = useMemo(() => [
    "M -100 180 H 220 L 360 320 H 820 L 1020 120 H 1540",
    "M -100 640 H 180 L 380 440 H 960 L 1140 620 H 1540",
    "M 120 -100 V 100 L 280 260 V 580 L 120 740 V 1000",
    "M 1260 -100 V 220 L 1100 380 V 640 L 1260 800 V 1000",
    "M -100 820 H 520 L 680 660 H 880 L 1040 820 H 1540",
  ], []);
  const marks = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    left: 5 + (i * 37) % 90, top: (i * 53) % 100, dur: 7 + i % 4,
  })), []);
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" data-animated-background>
        <motion.div className="motion-grid absolute -inset-16 opacity-60"
          animate={reduce ? undefined : { x: [0, 56], y: [0, 56] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
          {traces.map((d, i) => <g key={d} className={i % 2 === 0 ? "text-primary" : "text-success"}>
            <path d={d} stroke="currentColor" strokeWidth="1" opacity="0.12" vectorEffect="non-scaling-stroke" />
            <motion.path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0.18, pathSpacing: 0.82, pathOffset: 0, opacity: 0.45 }}
              animate={reduce ? { opacity: 0.15 } : { pathOffset: [0, 1], opacity: [0.25, 0.65, 0.25] }}
              transition={{ duration: 6 + i, delay: i * -1.5, repeat: Infinity, ease: "linear" }} />
          </g>)}
        </svg>
        {marks.map((d, i) => <motion.span key={i} className="absolute font-mono text-lg text-primary/40"
          style={{ left: `${d.left}%`, top: `${d.top}%` }}
          animate={reduce ? undefined : { y: [16, -36, 16], opacity: [0.15, 0.6, 0.15], rotate: [0, 90, 0] }}
          transition={{ duration: d.dur, delay: i * -0.6, repeat: Infinity, ease: "easeInOut" }}>+</motion.span>)}
      </div>
      <motion.div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-primary" style={{ scaleX: reduce ? scrollYProgress : progress }} />
    </>
  );
}

/** Dot + trailing ring that follows the mouse, and the finger on touch screens. */
export function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });

  useEffect(() => {
    setEnabled(true);
    const isTarget = (t: EventTarget | null) => !!(t as HTMLElement | null)?.closest?.("a, button, [role='button'], input, textarea, select");
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setVisible(true); setHover(isTarget(e.target)); };
    let hideTimer = 0;
    const touch = (e: TouchEvent) => {
      const t = e.touches[0]; if (!t) return;
      x.set(t.clientX); y.set(t.clientY); setVisible(true); setHover(isTarget(e.target));
      window.clearTimeout(hideTimer);
    };
    const touchEnd = () => { hideTimer = window.setTimeout(() => setVisible(false), 900); };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("touchstart", touch, { passive: true });
    window.addEventListener("touchmove", touch, { passive: true });
    window.addEventListener("touchend", touchEnd, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchstart", touch);
      window.removeEventListener("touchmove", touch);
      window.removeEventListener("touchend", touchEnd);
      window.clearTimeout(hideTimer);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full border border-primary"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hover ? 52 : 34, height: hover ? 52 : 34, opacity: visible ? (hover ? 0.9 : 0.6) : 0 }}
        transition={{ duration: 0.2 }} />
      <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[60] h-1.5 w-1.5 rounded-full bg-primary"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }} animate={{ opacity: visible ? 1 : 0 }} />
    </>
  );
}
