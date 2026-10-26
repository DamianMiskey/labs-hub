"use client";

import { useEffect, useState } from "react";
import { ThemeSwitch } from "@djmiskey/lab-tokens/ThemeSwitch";

// The site-wide switch, plus what it's doing right now.
export function ThemeDemo() {
  const [state, setState] = useState<{ choice: string; theme: string; system: string } | null>(null);
  useEffect(() => {
    const read = () => setState({
      choice: document.documentElement.dataset.themeChoice ?? "system",
      theme: document.documentElement.dataset.theme ?? "?",
      system: matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    });
    read();
    // The switch changes attributes on <html>: watch them.
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-theme-choice"] });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="grid max-w-sm gap-3">
      <ThemeSwitch />
      {state && (
        <dl className="m-0 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1 text-sm" aria-live="polite" data-testid="theme-state">
          <dt className="text-muted">Your choice</dt><dd className="m-0 font-mono">{state.choice}</dd>
          <dt className="text-muted">Your device</dt><dd className="m-0 font-mono">{state.system}</dd>
          <dt className="text-muted">&lt;html data-theme&gt;</dt><dd className="m-0 font-mono">{state.theme}</dd>
        </dl>
      )}
    </div>
  );
}
