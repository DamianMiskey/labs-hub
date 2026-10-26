// One component, three layouts, chosen by the width it's given rather than the
// screen's: stacked when narrow, a row from @sm (24rem), and with stats from
// @lg (32rem). The outer div is the container the variants measure.
export function ProfileCard() {
  return (
    <div className="@container">
      <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 @sm:flex-row @sm:items-center @lg:gap-5">
        <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-accent font-bold text-white @lg:size-14">
          SR
        </span>
        <div className="min-w-0 @sm:flex-1">
          <p className="m-0 font-semibold">Sam Rivera</p>
          <p className="m-0 text-sm text-muted">Front-end developer</p>
        </div>
        <dl className="m-0 hidden gap-4 text-center @lg:flex" data-testid="profile-stats">
          <div><dt className="text-xs text-muted">Posts</dt><dd className="m-0 font-semibold tabular-nums">128</dd></div>
          <div><dt className="text-xs text-muted">Followers</dt><dd className="m-0 font-semibold tabular-nums">2.4k</dd></div>
        </dl>
        <button type="button" className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white @max-sm:w-full">
          Follow
        </button>
      </div>
    </div>
  );
}
