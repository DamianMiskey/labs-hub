"use client";

import { useEffect, useState } from "react";

// This site's design tokens, with their values read from the live page: the
// colours change when your system switches between light and dark.
const TOKENS = [
  { group: "Colour", name: "--bg", utility: "bg-bg", role: "Page background" },
  { group: "Colour", name: "--surface", utility: "bg-surface", role: "Cards and panels" },
  { group: "Colour", name: "--line", utility: "border-line", role: "Borders" },
  { group: "Colour", name: "--fg", utility: "text-fg", role: "Text" },
  { group: "Colour", name: "--muted", utility: "text-muted", role: "Secondary text" },
  { group: "Colour", name: "--accent", utility: "bg-accent", role: "Buttons, highlights" },
  { group: "Colour", name: "--accent-ink", utility: "text-accent-ink", role: "Links" },
  { group: "Colour", name: "--code", utility: "bg-code", role: "Code and chips" },
  { group: "Colour", name: "--danger", utility: "text-danger", role: "Errors" },
  { group: "Type", name: "--font-sans", utility: "font-sans", role: "Body text" },
  { group: "Type", name: "--font-mono", utility: "font-mono", role: "Code" },
  { group: "Type", name: "--text-sm", utility: "text-sm", role: "Small text" },
  { group: "Size", name: "--spacing", utility: "p-1, gap-1, m-1…", role: "One spacing unit" },
  { group: "Size", name: "--radius-xl", utility: "rounded-xl", role: "Card corners" },
] as const;

export function TokenList() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [scheme, setScheme] = useState("");

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const read = () => {
      const style = getComputedStyle(document.documentElement);
      // The built CSS is minified (".25rem"): put the leading zero back for reading.
      const tidy = (v: string) => v.trim().replace(/(^|[\s(,])\.(\d)/g, "$10.$2");
      setValues(Object.fromEntries(TOKENS.map((t) => [t.name, tidy(style.getPropertyValue(t.name))])));
      setScheme(media.matches ? "dark" : "light");
    };
    read();
    media.addEventListener("change", read);
    return () => media.removeEventListener("change", read);
  }, []);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-2">
      <p className="m-0 text-sm text-muted" aria-live="polite">{scheme && <>Read from this page just now, in <strong>{scheme}</strong> mode. Switch your system&apos;s appearance and the colours update.</>}</p>
      <div className="overflow-x-auto" tabIndex={0}>
        <table className="w-full border-collapse text-sm" data-testid="tokens">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th scope="col" className="py-1 pr-3 font-normal">Token</th>
              <th scope="col" className="py-1 pr-3 font-normal">Value now</th>
              <th scope="col" className="py-1 pr-3 font-normal">Utility</th>
              <th scope="col" className="py-1 font-normal">Used for</th>
            </tr>
          </thead>
          <tbody>
            {TOKENS.map((t) => (
              <tr key={t.name} className="border-b border-line">
                <td className="py-1.5 pr-3 font-mono text-xs whitespace-nowrap">{t.name}</td>
                <td className="py-1.5 pr-3 font-mono text-xs">
                  <span className="inline-flex items-center gap-2">
                    {t.group === "Colour" && <span className="inline-block size-4 rounded border border-line" style={{ background: `var(${t.name})` }} aria-hidden="true" />}
                    <span className="break-all">{values[t.name] || "…"}</span>
                  </span>
                </td>
                <td className="py-1.5 pr-3 font-mono text-xs">{t.utility}</td>
                <td className="py-1.5 text-xs text-muted">{t.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
