import Link from "next/link";
import { panel } from "@/components/FeaturePage";
import { cx } from "@/components/ui";
import { categories, features } from "@/lib/features";
import { LABS } from "@/lib/labs";

export default function Home() {
  const ready = features.filter((f) => f.ready).length;
  return (
    <article>
      <header className="mb-6">
        <h1>Damian Miskey&apos;s labs</h1>
        <p className="m-0 text-[1.05rem] text-muted">
          Hands-on labs for web platforms and techniques. Each is a real site in production: one technique per page, with a
          live demo, an explanation, and the code behind it.
        </p>
      </header>

      <section aria-labelledby="labs" className="mb-8">
        <h2 id="labs">The labs</h2>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-3 p-0">
          {LABS.map((lab) => (
            <li key={lab.url}>
              <a href={lab.url} className="flex h-full flex-col gap-1.5 rounded-xl border border-line bg-surface px-4 py-3.5 text-fg no-underline hover:border-accent">
                <span className="font-semibold">{lab.name}</span>
                <span className="-mt-1 text-xs text-muted">{new URL(lab.url).hostname} ↗</span>
                <span className="text-sm text-muted">{lab.summary}</span>
                <span className="text-xs font-medium text-accent-ink">{lab.stack}</span>
                <ul className="m-0 mt-1 flex list-none flex-wrap gap-1.5 p-0">
                  {lab.topics.map((t) => <li key={t} className="rounded-full bg-code px-2 py-0.5 text-xs text-muted">{t}</li>)}
                </ul>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tailwind">
        <h2 id="tailwind">Tailwind CSS lab</h2>
        <section className={cx(panel, "mb-4")}>
          <p className="m-0">
            This site is the sixth lab: <strong>Tailwind CSS v4</strong>, one technique per page. Tailwind is configured in CSS
            now (<code>@theme</code>, <code>@utility</code>, <code>@variant</code>), and every lab uses it, so the design
            tokens here are the start of a shared design system. {ready} of {features.length} pages built so far.
          </p>
        </section>
        {categories.map((cat) => (
          <section key={cat} className="mt-5">
            <h3 className="mt-0">{cat}</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
              {features.filter((f) => f.category === cat).map((f) => {
                const body = (
                  <>
                    <span className="font-semibold">{f.name}</span>
                    <span className="text-sm text-muted">{f.summary}</span>
                    <span className={cx("self-start rounded-full px-2 py-px text-xs", f.ready ? "bg-accent text-white" : "bg-code text-muted")}>{f.ready ? "Live" : `Phase ${f.phase}`}</span>
                  </>
                );
                const tile = "flex flex-col gap-1 rounded-xl border border-line bg-surface px-4 py-3.5 text-fg no-underline";
                return f.ready
                  ? <Link key={f.slug} href={`/${f.slug}`} className={cx(tile, "hover:border-accent")}>{body}</Link>
                  : <div key={f.slug} className={tile}>{body}</div>;
              })}
            </div>
          </section>
        ))}
      </section>
    </article>
  );
}
