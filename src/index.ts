export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext) {
    console.log("WORKER FETCH", request.url);   // Debug
    const url = new URL(request.url);   
    const res = await env.ASSETS.fetch(request);

    // Clone to edit headers
    const r = new Response(res.body, res);

    const ct = r.headers.get("content-type") || "";
    const isHtml = ct.includes("text/html");

    if (isHtml) {
      // Disabling HTML Caching to allow for instant updates
      r.headers.set("Cache-Control", "no-store");
    } else if (
      url.pathname.startsWith("/_next/static/") ||
      url.pathname.endsWith(".woff2") ||
      url.pathname.endsWith(".css") ||
      url.pathname.endsWith(".js") ||
      url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)
    ) {
      // Long cache for hashed/static assets
      r.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    // Baseline security headers (tune CSP later if you add externals)
    r.headers.set("X-Content-Type-Options", "nosniff");
    r.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    r.headers.set("X-Frame-Options", "DENY");
    r.headers.set("X-Worker-Debug", "on");
    r.headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        // allow inline scripts needed by Next’s static HTML
        "script-src 'self' 'unsafe-inline'",
        // style tags from Next's output
        "style-src 'self' 'unsafe-inline'",
        // tighten these as needed later
        "img-src 'self' data:",
        "font-src 'self' data:",
        "connect-src 'self'",
        // recommended hardening
        "object-src 'none'",
        "base-uri 'self'",
        "frame-ancestors 'none'"
      ].join("; ")
    );
    

    return r;
  },
};
