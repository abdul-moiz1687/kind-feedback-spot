import { useEffect, useRef } from "react";

const techTags = [
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "WordPress",
  "Elementor",
  "SEO",
  "Firebase",
  "Git",
  "REST APIs",
  "Cloudinary",
  "JavaScript",
  "Bootstrap",
];

type Point = { x: number; y: number; z: number; label: string };
type ProjectedPoint = Point & { screenX: number; screenY: number; scale: number; alpha: number };

const points: Point[] = techTags.map((label, index) => {
  const y = 1 - (index / (techTags.length - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const theta = Math.PI * (3 - Math.sqrt(5)) * index;
  return { label, x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius };
});

export function TechSphere3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const colors = getComputedStyle(canvas);
    const primary = colors.getPropertyValue("--primary").trim();
    const surface = colors.getPropertyValue("--surface").trim();
    const border = colors.getPropertyValue("--border").trim();
    const muted = colors.getPropertyValue("--muted-foreground").trim();

    let width = 0;
    let height = 0;
    let radius = 0;
    let rotationX = -0.18;
    let rotationY = 0.45;
    let velocityX = 0;
    let velocityY = 0.002;
    let hoveredLabel: string | null = null;
    let dragging = false;
    let pointerId: number | null = null;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let frameId = 0;
    let lastTime = performance.now();

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      radius = Math.min(width, height) * 0.34;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const project = (point: Point): ProjectedPoint => {
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const x = point.x * cosY - point.z * sinY;
      const z = point.x * sinY + point.z * cosY;
      const y = point.y * cosX - z * sinX;
      const depth = point.y * sinX + z * cosX;
      const scale = 0.72 + (depth + 1) * 0.2;
      return {
        ...point,
        screenX: width / 2 + x * radius,
        screenY: height / 2 + y * radius,
        scale,
        alpha: 0.22 + (depth + 1) * 0.39,
        z: depth,
      };
    };

    const draw = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.67, 3);
      lastTime = time;
      if (!dragging && !hoveredLabel) {
        rotationX += velocityX * delta;
        rotationY += velocityY * delta;
        velocityX *= Math.pow(0.985, delta);
        velocityY = velocityY * Math.pow(0.985, delta) + 0.00005 * delta;
      }

      context.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const glow = context.createRadialGradient(
        centerX,
        centerY,
        radius * 0.1,
        centerX,
        centerY,
        radius * 1.15,
      );
      glow.addColorStop(0, primary);
      glow.addColorStop(0.65, primary);
      glow.addColorStop(1, "transparent");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
      context.fill();

      const projected = points.map(project).sort((a, b) => a.z - b.z);
      projected.forEach((point) => {
        const isHovered = point.label === hoveredLabel;
        const fontSize = Math.max(9, Math.min(15, 11 * point.scale));
        const paddingX = 10 * point.scale;
        const paddingY = 6 * point.scale;
        context.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        const textWidth = context.measureText(point.label).width;
        const boxWidth = textWidth + paddingX * 2;
        const boxHeight = fontSize + paddingY * 2;
        const x = point.screenX - boxWidth / 2;
        const y = point.screenY - boxHeight / 2;
        context.globalAlpha = isHovered ? 1 : point.alpha;
        context.shadowBlur = isHovered ? 24 : point.z > 0 ? 12 : 0;
        context.shadowColor = primary;
        context.fillStyle = isHovered ? primary : surface;
        context.strokeStyle = isHovered ? primary : border;
        context.lineWidth = isHovered ? 1.5 : 1;
        context.beginPath();
        context.roundRect(x, y, boxWidth, boxHeight, 7 * point.scale);
        context.fill();
        context.stroke();
        context.shadowBlur = 0;
        context.fillStyle = isHovered || point.z > 0 ? primary : muted;
        context.fillText(
          point.label,
          point.screenX - textWidth / 2,
          point.screenY + fontSize * 0.35,
        );
      });
      context.globalAlpha = 1;
      frameId = requestAnimationFrame(draw);
    };

    const getHovered = (clientX: number, clientY: number) => {
      const bounds = canvas.getBoundingClientRect();
      const x = clientX - bounds.left;
      const y = clientY - bounds.top;
      const hit = points
        .map(project)
        .filter((point) => point.z > -0.55)
        .reverse()
        .find((point) => Math.hypot(point.screenX - x, point.screenY - y) < 34 * point.scale);
      hoveredLabel = hit?.label ?? null;
    };

    const handlePointerDown = (event: PointerEvent) => {
      dragging = true;
      pointerId = event.pointerId;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (dragging && event.pointerId === pointerId) {
        const dx = event.clientX - lastPointerX;
        const dy = event.clientY - lastPointerY;
        rotationY += dx * 0.008;
        rotationX += dy * 0.008;
        velocityY = dx * 0.0015;
        velocityX = dy * 0.0015;
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
      }
      getHovered(event.clientX, event.clientY);
    };
    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerId === pointerId) {
        dragging = false;
        pointerId = null;
        canvas.releasePointerCapture(event.pointerId);
        canvas.style.cursor = "grab";
      }
    };
    const handlePointerLeave = () => {
      if (!dragging) hoveredLabel = null;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="tech-sphere-shell">
      <canvas
        ref={canvasRef}
        className="tech-sphere-canvas"
        role="img"
        aria-label={`Interactive 3D technology sphere featuring ${techTags.join(", ")}`}
      />
      <p className="sr-only">
        Drag to rotate the interactive technology sphere. Hover over a tag to highlight it.
      </p>
    </div>
  );
}
