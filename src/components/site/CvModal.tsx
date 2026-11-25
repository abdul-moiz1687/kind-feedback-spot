import { useState } from "react";
import { ArrowDownToLine, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const cvPath = "/Abdul-Moiz-CV.pdf";

export function CvModal({ buttonClassName }: { buttonClassName?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog onOpenChange={(open) => open && setIsLoading(true)}>
      <DialogTrigger asChild>
        <Button variant="outline" className={buttonClassName}>
          Preview CV
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[85vh] max-h-[85vh] w-[92vw] max-w-4xl flex-col gap-0 overflow-hidden rounded-xl border-border bg-background/95 p-0 shadow-2xl backdrop-blur-xl">
        <DialogHeader className="gap-4 border-b border-border p-5 pr-12 text-left sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <DialogTitle>Curriculum Vitae — Abdul Moiz</DialogTitle>
            <p className="text-sm text-muted-foreground">Full-Stack Web Developer</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm">
              <a href={cvPath} download="Abdul-Moiz-CV.pdf">
                Download PDF
                <ArrowDownToLine />
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a href={cvPath} target="_blank" rel="noreferrer">
                Open in New Tab
                <ExternalLink />
              </a>
            </Button>
          </div>
        </DialogHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-border bg-surface/60">
            {isLoading && (
              <div
                aria-live="polite"
                className="absolute inset-0 z-10 grid place-items-center bg-background/80 text-sm text-muted-foreground backdrop-blur-sm"
              >
                Loading CV preview…
              </div>
            )}
            <iframe
              key={cvPath}
              title="Curriculum Vitae — Abdul Moiz"
              src={`${cvPath}#toolbar=0`}
              className="h-full w-full"
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <p className="shrink-0 text-center text-xs text-muted-foreground">
            Having trouble viewing the PDF?{" "}
            <a
              href={cvPath}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline underline-offset-4"
            >
              Open it in a new tab
            </a>{" "}
            or{" "}
            <a
              href={cvPath}
              download="Abdul-Moiz-CV.pdf"
              className="font-medium text-primary underline underline-offset-4"
            >
              download the PDF
            </a>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
