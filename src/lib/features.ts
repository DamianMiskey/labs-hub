// The Tailwind lab's pages, grouped by category: the single source of truth
// for the navigation and the roadmap. `ready: false` marks a page on the
// roadmap; it shows on the home page but has no route yet.
export type Category = "Foundations" | "Layout" | "Modern CSS" | "Extending";

export type Feature = {
  slug: string;
  name: string;
  category: Category;
  summary: string;
  phase: number;
  ready: boolean;
};

export const features: Feature[] = [
  { slug: "tailwind/theme", name: "Design tokens", category: "Foundations", phase: 1, ready: true,
    summary: "@theme: colours, spacing and type as CSS variables, the design system this site runs on." },
  { slug: "tailwind/dark-mode", name: "Dark mode & variants", category: "Foundations", phase: 2, ready: true,
    summary: "@custom-variant, data-* and aria-* variants, and a theme switch that respects the system." },

  { slug: "tailwind/container-queries", name: "Container queries", category: "Layout", phase: 3, ready: false,
    summary: "Components that respond to their own width, not the screen's." },
  { slug: "tailwind/fluid", name: "Fluid type & spacing", category: "Layout", phase: 3, ready: false,
    summary: "clamp() scales that grow smoothly between screen sizes." },

  { slug: "tailwind/modern-css", name: "Modern CSS", category: "Modern CSS", phase: 4, ready: false,
    summary: ":has(), @starting-style, field-sizing and OKLCH colour mixing, through utilities." },

  { slug: "tailwind/utilities", name: "Custom utilities", category: "Extending", phase: 5, ready: false,
    summary: "@utility and @variant: extending Tailwind in CSS, plus typography for long text." },
];

export const categories = [...new Set(features.map((f) => f.category))];
export const getFeature = (slug: string) => features.find((f) => f.slug === slug);
