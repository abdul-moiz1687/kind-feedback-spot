import { useEffect, useState } from "react";

/** Types the role, pauses, erases, and repeats — on every screen size. */
export function TypedRole({ text }: { text: string }) {
  const [visible, setVisible] = useState(text);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let position = 0;
    let deleting = false;
    let timer = 0;
    setVisible("");
    setTyping(true);
    const tick = () => {
      if (!deleting) {
        position += 1;
        setVisible(text.slice(0, position));
        if (position >= text.length) { deleting = true; timer = window.setTimeout(tick, 2200); return; }
        timer = window.setTimeout(tick, 70);
      } else {
        position -= 1;
        setVisible(text.slice(0, position));
        if (position <= 0) { deleting = false; timer = window.setTimeout(tick, 500); return; }
        timer = window.setTimeout(tick, 35);
      }
    };
    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [text]);

  return <span className="typed-role"><span className="sr-only">{text}</span><span aria-hidden="true" className="invisible">{text}|</span><span aria-hidden="true" className="typed-role-text">{visible}<span className={typing ? "typing-caret" : "typing-caret typing-finished"}>|</span></span></span>;
}
