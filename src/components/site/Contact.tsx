import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FORMSPREE_ENDPOINT, profile, socials } from "@/data/site";
import { SectionHeader } from "./ui";
import { SocialLinks } from "./icons";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [topic, setTopic] = useState("Job opportunity");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch { setStatus("error"); }
  };
  return (
    <section id="contact" className="border-t border-border bg-surface/60 backdrop-blur-[2px] py-20 md:py-28">
      <div className="container-site">
        <SectionHeader index="06" eyebrow="Get in touch" title={<>Let's build<br />something meaningful.</>} intro="Have a project in mind, an opportunity, or just want to say hello? I'd love to hear from you." />
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="font-display text-2xl font-semibold">Start a conversation<span className="text-primary">.</span></p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">Have a role or project in mind? Let's talk about the work, the team, and what comes next.</p>
            <a href={socials.email} className="flex items-start gap-4 border-b border-border py-5"><Mail className="mt-1 h-5 w-5 shrink-0 text-primary" /><div className="min-w-0"><p className="eyebrow mb-2">Email</p><p className="break-all text-base sm:text-lg">{profile.email}</p></div></a>
            <a href={profile.phoneHref} className="flex items-center gap-4 border-b border-border py-5"><Phone className="h-5 w-5 text-primary" /><div><p className="eyebrow mb-2">Phone</p><p className="text-lg">{profile.phone}</p></div></a>
            <div className="mt-8"><SocialLinks /></div>
            <p className="mt-8 font-mono text-xs text-muted-foreground">{profile.location} · UTC+5</p>
          </div>
          <form onSubmit={submit} className="space-y-5 border-t-2 border-primary pt-6" aria-label="Contact form">
            <fieldset disabled={status === "sending"}><legend className="mb-3 text-sm font-medium">Let's talk about</legend><div className="flex flex-wrap gap-2">{["Job opportunity", "Project", "Say hello"].map((item) => <Button key={item} type="button" size="sm" variant={topic === item ? "default" : "outline"} aria-pressed={topic === item} onClick={() => setTopic(item)}>{item}</Button>)}</div><input type="hidden" name="inquiry_type" value={topic} /></fieldset>
            <div className="grid gap-5 sm:grid-cols-2"><Field label="Your name" name="name" placeholder="Name" autoComplete="name" /><Field label="Email address" name="email" type="email" placeholder="you@example.com" autoComplete="email" /></div>
            <Field label="Subject" name="subject" placeholder="What's on your mind?" />
            <div><label htmlFor="message" className="mb-2 block text-sm">Message</label><textarea id="message" name="message" required rows={5} placeholder={topic === "Job opportunity" ? "Tell me about the role and your team…" : topic === "Project" ? "Tell me about your project…" : "What's on your mind?"} className="contact-input min-h-36 w-full resize-y rounded-md border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground" /></div>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5"><Button type="submit" size="lg" className="h-12 w-full sm:w-auto" disabled={status === "sending"}>{status === "sending" ? <Loader2 className="animate-spin" /> : <Send />}{status === "sending" ? "Sending…" : "Send message"}</Button><a href={socials.email} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">Prefer email?<ArrowUpRight size={14} /></a></div>
            <div aria-live="polite">{status === "success" && <p className="flex items-center gap-2 text-sm text-success"><CheckCircle2 size={18} />Thank you! Your message has been sent.</p>}{status === "error" && <p role="alert" className="text-sm text-destructive">Your message couldn't be sent. Please try again or email me directly.</p>}</div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder, autoComplete }: { label: string; name: string; type?: string; placeholder: string; autoComplete?: string }) {
  return <div><label htmlFor={name} className="mb-2 block text-sm">{label}</label><input id={name} name={name} type={type} required placeholder={placeholder} autoComplete={autoComplete} className="contact-input h-12 w-full rounded-md border border-input bg-background px-4 text-sm placeholder:text-muted-foreground" /></div>;
}