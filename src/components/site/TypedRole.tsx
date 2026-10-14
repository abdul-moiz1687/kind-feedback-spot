import { useEffect, useState } from "react";

export function TypedRole({ text }: { text: string }) {
  const [visible, setVisible] = useState(text);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setVisible("");
    setTyping(true);
    let position = 0;
    const timer = window.setInterval(() => {
      position += 1;
      setVisible(text.slice(0, position));
      if (position >= text.length) {
        window.clearInterval(timer);
        setTyping(false);
      }
    }, 65);
    return () => window.clearInterval(timer);
  }, [text]);

  return <span className="typed-role"><span className="sr-only">{text}</span><span aria-hidden="true" className="invisible">{text}|</span><span aria-hidden="true" className="typed-role-text">{visible}<span className={typing ? "typing-caret" : "typing-caret typing-finished"}>|</span></span></span>;
}