import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Slow drifting glow blobs behind the page. Pure decoration. */
export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="bg-blob left-[-10%] top-[-10%] h-[45vw] w-[45vw] bg-primary/20" />
      <div className="bg-blob bg-blob-2 bottom-[-15%] right-[-10%] h-[40vw] w-[40vw] bg-primary/15" />
      <div className="bg-blob bg-blob-3 left-[40%] top-[40%] h-[30vw] w-[30vw] bg-accent" />
    </div>
  );
}

/** Dot + trailing ring that follows the mouse on pointer devices only. */
export function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [role='button'], input, textarea, select"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full border border-primary"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hover ? 52 : 34, height: hover ? 52 : 34, opacity: hover ? 0.9 : 0.6 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1.5 w-1.5 rounded-full bg-primary"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
