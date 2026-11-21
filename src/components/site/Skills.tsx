import { Braces, Database, Globe, Wrench } from "lucide-react";
import { skillGroups } from "@/data/site";
import { SkillIcon } from "./icons";
import { Reveal, SectionHeader } from "./ui";

const groupIcons = [Braces, Database, Globe, Wrench];

export function Skills() {
  return (
    <section id="skills" className="border-y border-border bg-surface/60 py-20 backdrop-blur-[2px] md:py-28">
      <div className="container-site">
        <SectionHeader index="03" eyebrow="Skills & technologies" title={<>The stack behind<br />the solutions.</>} intro="From responsive interfaces to backend services, CMS solutions, and API integrations — the technologies I use to build practical digital products." />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8 xl:grid-cols-4">
          {skillGroups.map(({ title, skills }, i) => {
            const GroupIcon = groupIcons[i] ?? Braces;
            return (
              <Reveal key={title} delay={i * 0.1}>
                <div className="mb-6 flex items-center gap-3 border-b border-border-strong pb-5">
                  <GroupIcon aria-hidden="true" className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <span className="ml-auto font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
                  {skills.map((skill) => (
                    <li key={skill} data-brand={skill} className="skill-tile flex min-h-28 flex-col items-start justify-center gap-3 rounded-lg border border-border bg-background/75 p-4">
                      <span data-brand={skill} className="skill-icon-well grid h-11 w-11 shrink-0 place-items-center rounded-lg">
                        <SkillIcon name={skill} className="h-6 w-6" />
                      </span>
                      <span className="text-sm font-medium leading-5">{skill}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}