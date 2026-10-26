// :has() lets an element style itself from what's inside it, the "parent
// selector" CSS went without for 25 years. No state, no JavaScript: the
// browser already knows which radio is checked.
const plans = [
  { value: "hobby", name: "Hobby", price: "Free" },
  { value: "pro", name: "Pro", price: "$20/mo" },
  { value: "team", name: "Team", price: "$50/mo" },
];
const tasks = ["Write the tokens", "Check the contrast", "Ship it"];

export function PlanPicker() {
  return (
    <fieldset className="m-0 grid gap-2 border-0 p-0 sm:grid-cols-3">
      <legend className="mb-2 p-0 text-sm font-semibold">Choose a plan</legend>
      {plans.map((p) => (
        <label key={p.value}
          className="grid cursor-pointer gap-0.5 rounded-lg border border-line bg-bg p-3 has-checked:border-accent has-checked:bg-accent/10 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent">
          <input type="radio" name="plan" value={p.value} defaultChecked={p.value === "pro"} className="sr-only" />
          <span className="font-semibold">{p.name}</span>
          <span className="text-sm text-muted">{p.price}</span>
        </label>
      ))}
    </fieldset>
  );
}

export function Checklist() {
  return (
    <div className="group grid gap-2 rounded-lg border border-line bg-bg p-3 not-has-[input:not(:checked)]:border-accent">
      <p className="m-0 flex items-center gap-2 text-sm font-semibold">
        Release checklist
        <span className="hidden rounded-full bg-accent px-2 py-0.5 text-xs text-white group-not-has-[input:not(:checked)]:inline" data-testid="all-done">
          All done ✓
        </span>
      </p>
      <ul className="m-0 grid list-none gap-1 p-0">
        {tasks.map((t) => (
          <li key={t}>
            <label className="flex cursor-pointer items-center gap-2 text-sm has-checked:text-muted has-checked:line-through">
              <input type="checkbox" /> {t}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
