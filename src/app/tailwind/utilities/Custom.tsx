// Utilities defined in globals.css with @utility, used like built-in ones.
const tags = ["@theme", "@utility", "@variant", "@custom-variant", "@plugin", "@source", "@apply", "@config", "--value()", "--modifier()", "@reference", "@import"];

function Chips({ className, label }: { className: string; label: string }) {
  return (
    <div className="grid gap-1">
      <p className="m-0 text-xs text-muted"><code>{label}</code></p>
      {/* Focusable so keyboard users can scroll it too. */}
      <ul tabIndex={0} aria-label={`Directives, ${label}`} className={`m-0 flex list-none gap-2 overflow-x-auto p-0 py-1 ${className}`}>
        {tags.map((t) => <li key={t} className="shrink-0 rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs">{t}</li>)}
      </ul>
    </div>
  );
}

export function ScrollRows() {
  return (
    <div className="grid gap-3" data-testid="scroll-rows">
      <Chips className="" label="overflow-x-auto" />
      <Chips className="scrollbar-hidden fade-x-8" label="overflow-x-auto scrollbar-hidden fade-x-8" />
    </div>
  );
}

const source = "function size() {\n\tif (wide) {\n\t\treturn 2;\n\t}\n}";
export function TabSizes() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {["tab-2", "tab-4", "tab-github"].map((cls) => (
        <div key={cls} className="grid min-w-0 gap-1">
          <p className="m-0 text-xs text-muted"><code>{cls}</code></p>
          <pre tabIndex={0} data-testid={cls}
            className={`m-0 overflow-x-auto rounded-lg bg-code px-3 py-2 font-mono text-xs ${cls}`}>
            {source}
          </pre>
        </div>
      ))}
    </div>
  );
}

// hocus: is a home-made variant; link-grow uses it from inside its own CSS.
export function Hocus() {
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        {["Hover me", "or Tab to me"].map((t) => (
          <button key={t} type="button" className="cursor-pointer rounded-md border border-line px-3 py-1.5 text-sm transition-colors hocus:border-accent hocus:bg-accent hocus:text-white hocus:outline-none">
            {t}
          </button>
        ))}
      </div>
      <p className="m-0 text-sm">
        Links with <code>link-grow</code>: <a className="link-grow" href="#hocus">an underline that grows</a> on hover or
        keyboard focus, <a className="link-grow" href="#hocus">like this one</a>.
      </p>
    </div>
  );
}
