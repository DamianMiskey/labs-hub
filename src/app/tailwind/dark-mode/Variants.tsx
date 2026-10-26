"use client";

import { useState } from "react";

// Five state variants, each styling an element from state the browser or the
// markup already knows: no JavaScript is involved in the styling itself.
function Example({ title, classes, children }: { title: string; classes: string; children: React.ReactNode }) {
  return (
    <li className="grid gap-2 rounded-lg border border-line bg-bg p-3">
      <h3 className="m-0 text-sm">{title}</h3>
      <div>{children}</div>
      <code className="text-xs break-all">{classes}</code>
    </li>
  );
}

export function Variants() {
  const [pressed, setPressed] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-3 p-0">
      <Example title="aria-pressed: a toggle button" classes="aria-pressed:bg-accent aria-pressed:text-white">
        <button type="button" aria-pressed={pressed} onClick={() => setPressed(!pressed)}
          className="cursor-pointer rounded-md border border-line px-3 py-1.5 text-sm aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-white">
          {pressed ? "★ Starred" : "☆ Star"}
        </button>
      </Example>

      <Example title="data-[state=open]: a disclosure" classes="group  group-data-[state=open]:rotate-180  data-[state=closed]:hidden">
        <button type="button" data-state={open ? "open" : "closed"} aria-expanded={open} onClick={() => setOpen(!open)}
          className="group flex cursor-pointer items-center gap-2 text-sm font-medium">
          Details <span aria-hidden="true" className="inline-block transition-transform group-data-[state=open]:rotate-180">▾</span>
        </button>
        <p data-state={open ? "open" : "closed"} className="m-0 mt-1 text-sm text-muted data-[state=closed]:hidden">The state lives in a data attribute; the styles read it.</p>
      </Example>

      <Example title="user-invalid: + peer: a form hint" classes="peer  peer-user-invalid:block hidden">
        <label className="grid gap-1 text-sm">
          E-mail
          <input type="email" placeholder="you@example.com" className="peer w-full user-invalid:border-danger" />
          <span className="hidden text-xs text-danger peer-user-invalid:block">✕ That isn&apos;t an e-mail address.</span>
        </label>
      </Example>

      <Example title="has-[:checked]: a selectable card" classes="has-[:checked]:border-accent has-[:checked]:bg-surface">
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-line p-2 text-sm has-[:checked]:border-accent has-[:checked]:bg-surface">
          <input type="checkbox" className="accent-[var(--accent)]" /> Send me the newsletter
        </label>
      </Example>

      <Example title="group-hover: reveal on hover or focus" classes="group  group-hover:opacity-100 group-focus-visible:opacity-100">
        <a href="#variants" className="group flex items-center justify-between rounded-md border border-line px-3 py-1.5 text-sm no-underline">
          A list row
          <span aria-hidden="true" className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">→</span>
        </a>
      </Example>
    </ul>
  );
}
