// The labs this hub links to. Each is its own site and repository, built the
// same way: one technique per page, with a live demo and the code behind it.
export type Lab = { name: string; url: string; summary: string; stack: string; topics: string[] };

export const LABS: Lab[] = [
  { name: "Vercel Feature Lab", url: "https://vercel.djmiskey.com", stack: "Next.js · Vercel",
    summary: "The Vercel platform, feature by feature.",
    topics: ["Rendering & caching", "Functions & cron", "Storage", "Security & firewall", "Flags & analytics"] },
  { name: "Cloudflare Feature Lab", url: "https://lab.djmiskey.com", stack: "React · Workers",
    summary: "Cloudflare's developer platform on Workers.",
    topics: ["KV, D1, R2", "Durable Objects", "Queues & cron", "Zero Trust", "Turnstile"] },
  { name: "Motion Lab", url: "https://motion.djmiskey.com", stack: "GSAP · Rive · Three.js",
    summary: "Animation on the web, from scroll effects to 3D games.",
    topics: ["GSAP timelines & ScrollTrigger", "Rive state machines", "Three.js & physics", "Four playable games"] },
  { name: "API Feature Lab", url: "https://api.djmiskey.com", stack: "Hono · Neon · Vercel & Workers",
    summary: "Backend API design, one technique per page.",
    topics: ["REST, errors & OpenAPI", "Pagination, ETags, versioning", "Auth & rate limits", "Webhooks, idempotency, SSE", "REST vs tRPC vs GraphQL"] },
  { name: "Observability Lab", url: "https://obs.djmiskey.com", stack: "OpenTelemetry · Grafana Cloud",
    summary: "Logs, traces and metrics, watching the other labs in production.",
    topics: ["Structured logs & request ids", "Distributed tracing", "RED metrics, dashboards, alerts", "Real user monitoring", "Synthetic checks"] },
];
