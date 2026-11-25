import { useEffect, useRef } from "react";

type Point3D = { x: number; y: number; z: number };
type ProjectedPoint = { x: number; y: number; depth: number };
type Face = [number, number, number];

const goldenRatio = (1 + Math.sqrt(5)) / 2;
const vertexCoordinates: [number, number, number][] = [
  [-1, goldenRatio, 0],
  [1, goldenRatio, 0],
  [-1, -goldenRatio, 0],
  [1, -goldenRatio, 0],
  [0, -1, goldenRatio],
  [0, 1, goldenRatio],
  [0, -1, -goldenRatio],
  [0, 1, -goldenRatio],
  [goldenRatio, 0, -1],
  [goldenRatio, 0, 1],
  [-goldenRatio, 0, -1],
  [-goldenRatio, 0, 1],
];
const vertices: Point3D[] = vertexCoordinates.map(([x, y, z]) => {
  const length = Math.hypot(x, y, z);
  return { x: x / length, y: y / length, z: z / length };
});

const faces: Face[] = [
  [0, 11, 5],
  [0, 5, 1],
  [0, 1, 7],
  [0, 7, 10],
  [0, 10, 11],
  [1, 5, 9],
  [5, 11, 4],
  [11, 10, 2],
  [10, 7, 6],
  [7, 1, 8],
  [3, 9, 4],
  [3, 4, 2],
  [3, 2, 6],
  [3, 6, 8],
  [3, 8, 9],
  [4, 9, 5],
  [2, 4, 11],
  [6, 2, 10],
  [8, 6, 7],
  [9, 8, 1],
];

const edgeMap = new Map<string, [number, number]>();
for (const [a, b, c] of faces) {
  for (const [start, end] of [
    [a, b],
    [b, c],
    [c, a],
  ] as [number, number][]) {
    const key = start < end ? `${start}-${end}` : `${end}-${start}`;
    edgeMap.set(key, [start, end]);
  }
}
const edges = Array.from(edgeMap.values());

export function HeroMesh3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let radius = 0;
    let rotationX = -0.2;
    let rotationY = 0;
    let rotationZ = 0;
    let tiltX = 0;
    let tiltY = 0;
    let tiltVelocityX = 0;
    let tiltVelocityY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let isVisible = false;
    let frameId: number | null = null;
    let lastFrameTime = 0;
    const primary = getComputedStyle(canvas).getPropertyValue("--primary").trim();

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      radius = Math.min(width, height) * 0.34;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      render(performance.now());
    };

    const project = (point: Point3D): ProjectedPoint => {
      const cosX = Math.cos(rotationX + tiltX);
      const sinX = Math.sin(rotationX + tiltX);
      const cosY = Math.cos(rotationY + tiltY);
      const sinY = Math.sin(rotationY + tiltY);
      const cosZ = Math.cos(rotationZ);
      const sinZ = Math.sin(rotationZ);

      const rotatedX = point.x * cosY - point.z * sinY;
      const rotatedZ = point.x * sinY + point.z * cosY;
      const rotatedY = point.y * cosX - rotatedZ * sinX;
      const tiltedDepth = point.y * sinX + rotatedZ * cosX;
      const x = rotatedX * cosZ - rotatedY * sinZ;
      const y = rotatedX * sinZ + rotatedY * cosZ;
      const perspective = 1.7 / (1.7 - tiltedDepth * 0.28);

      return {
        x: width / 2 + x * radius * perspective,
        y: height / 2 + y * radius * perspective,
        depth: tiltedDepth,
      };
    };

    const render = (time: number) => {
      if (width <= 0 || height <= 0) return;
      const pulse = motionPreference.matches ? 1 : 0.94 + Math.sin(time * 0.0012) * 0.06;
      const projected = vertices.map(project);

      context.clearRect(0, 0, width, height);
      context.lineWidth = 0.8;
      context.strokeStyle = primary;
      context.shadowColor = primary;
      context.shadowBlur = 7 * pulse;

      for (const [start, end] of edges) {
        const from = projected[start];
        const to = projected[end];
        if (!from || !to) continue;
        context.globalAlpha = (0.18 + (from.depth + to.depth + 2) * 0.16) * pulse;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
      }

      context.fillStyle = primary;
      for (const point of projected) {
        context.globalAlpha = (0.45 + (point.depth + 1) * 0.25) * pulse;
        context.beginPath();
        context.arc(point.x, point.y, 1.8 + (point.depth + 1) * 0.65, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;
    };

    const scheduleFrame = () => {
      if (isVisible && !motionPreference.matches && frameId === null) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const animate = (time: number) => {
      frameId = null;
      if (!isVisible || motionPreference.matches) return;

      const delta = Math.min((time - lastFrameTime) / 1000, 0.05);
      lastFrameTime = time;
      rotationX += delta * 0.14;
      rotationY += delta * 0.24;
      rotationZ += delta * 0.08;

      const spring = 22;
      const damping = Math.exp(-7 * delta);
      tiltVelocityX += (targetTiltX - tiltX) * spring * delta;
      tiltVelocityY += (targetTiltY - tiltY) * spring * delta;
      tiltVelocityX *= damping;
      tiltVelocityY *= damping;
      tiltX += tiltVelocityX * delta;
      tiltY += tiltVelocityY * delta;

      render(time);
      scheduleFrame();
    };

    const updatePointerTilt = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const isInside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      targetTiltX = isInside ? ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.35 : 0;
      targetTiltY = isInside ? ((event.clientX - bounds.left) / bounds.width - 0.5) * -0.45 : 0;
    };

    const resetPointerTilt = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    const updateMotionPreference = () => {
      render(performance.now());
      if (motionPreference.matches) {
        if (frameId !== null) cancelAnimationFrame(frameId);
        frameId = null;
      } else {
        lastFrameTime = performance.now();
        scheduleFrame();
      }
    };

    const handleVisibility = (visible: boolean) => {
      isVisible = visible;
      if (visible) {
        lastFrameTime = performance.now();
        render(lastFrameTime);
        scheduleFrame();
      } else if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    resize();
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    resizeObserver?.observe(canvas);
    if (!resizeObserver) window.addEventListener("resize", resize);

    const visibilityObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry) handleVisibility(entry.isIntersecting);
          });
    if (visibilityObserver) {
      visibilityObserver.observe(canvas);
    } else {
      handleVisibility(true);
    }

    window.addEventListener("pointermove", updatePointerTilt, { passive: true });
    window.addEventListener("pointerleave", resetPointerTilt);
    motionPreference.addEventListener("change", updateMotionPreference);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointerTilt);
      window.removeEventListener("pointerleave", resetPointerTilt);
      motionPreference.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute -inset-16 z-0">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
