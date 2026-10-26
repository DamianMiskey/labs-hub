// Which container variants match right now, shown by CSS alone: each badge
// lights up through the very variant it names. (Class names are written out in
// full because Tailwind finds them by scanning the source.)
const off = "rounded-md bg-code px-2 py-0.5 font-mono text-xs text-muted";

export function Breakpoints() {
  return (
    <ul aria-label="Matching container sizes" className="m-0 flex list-none flex-wrap gap-1.5 p-0">
      <li className={`${off} @max-sm:bg-accent @max-sm:text-white`}>@max-sm &lt;24rem</li>
      <li className={`${off} @xs:bg-accent @xs:text-white`}>@xs 20rem</li>
      <li className={`${off} @sm:bg-accent @sm:text-white`}>@sm 24rem</li>
      <li className={`${off} @md:bg-accent @md:text-white`}>@md 28rem</li>
      <li className={`${off} @lg:bg-accent @lg:text-white`}>@lg 32rem</li>
      <li className={`${off} @xl:bg-accent @xl:text-white`}>@xl 36rem</li>
      <li className={`${off} @2xl:bg-accent @2xl:text-white`}>@2xl 42rem</li>
    </ul>
  );
}
