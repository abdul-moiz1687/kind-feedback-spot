import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Soft, flowing ribbons stay behind the page without crossing over its content. */
export function AnimatedBackground() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const leftWave: [string, string, string] = [
    "M -160 -120 C 480 60 -240 390 230 620 C 440 730 190 950 -160 1020 L -280 1020 C 80 720 160 780 -70 560 C -420 280 180 100 -280 -120 Z",
    "M -160 -120 C 160 170 350 300 70 590 C -100 770 440 850 -160 1020 L -280 1020 C 140 800 -270 740 -100 510 C 130 230 -80 160 -280 -120 Z",
    "M -160 -120 C 480 60 -240 390 230 620 C 440 730 190 950 -160 1020 L -280 1020 C 80 720 160 780 -70 560 C -420 280 180 100 -280 -120 Z",
  ];
  const rightWave: [string, string, string] = [
    "M 1580 -120 C 1090 120 1630 300 1250 540 C 1060 670 1280 900 1580 1020 L 1710 1020 C 1440 760 1300 680 1430 500 C 1790 200 1330 80 1710 -120 Z",
    "M 1580 -120 C 1340 100 1040 340 1390 570 C 1620 750 1120 840 1580 1020 L 1710 1020 C 1350 770 1730 660 1540 470 C 1290 230 1550 80 1710 -120 Z",
    "M 1580 -120 C 1090 120 1630 300 1250 540 C 1060 670 1280 900 1580 1020 L 1710 1020 C 1440 760 1300 680 1430 500 C 1790 200 1330 80 1710 -120 Z",
  ];
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" data-animated-background>
        <svg key={reduce ? "still" : "flowing"} className="ambient-waves absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <motion.path className="text-primary" fill="currentColor" opacity="0.18" d={leftWave[0]}
            animate={reduce ? false : { d: leftWave }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path className="text-primary" fill="currentColor" opacity="0.08" d={leftWave[1]}
            animate={reduce ? false : { d: [leftWave[1], leftWave[0], leftWave[1]] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path className="text-success" fill="currentColor" opacity="0.14" d={rightWave[0]}
            animate={reduce ? false : { d: rightWave }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path className="text-success" fill="currentColor" opacity="0.06" d={rightWave[1]}
            animate={reduce ? false : { d: [rightWave[1], rightWave[0], rightWave[1]] }}
            transition={{ duration: 23, repeat: Infinity, ease: "easeInOut" }} />
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
