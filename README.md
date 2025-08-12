# Blog Starter (Next.js → Cloudflare Workers, SSG)

A fast, minimal blog starter that renders Markdown posts with **Next.js 15 (App Router)**, exports a **fully static site (SSG)**, and serves it via **Cloudflare Workers + Static Assets**.  
Zero servers to manage, edge-cached, and CI/CD-ready with Workers Builds.

---

## One Click Deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/vnikhilbuddhavarapu/blog-starter-app)

## Tech stack

- **Next.js 15 (App Router)** – static export (`output: 'export'`)
- **React 19 RC**
- **Tailwind CSS**
- **Markdown** via `gray-matter` + `remark/remark-html`
- **Cloudflare Workers** (Worker + Static Assets binding)
- **Wrangler** for local dev & deploy

---

## Quick start

### Prerequisites
- Node.js **>= 18** (20 recommended)
- `npm` (or `pnpm/yarn` if you prefer)
- Cloudflare account + `npx wrangler login`

### 1) Install
```bash
npm install
```

### 2) Run locally (Next dev server)
```bash
npm run dev
# http://localhost:3000
```

### 3) Build the static site
```bash
npm run build
# output goes to ./out
```

### 4) Preview the static build on a local Worker
```bash
npm run preview
# http://localhost:8787
```

### 5) Deploy
```bash
npm run deploy
# https://<project-name>.workers.dev
```

---

## Editing 
- Put Markdown files in _posts/, one file per post (e.g. milky-way.md).
- Put images in public/assets/blog/<slug>/ and author photos in public/assets/blog/authors/.
- On save/push, a new build will re-generate static HTML for the home page and each /posts/[slug].

---

## License
MIT
