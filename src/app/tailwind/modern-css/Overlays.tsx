"use client";

import { useRef } from "react";

// Entry and exit animations in CSS alone. starting: (@starting-style) gives
// the values to animate *from* when the element first appears; transition-discrete
// (transition-behavior: allow-discrete) lets display and overlay wait for
// the fade to finish before the element disappears.
const motion =
  "transition-[opacity,translate,scale,overlay,display] transition-discrete duration-200 ease-out motion-reduce:transition-none";

export function Overlays() {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" popoverTarget="tip" className="cursor-pointer rounded-md border border-line px-3 py-1.5 text-sm">
        Open a popover
      </button>
      <div id="tip" popover="auto" data-testid="popover"
        className={`m-auto max-w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-line bg-surface p-4 text-fg shadow-lg ${motion} translate-y-2 opacity-0 open:translate-y-0 open:opacity-100 starting:open:translate-y-2 starting:open:opacity-0`}>
        <p className="m-0 text-sm">
          A popover: the <code>popover</code> attribute and a <code>popovertarget</code> button. It sits on the top layer and
          closes on Esc or a click outside, without any JavaScript.
        </p>
      </div>

      <button type="button" onClick={() => dialog.current?.showModal()} className="cursor-pointer rounded-md bg-accent px-3 py-1.5 text-sm text-white">
        Open a dialog
      </button>
      <dialog ref={dialog} aria-labelledby="dialog-title" data-testid="dialog"
        className={`m-auto max-w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-line bg-surface p-5 text-fg ${motion} scale-95 opacity-0 open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0 backdrop:bg-black/50`}>
        <h3 id="dialog-title" className="mt-0">A modal dialog</h3>
        <p className="text-sm">It scales and fades in, and back out when it closes. Esc works too.</p>
        <form method="dialog">
          <button className="cursor-pointer rounded-md bg-accent px-3 py-1.5 text-sm text-white">Close</button>
        </form>
      </dialog>
    </div>
  );
}
