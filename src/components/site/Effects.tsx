import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Drifting glow blobs + floating particles behind every section. Pure decoration. */
export function AnimatedBackground() {
  const dots = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    left: (i * 37) % 100, top: (i * 53) % 100, size: 2 + (i % 3) * 2, dur: 10 + (i % 5) * 3, delay: (i % 6) * 0.8,
  })), []);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <motion.div className="absolute left-[-15%] top-[-10%] h-[60vmax] w-[60vmax] rounded-full bg-primary/20 blur-3xl"
        animate={{ x: [0, 80, -40, 0], y: [0, 60, 120, 0], scale: [1, 1.15, 0.95, 1] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-[-20%] right-[-15%] h-[55vmax] w-[55vmax] rounded-full bg-primary/15 blur-3xl"
        animate={{ x: [0, -90, 30, 0], y: [0, -70, -20, 0], scale: [1, 0.9, 1.1, 1] }} transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute left-[35%] top-[35%] h-[35vmax] w-[35vmax] rounded-full bg-accent blur-3xl"
        animate={{ x: [0, 60, -60, 0], y: [0, -50, 40, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }} />
      {dots.map((d, i) => (
        <motion.span key={i} className="absolute rounded-full bg-primary/50"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
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
