"use client";

import { useState } from "react";

// The typography plugin styles HTML you don't write class by class: Markdown,
// CMS content. prose turns it on; prose-site (a utility in globals.css) points
// its colours at this site's tokens. (The size names below are full class
// names, so Tailwind finds them when it scans this file.)
const sizes = ["prose-sm", "prose-base", "prose-lg"] as const;

export function Prose() {
  const [on, setOn] = useState(true);
  const [size, setSize] = useState<(typeof sizes)[number]>("prose-base");
  const classes = on
    ? `prose prose-site ${size} prose-code:before:content-none prose-code:after:content-none`
    : "";
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-3">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} /> prose
        </label>
        <label className="flex items-center gap-2">
          Size
          <select value={size} onChange={(e) => setSize(e.target.value as (typeof sizes)[number])} disabled={!on}>
            {sizes.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <code className="text-xs break-all" data-testid="prose-classes">{classes || "(no classes)"}</code>
      </div>
      <article className={`rounded-xl border border-line bg-bg p-4 ${classes}`} data-testid="prose">
        <h3>Writing about CSS</h3>
        <p className="lead">The same HTML, styled by one class. Good for anything that arrives as Markdown or from a CMS.</p>
        <p>
          Tailwind styles markup you write, one utility at a time. Long-form text is different: you don&apos;t control each{" "}
          <code>&lt;p&gt;</code>, so the plugin styles the elements for you, with <strong>sensible rhythm</strong>,{" "}
          <a href="https://github.com/tailwindlabs/tailwindcss-typography" target="_blank" rel="noreferrer">links</a> and
          lists.
        </p>
        <h4>What it covers</h4>
        <ul>
          <li>Headings, lists and quotes</li>
          <li>Inline <code>code</code> and code blocks</li>
          <li>Tables, keyboard keys like <kbd>Ctrl</kbd> + <kbd>K</kbd>, and rules</li>
        </ul>
        <blockquote><p>Use utilities for the layout, and prose for the words.</p></blockquote>
        <pre tabIndex={0}><code>{`@plugin "@tailwindcss/typography";`}</code></pre>
        <table>
          <thead><tr><th>Class</th><th>Does</th></tr></thead>
          <tbody>
            <tr><td><code>prose</code></td><td>Turns it on</td></tr>
            <tr><td><code>prose-lg</code></td><td>Scales the whole set</td></tr>
            <tr><td><code>prose-a:…</code></td><td>Targets one element type</td></tr>
          </tbody>
        </table>
      </article>
    </div>
  );
}
