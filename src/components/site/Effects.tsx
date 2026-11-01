import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "motion/react";

const particles = Array.from({ length: 72 }, (_, i) => ({
  x: (i * 233 + 47) % 1440,
  y: (i * 157 + 61) % 900,
  radius: i % 9 === 0 ? 3 : i % 3 === 0 ? 2 : 1.25,
  drift: 24 + (i * 7) % 55,
  duration: 12 + i % 13,
}));

/** Floating particles remain behind content without capturing interactions. */
export function AnimatedBackground() {
  const preference = useReducedMotion();
  const [reduce, setReduce] = useState(preference);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, { stiffness: 35, damping: 18 });
  const driftY = useSpring(pointerY, { stiffness: 35, damping: 18 });

  useEffect(() => {
    if (reduce) { pointerX.set(0); pointerY.set(0); return; }
    const move = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 32);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 24);
    };
    const reset = () => { pointerX.set(0); pointerY.set(0); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });
    window.addEventListener("pointerup", reset, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      window.removeEventListener("pointerup", reset);
      window.removeEventListener("blur", reset);
    };
  }, [reduce, pointerX, pointerY]);

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" data-animated-background>
        <svg key={reduce ? "still" : "floating"} className="ambient-particles absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <motion.g data-particle-layer style={{ x: reduce ? 0 : driftX, y: reduce ? 0 : driftY }}>
            {particles.map((particle, i) => (
              <motion.circle key={i} data-particle cx={particle.x} cy={particle.y} r={particle.radius}
                className={i % 3 === 0 ? "text-success" : i % 5 === 0 ? "text-muted-foreground" : "text-primary"}
                fill="currentColor" opacity={0.45}
                animate={reduce ? false : {
                  cx: [particle.x, particle.x + (i % 2 ? -1 : 1) * particle.drift, particle.x],
                  cy: [particle.y, particle.y - particle.drift, particle.y],
                  opacity: [0.3, 0.75, 0.3],
                }}
                transition={{ duration: particle.duration, repeat: Infinity, ease: "easeInOut" }} />
            ))}
          </motion.g>
        </svg>
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
