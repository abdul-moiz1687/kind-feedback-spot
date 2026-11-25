import { ArrowUp, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, profile } from "@/data/site";
import { SocialLinks } from "./icons";
import { Reveal } from "./ui";
import { CvModal } from "./CvModal";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background/80 pt-14 backdrop-blur-[2px] md:pt-20">
      <div className="container-site">
        <Reveal className="grid gap-10 pb-12 md:grid-cols-[1.5fr_0.7fr_1fr] md:gap-12 md:pb-16">
          <div>
            <p className="mb-5 font-mono text-sm font-semibold text-primary">&lt;AM /&gt;</p>
            <p className="font-display text-3xl font-semibold sm:text-4xl">Abdul Moiz<span className="text-primary">.</span></p>
            <p className="mt-3 text-sm text-muted-foreground">{profile.role}</p>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><MapPin aria-hidden="true" className="h-3.5 w-3.5" />{profile.location}</p>
            <div className="mt-6"><SocialLinks /></div>
          </div>
          <nav aria-label="Footer">
            <h2 className="mb-5 font-mono text-xs uppercase text-muted-foreground">Explore</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {navLinks.map((link) => <li key={link.id}><a href={`#${link.id}`} className="footer-link inline-flex items-center gap-2 text-sm">{link.label}<ArrowUpRight aria-hidden="true" className="h-3 w-3 text-muted-foreground" /></a></li>)}
            </ul>
          </nav>
          <div className="min-w-0">
            <h2 className="mb-5 font-mono text-xs uppercase text-muted-foreground">Let's connect</h2>
            <a href={`mailto:${profile.email}`} className="footer-link break-all text-sm font-medium underline decoration-border-strong underline-offset-8">{profile.email}</a>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="ghost"><a href="#contact">Say hello<ArrowUpRight /></a></Button>
              <CvModal />
            </div>
          </div>
        </Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6">
          <p className="text-xs text-muted-foreground">© 2026 {profile.name}. All rights reserved.</p>
          <Button asChild variant="ghost" size="sm" className="gap-3 text-xs text-muted-foreground"><a href="#top">Back to top<ArrowUp className="h-4 w-4" /></a></Button>
        </div>
      </div>
    </footer>
  );
}