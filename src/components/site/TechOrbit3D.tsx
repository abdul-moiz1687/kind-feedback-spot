import { useState, type CSSProperties, type PointerEvent } from "react";
import {
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiWordpress,
} from "react-icons/si";

const orbitIcons = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "WordPress", Icon: SiWordpress },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
];

const orbitAngles = [0, 60, 120, 180, 240, 300];

export function TechOrbit3D() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: y * -10, y: x * 12 });
  };

  const handlePointerLeave = () => setTilt({ x: 0, y: 0 });
  const orbitStyle = {
    "--orbit-tilt-x": `${tilt.x}deg`,
    "--orbit-tilt-y": `${tilt.y}deg`,
  } as CSSProperties;

  return (
    <div
      className="tech-orbit"
      style={orbitStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Interactive 3D orbit of Abdul Moiz's technology stack"
      role="img"
    >
      <div className="tech-orbit-glow" aria-hidden="true" />
      <div className="tech-orbit-core" aria-hidden="true">
        <span>&lt;AM /&gt;</span>
      </div>
      <div className="tech-orbit-ring tech-orbit-ring-one" aria-hidden="true" />
      <div className="tech-orbit-ring tech-orbit-ring-two" aria-hidden="true" />
      <div className="tech-orbit-icons">
        {orbitIcons.map(({ name, Icon }, index) => (
          <span
            className={`tech-orbit-icon tech-orbit-icon-${index % 2}`}
            key={name}
            style={
              {
                "--orbit-angle": `${orbitAngles[index]}deg`,
                "--orbit-delay": `${index * -2.3}s`,
              } as CSSProperties
            }
            title={name}
          >
            <Icon aria-hidden="true" />
            <span className="sr-only">{name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
