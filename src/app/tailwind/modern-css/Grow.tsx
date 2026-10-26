// field-sizing: content sizes a form field to what's typed in it, the job
// that used to need a script measuring scrollHeight. Min and max sizes keep it
// in bounds.
export function Grow() {
  return (
    <div className="grid gap-3">
      <label className="grid gap-1 text-sm">
        <span>Message (grows taller)</span>
        <textarea rows={1} defaultValue="Type a few lines here…" data-testid="grow-textarea"
          className="field-sizing-content min-h-10 max-h-60 w-full resize-none rounded-md border border-line bg-bg px-2 py-1.5 text-fg focus:outline-2 focus:outline-accent" />
      </label>
      <label className="flex flex-wrap items-center gap-2 text-sm">
        <span>Tag (grows wider)</span>
        <input defaultValue="css" data-testid="grow-input" className="field-sizing-content min-w-16 max-w-full" />
      </label>
      <p className="m-0 text-xs text-muted supports-[field-sizing:content]:hidden" data-testid="grow-unsupported">
        Your browser doesn&apos;t support <code>field-sizing</code> yet, so these stay a fixed size. It works in Chrome,
        Edge and Safari 26.2+.
      </p>
    </div>
  );
}
