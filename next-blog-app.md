# Next.js Blog App

This is a Nextjs Blog App based on the vercel blog starter kit that's optimized to be deployed on Cloudflare Workers using Open Next Adapter. 

# Project Structure

```
nbuddhavarapu@LGFW0RFQ5D blog-starter-app % tree -L 5 -I 'node_modules|.wrangler|.next|.open-next|out'
.
├── _posts
│   ├── black-holes.md
│   ├── fermi-paradox.md
│   ├── jwst.md
│   ├── milky-way.md
│   ├── neutron-stars.md
│   ├── pale-blue-dot.md
│   └── pillars-of-creation.md
├── next-blog-app.md
├── next-env.d.ts
├── next.config.mjs
├── open-next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── assets
│   │   └── blog
│   │       ├── authors
│   │       │   ├── aris.jpeg
│   │       │   ├── kaia.jpeg
│   │       │   ├── stella.jpeg
│   │       │   └── tim.jpeg
│   │       ├── black-holes
│   │       │   └── cover.jpg
│   │       ├── fermi-paradox
│   │       │   └── cover.jpg
│   │       ├── jwst
│   │       │   └── cover.jpg
│   │       ├── milky-way
│   │       │   └── cover.jpg
│   │       ├── neutron-stars
│   │       │   └── cover.jpg
│   │       ├── pale-blue-dot
│   │       │   └── cover.jpg
│   │       └── pillars-of-creation
│   │           └── cover.jpg
│   ├── favicon
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── browserconfig.xml
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   ├── mstile-150x150.png
│   │   ├── safari-pinned-tab.svg
│   │   └── site.webmanifest
│   ├── robots.txt
│   └── sitemap.xml
├── README.md
├── src
│   ├── app
│   │   ├── _components
│   │   │   ├── avatar.tsx
│   │   │   ├── container.tsx
│   │   │   ├── cover-image.tsx
│   │   │   ├── date-formatter.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── header.tsx
│   │   │   ├── hero-post.tsx
│   │   │   ├── intro.tsx
│   │   │   ├── markdown-styles.module.css
│   │   │   ├── more-stories.tsx
│   │   │   ├── post-body.tsx
│   │   │   ├── post-header.tsx
│   │   │   ├── post-preview.tsx
│   │   │   ├── post-title.tsx
│   │   │   ├── section-separator.tsx
│   │   │   ├── switch.module.css
│   │   │   └── theme-switcher.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── posts
│   │       └── [slug]
│   │           └── page.tsx
│   ├── index.ts
│   ├── interfaces
│   │   ├── author.ts
│   │   └── post.ts
│   └── lib
│       ├── api.ts
│       ├── constants.ts
│       └── markdownToHtml.ts
├── tailwind.config.ts
├── tsconfig.json
└── wrangler.jsonc

21 directories, 68 files
```

# Code Files:

## wrangler.jsonc

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"main": ".open-next/worker.js",
	"name": "blog-starter-app",
	"compatibility_date": "2025-08-02",
	"compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
	"assets": {
		"directory": ".open-next/assets",
		"binding": "ASSETS"
	},
  "placement": {"mode": "smart"},
  "observability": {"enabled": true}
}
```

## package.json

```json
{
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
  },
  "dependencies": {
    "@opennextjs/cloudflare": "^1.6.5",
    "classnames": "^2.5.1",
    "date-fns": "^3.6.0",
    "gray-matter": "^4.0.3",
    "next": "15.0.2",
    "react": "19.0.0-rc-02c0e824-20241028",
    "react-dom": "19.0.0-rc-02c0e824-20241028",
    "remark": "^15.0.1",
    "remark-html": "^16.0.1"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20250812.0",
    "@types/node": "^20.14.8",
    "@types/react": "npm:types-react@19.0.0-rc.1",
    "@types/react-dom": "npm:types-react-dom@19.0.0-rc.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.5.2",
    "wrangler": "^4.29.0"
  }
}
```

## src/app/page.tsx

```tsx
import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
```

## src/app/layout.tsx

```tsx
import Footer from "@/app/_components/footer";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import { ThemeSwitcher } from "./_components/theme-switcher";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Astro Log`,
  description: `Your weekly dose of wonder, charting the frontiers of space.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(inter.className, "dark:bg-black dark:text-white")}
      >
        <ThemeSwitcher />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
```

## src/app/posts/[slug]/page.tsx

```tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

## src/index.ts

```ts
export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext) {

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

    // Baseline security headers
    r.headers.set("X-Content-Type-Options", "nosniff");
    r.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    r.headers.set("X-Frame-Options", "DENY");
    r.headers.set("X-Worker-Debug", "on");
    r.headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data:",
        "font-src 'self' data:",
        "connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com",
        "object-src 'none'",
        "base-uri 'self'",
        "frame-ancestors 'none'"
      ].join("; ")
    );
    

    return r;
  },
};
```

## src/lib/api.ts

```ts
import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
```

## src/lib/markdownToHtml.ts

```ts
import { remark } from "remark";
import html from "remark-html";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
```

## src/lib/constants.ts

```ts
export const EXAMPLE_PATH = "blog-starter";
export const CMS_NAME = "Markdown";
export const HOME_OG_IMAGE_URL =
  "https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg";
```

## next.config.mjs

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: { ignoreBuildErrors: true },
	eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
```

## open-next.config.ts

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
	incrementalCache: staticAssetsIncrementalCache,
});
```

## tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.12)",
        md: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "types": ["@cloudflare/workers-types"],
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    },
    "target": "ES2017"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Cloudflare Next.js Documentation

---
title: Next.js · Cloudflare Workers docs
description: Create an Next.js application and deploy it to Cloudflare Workers
  with Workers Assets.
lastUpdated: 2025-09-01T21:49:05.000Z
chatbotDeprioritize: false
tags: Full stack
source_url:
  html: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
  md: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/index.md
---

**Start from CLI** - scaffold a Next.js project on Workers.

* npm

  ```sh
  npm create cloudflare@latest -- my-next-app --framework=next
  ```

* yarn

  ```sh
  yarn create cloudflare my-next-app --framework=next
  ```

* pnpm

  ```sh
  pnpm create cloudflare@latest my-next-app --framework=next
  ```

This is a simple getting started guide. For detailed documentation on how to use the Cloudflare OpenNext adapter, visit the [OpenNext website](https://opennext.js.org/cloudflare).

## What is Next.js?

[Next.js](https://nextjs.org/) is a [React](https://react.dev/) framework for building full stack applications.

Next.js supports Server-side and Client-side rendering, as well as Partial Prerendering which lets you combine static and dynamic components in the same route.

You can deploy your Next.js app to Cloudflare Workers using the OpenNext adapter.

## Next.js supported features

Most Next.js features are supported by the Cloudflare OpenNext adapter:

| Feature | Cloudflare adapter | Notes |
| - | - | - |
| App Router | 🟢 supported | |
| Pages Router | 🟢 supported | |
| Route Handlers | 🟢 supported | |
| React Server Components | 🟢 supported | |
| Static Site Generation (SSG) | 🟢 supported | |
| Server-Side Rendering (SSR) | 🟢 supported | |
| Incremental Static Regeneration (ISR) | 🟢 supported | |
| Server Actions | 🟢 supported | |
| Response streaming | 🟢 supported | |
| asynchronous work with `next/after` | 🟢 supported | |
| Middleware | 🟢 supported | |
| Image optimization | 🟢 supported | Supported via [Cloudflare Images](https://developers.cloudflare.com/images/) |
| Partial Prerendering (PPR) | 🟢 supported | PPR is experimental in Next.js |
| Composable Caching ('use cache') | 🟢 supported | Composable Caching is experimental in Next.js |
| Node.js in Middleware | ⚪ not yet supported | Node.js middleware introduced in 15.2 are not yet supported |

## Deploy a new Next.js project on Workers

1. **Create a new project with the create-cloudflare CLI (C3).**

   * npm

     ```sh
     npm create cloudflare@latest -- my-next-app --framework=next
     ```

   * yarn

     ```sh
     yarn create cloudflare my-next-app --framework=next
     ```

   * pnpm

     ```sh
     pnpm create cloudflare@latest my-next-app --framework=next
     ```

   What's happening behind the scenes?

   When you run this command, C3 creates a new project directory, initiates [Next.js's official setup tool](https://nextjs.org/docs/app/api-reference/cli/create-next-app), and configures the project for Cloudflare. It then offers the option to instantly deploy your application to Cloudflare.

2. **Develop locally.**

   After creating your project, run the following command in your project directory to start a local development server. The command uses the Next.js development server. It offers the best developer experience by quickly reloading your app every time the source code is updated.

   * npm

     ```sh
     npm run dev
     ```

   * yarn

     ```sh
     yarn run dev
     ```

   * pnpm

     ```sh
     pnpm run dev
     ```

3. **Test and preview your site with the Cloudflare adapter.**

   * npm

     ```sh
     npm run preview
     ```

   * yarn

     ```sh
     yarn run preview
     ```

   * pnpm

     ```sh
     pnpm run preview
     ```

   What's the difference between dev and preview?

   The command used in the previous step uses the Next.js development server, which runs in Node.js. However, your deployed application will run on Cloudflare Workers, which uses the `workerd` runtime. Therefore when running integration tests and previewing your application, you should use the preview command, which is more accurate to production, as it executes your application in the `workerd` runtime using `wrangler dev`.

4. **Deploy your project.**

   You can deploy your project to a [`*.workers.dev` subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) or a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) from your local machine or any CI/CD system (including [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/#workers-builds)). Use the following command to build and deploy. If you're using a CI service, be sure to update your "deploy command" accordingly.

   * npm

     ```sh
     npm run deploy
     ```

   * yarn

     ```sh
     yarn run deploy
     ```

   * pnpm

     ```sh
     pnpm run deploy
     ```

## Deploy an existing Next.js project on Workers

You can convert an existing Next.js application to run on Cloudflare

1. **Install [`@opennextjs/cloudflare`](https://www.npmjs.com/package/@opennextjs/cloudflare)**

   * npm

     ```sh
     npm i @opennextjs/cloudflare@latest
     ```

   * yarn

     ```sh
     yarn add @opennextjs/cloudflare@latest
     ```

   * pnpm

     ```sh
     pnpm add @opennextjs/cloudflare@latest
     ```

2. **Install [`wrangler CLI`](https://developers.cloudflare.com/workers/wrangler) as a devDependency**

   * npm

     ```sh
     npm i -D wrangler@latest
     ```

   * yarn

     ```sh
     yarn add -D wrangler@latest
     ```

   * pnpm

     ```sh
     pnpm add -D wrangler@latest
     ```

3. **Add a Wrangler configuration file**

   In your project root, create a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) with the following content:

   * wrangler.jsonc

     ```jsonc
     {
       "main": ".open-next/worker.js",
       "name": "my-app",
       "compatibility_date": "2025-03-25",
       "compatibility_flags": [
         "nodejs_compat"
       ],
       "assets": {
         "directory": ".open-next/assets",
         "binding": "ASSETS"
       }
     }
     ```

   * wrangler.toml

     ```toml
       main = ".open-next/worker.js"
       name = "my-app"
       compatibility_date = "2025-03-25"
       compatibility_flags = ["nodejs_compat"]
       [assets]
       directory = ".open-next/assets"
       binding = "ASSETS"
     ```

   Note

   As shown above, you must enable the [`nodejs_compat` compatibility flag](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) *and* set your [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) to `2024-09-23` or later for your Next.js app to work with @opennextjs/cloudflare.

4. **Add a configuration file for OpenNext**

   In your project root, create an OpenNext configuration file named `open-next.config.ts` with the following content:

   ```ts
   import { defineCloudflareConfig } from "@opennextjs/cloudflare";


   export default defineCloudflareConfig();
   ```

   Note

   `open-next.config.ts` is where you can configure the caching, see the [adapter documentation](https://opennext.js.org/cloudflare/caching) for more information

5. **Update `package.json`**

   You can add the following scripts to your `package.json`:

   ```json
   "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
   "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
   "cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
   ```

   Usage

   * `preview`: Builds your app and serves it locally, allowing you to quickly preview your app running locally in the Workers runtime, via a single command.
   * `deploy`: Builds your app, and then deploys it to Cloudflare
   * `cf-typegen`: Generates a `cloudflare-env.d.ts` file at the root of your project containing the types for the env.

6. **Develop locally.**

   After creating your project, run the following command in your project directory to start a local development server. The command uses the Next.js development server. It offers the best developer experience by quickly reloading your app after your source code is updated.

   * npm

     ```sh
     npm run dev
     ```

   * yarn

     ```sh
     yarn run dev
     ```

   * pnpm

     ```sh
     pnpm run dev
     ```

7. **Test your site with the Cloudflare adapter.**

   The command used in the previous step uses the Next.js development server to offer a great developer experience. However your application will run on Cloudflare Workers so you want to run your integration tests and verify that your application works correctly in this environment.

   * npm

     ```sh
     npm run preview
     ```

   * yarn

     ```sh
     yarn run preview
     ```

   * pnpm

     ```sh
     pnpm run preview
     ```

8. **Deploy your project.**

   You can deploy your project to a [`*.workers.dev` subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) or a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) from your local machine or any CI/CD system (including [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/#workers-builds)). Use the following command to build and deploy. If you're using a CI service, be sure to update your "deploy command" accordingly.

   * npm

     ```sh
     npm run deploy
     ```

   * yarn

     ```sh
     yarn run deploy
     ```

   * pnpm

     ```sh
     pnpm run deploy
     ```

### Cloudflare
The @opennextjs/cloudflare adapter lets you deploy Next.js apps to Cloudflare Workers using the Node.js "runtime" from Next.js.

### Get Started
### New apps
To create a new Next.js app, pre-configured to run on Cloudflare using @opennextjs/cloudflare, run:

npm create cloudflare@latest -- my-next-app --framework=next --platform=workers
Existing Next.js apps
Follow the guide here to use @opennextjs/cloudflare with an existing Next.js app.

Supported Next.js runtimes
Next.js has two "runtimes" — "Edge" and "Node.js". When you use @opennextjs/cloudflare, your app should use the Node.js runtime, which is more fully featured, and allows you to use the Node.js APIs that are provided by the Cloudflare Workers runtime.

This is an important difference from @cloudflare/next-on-pages, which only supports the "Edge" runtime. The Edge Runtime code in Next.js intentionally constrains which APIs from Node.js can be used, and the "Edge" runtime does not support all Next.js features.

Supported Next.js versions
All minor and patch versions of Next.js 15 and the latest minor of Next.js 14 are supported.

To help improve compatibility, we encourage you to report bugs and contribute code!

Supported Next.js features
 App Router
 Route Handlers
 Dynamic routes
 Static Site Generation (SSG)
 Server-Side Rendering (SSR)
 Middleware
 Node Middleware introduced in 15.2 are not yet supported
 Image optimization (See this guide to configure Cloudflare Images)
 Partial Prerendering (PPR)
 Pages Router
 Incremental Static Regeneration (ISR)
 Support for after
 Composable Caching ('use cache')
We welcome both contributions and feedback!

Windows support
OpenNext can be used on Windows systems but Windows full support is not guaranteed because:

Next.js tooling itself has Windows support issues and OpenNext is built on these tools
the OpenNext team has limited capacity and fully supporting Windows (given the point above) has been determined to be a lower priority, thus the effort and testing on Windows is limited
Given the above, you can develop your application under Windows at your own risk. If you don't have an alternative we recommend either:

running OpenNext using the Windows Subsystem for Linux (WSL),
in a Linux Virtual Machine or
develop your application using the standard Next.js tooling and deploy it using OpenNext in CI/CD systems such as GitHub Actions that run linux/MacOS environments
Windows Subsystem for Linux (WSL) allows you to run a Linux environment on your Windows machine, without the need for a separate virtual machine or dual booting. Visual Studio Code has an extension that makes developing with WSL very easy.

How @opennextjs/cloudflare Works
The OpenNext Cloudflare adapter works by taking the Next.js build output and transforming it, so that it can run in Cloudflare Workers.

When you add @opennextjs/cloudflare as a dependency to your Next.js app, and then run npx opennextjs-cloudflare the adapter first builds your app by running the build script in your package.json, and then transforms the build output to a format that you can run locally using Wrangler, and deploy to Cloudflare.

You can view the code for @opennextjs/cloudflare here to understand what it does under the hood.

Note on Worker Size Limits
The size limit of a Cloudflare Worker is 3 MiB on the Workers Free plan, and 10 MiB on the Workers Paid plan. After building your Worker, wrangler will show both the original and compressed sizes:

Total Upload: 13833.20 KiB / gzip: 2295.89 KiB

Get Started
New apps
To create a new Next.js app, pre-configured to run on Cloudflare using @opennextjs/cloudflare, run:

npm create cloudflare@latest -- my-next-app --framework=next --platform=workers
Existing Next.js apps
1. Install @opennextjs/cloudflare
First, install @opennextjs/cloudflare:

npm install @opennextjs/cloudflare@latest
2. Install Wrangler
Install the Wrangler CLI as a devDependency:

npm install --save-dev wrangler@latest
You must use Wrangler version 3.99.0 or later to deploy Next.js apps using @opennextjs/cloudflare.

3. Create a wrangler configuration file
This step is optional since @opennextjs/cloudflare creates this file for you during the build process (if not already present).

A wrangler configuration file is needed for your application to be previewed and deployed, it is also where you configure your Worker and define what resources it can access via bindings.

You can create one yourself in the root directory of your Next.js app with the name wrangler.jsonc and the following content:

{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "my-app",
  "compatibility_date": "2024-12-30",
  "compatibility_flags": [
    // Enable Node.js API
    // see https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag
    "nodejs_compat",
    // Allow to fetch URLs in your app
    // see https://developers.cloudflare.com/workers/configuration/compatibility-flags/#global-fetch-strictly-public
    "global_fetch_strictly_public",
  ],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS",
  },
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      // The service should match the "name" of your worker
      "service": "my-app",
    },
  ],
  "r2_buckets": [
    // Create a R2 binding with the binding name "NEXT_INC_CACHE_R2_BUCKET"
    // {
    //   "binding": "NEXT_INC_CACHE_R2_BUCKET",
    //   "bucket_name": "<BUCKET_NAME>",
    // },
  ],
}
As shown above: - You must enable the nodejs_compat compatibility flag and set your compatibility date to 2024-09-23 or later, in order for your Next.js app to work with @opennextjs/cloudflare - The main and assets values should also not be changed unless you modify the build output result in some way - You can add a binding named NEXT_INC_CACHE_R2_BUCKET to make use of Next.js' caching as described in the Caching docs

4. Add an open-next.config.ts file
This step is optional since @opennextjs/cloudflare creates this file for you during the build process (if not already present).

Add a open-next.config.ts file to the root directory of your Next.js app:

import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
 
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
To use the OpenNextConfig type as illustrated above (which is not necessary), you need to install the @opennextjs/aws NPM package as a dev dependency.

5. Add a .dev.vars file
Then, add a .dev.vars file to the root directory of your Next.js app:

NEXTJS_ENV=development
The NEXTJS_ENV variable defines the environment to use when loading Next.js .env files. It defaults to "production" when not defined.

6. Update the package.json file
Add the following to the scripts field of your package.json file:

"build": "next build",
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
"upload": "opennextjs-cloudflare build && opennextjs-cloudflare upload",
"cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts",
The build script must invoke the Next.js build command, it will be invoke by opennextjs-cloudflare build.
npm run preview: Builds your app and serves it locally, allowing you to quickly preview your app running locally in the Workers runtime, via a single command.
npm run deploy: Builds your app, and then immediately deploys it to Cloudflare.
npm run upload: Builds your app, and then uploads a new version of it to Cloudflare.
cf-typegen: Generates a cloudflare-env.d.ts file at the root of your project containing the types for the env.
7. Add Static Asset Caching
Add a public/_headers file, with at least the following headers:

/_next/static/*
  Cache-Control: public,max-age=31536000,immutable
See the Static Assets Caching docs for more information.

8. Add caching with Cloudflare R2
See the Caching docs for information on enabling Next.js caching in your OpenNext project.

9. Remove any export const runtime = "edge"; if present
Before deploying your app, remove the export const runtime = "edge"; line from any of your source files.

The edge runtime is not supported yet with @opennextjs/cloudflare.

10. Add .open-next to .gitignore
You should add .open-next to your .gitignore file to prevent the build output from being committed to your repository.

11. Remove @cloudflare/next-on-pages (if necessary)
If your Next.js app currently uses @cloudflare/next-on-pages, you'll want to remove it, and make a few changes.

Uninstalling the @cloudflare/next-on-pages package as well as the eslint-plugin-next-on-pages package if present.

Remove any reference of these packages from your source and configuration files. This includes:

setupDevPlatform() calls in your Next.js config file
getRequestContext imports from @cloudflare/next-on-pages from your source files (those can be replaced with getCloudflareContext calls from @opennextjs/cloudflare)
next-on-pages eslint rules set in your Eslint config file
12. Develop locally
You can continue to run next dev when developing locally.

Modify your Next.js configuration file to import and call the initOpenNextCloudflareForDev utility from the @opennextjs/cloudflare package. This makes sure that the Next.js dev server can optimally integrate with the open-next cloudflare adapter and it is necessary for using bindings during local development.

This is an example of a Next.js configuration file calling the utility:

// next.config.ts
import type { NextConfig } from "next";
 
const nextConfig: NextConfig = {
  /* config options here */
};
 
export default nextConfig;
 
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
After having added the initOpenNextCloudflareForDev() call in your Next.js configuration file, you will be able, during local development, to access in any of your server code, local versions of Cloudflare bindings as indicated in the bindings documentation.

In step 3, we also added the npm run preview, which allows you to quickly preview your app running locally in the Workers runtime, rather than in Node.js. This allows you to test changes in the same runtime as your app will run in when deployed to Cloudflare.

13. Deploy to Cloudflare Workers
Either deploy via the command line:

npm run deploy
Or connect a Github or Gitlab repository, and Cloudflare will automatically build and deploy each pull request you merge to your production branch.

Last updated on September 4, 2025

Bindings
Bindings allow your Worker to interact with resources on the Cloudflare Developer Platform. When you declare a binding on your Worker, you grant it a specific capability, such as being able to read and write files to an R2 bucket.

How to configure your Next.js app so it can access bindings
Install @opennextjs/cloudflare, and then add a wrangler configuration file in the root directory of your Next.js app, as described in Get Started.

How to access bindings in your Next.js app
You can access bindings from any route of your Next.js app via getCloudflareContext:

import { getCloudflareContext } from "@opennextjs/cloudflare";
 
export async function GET(request) {
  const myKv = getCloudflareContext().env.MY_KV_NAMESPACE;
  await myKv.put("foo", "bar");
  const foo = await myKv.get("foo");
 
  return new Response(foo);
}
getCloudflareContext can only be used in SSG routes in "async mode" (making it return a promise), to run the function in such a way simply provide an options argument with async set to true:

const context = await getCloudflareContext({ async: true });
WARNING: During SSG caution is advised since secrets (stored in .dev.vars files) and local development values from bindings (like values saved in a local KV) will be used for the pages static generation.

How to add bindings to your Worker
Add bindings to your Worker by adding them to your wrangler configuration file.

TypeScript type declarations for bindings
To ensure that the env object from getCloudflareContext().env above has accurate TypeScript types, run the following Wrangler command to generate types that match your Worker's configuration:

npx wrangler types --env-interface CloudflareEnv
This will generate a d.ts file and save it to worker-configuration.d.ts.

To ensure that your types are always up-to-date, make sure to run wrangler types --env-interface CloudflareEnv after any changes to your config file.

Local access to bindings
As presented in the getting started your application can be both developed (next dev) and previewed (opennextjs-cloudflare preview) locally, in both cases bindings will be accessible from your application's code.

Such bindings are by default local simulation that mimic the behavior of the actual Cloudflare resources.

Remote bindings
As mentioned above, by default local emulations of the bindings are used.

However remote bindings can also be used, allowing your application code, while still running locally, to connect to remote resources associated to your Cloudflare account.

Remote bindings are currently experimental and can be enabled it in your next.config.ts file:

- initOpenNextCloudflareForDev();
+ initOpenNextCloudflareForDev({
+  experimental: { remoteBindings: true }
+ });
When the feature is turned on all you then need to do to enable remote mode for any of your bindings is to set the experimental_remote configuration field to true, exactly as documented in the remote bindings documentation.

Note that remote bindings will also be used during build, this can be very useful for example when using features such ISR so that read production data can be used for the site's static generation

Other Cloudflare APIs (cf, ctx)
You can access context about the incoming request from the cf object, as well as lifecycle methods from the ctx object from the return value of getCloudflareContext():

import { getCloudflareContext } from "@opennextjs/cloudflare";
 
export async function GET(request) {
  const { env, cf, ctx } = getCloudflareContext();
 
  // ...
}

Caching
Next.js offers multiple ways to improve an application's performance by caching routes and network requests. An application will try to pre-render and cache as much data as possible during build-time to reduce the amount of work required when serving a response to a user.

The cache data are updated using revalidation, either peridiocally or on-demand:

"Time-based revalidation" updates the cache data after the revalidation delay specified by the applications expires
"On-demand revalidation" allows to invalid cache entries with a specific tag (via revalidateTag) or at a given path (via revalidatePath). You can also use res.revalidate in Pages router API route.
The @opennextjs/cloudflare caching supports rely on 3 components:

An Incremental Cache to store the cache data
A Queue to synchronize and deduplicate time-based revalidations
A Tag Cache for On-demand revalidations via revalidateTag and revalidatePath.
You can also enable cache interception, to avoid calling the NextServer and thus loading the javascript associated with the page. It can slightly improve cold start performance for ISR/SSG route on cached routes. As of now, cache interception does not work with PPR and is not enabled by default.

Additionally some components uses the Cache Api to improve the performance of these different components. If you're planning on using On-Demand revalidation, you should also use the Cache Purge component to automatically purge the cache when a page is revalidated.

The adapter provides several implementations for each of those components configured in open-next.config.ts.

This guide provides guidelines for common use cases before detailing all the configuration options.

Everything in this page only concerns SSG/ISR and the data cache, SSR route will work out of the box without any caching config.

Guidelines
Small site using revalidation
You should use the following implementation for a small site:

Incremental Cache: use R2 to store the data
Queue: use a Queue backed by Durable Objects
Tag Cache: D1NextModeTagCache
{
  "name": "<WORKER_NAME>",
  // ...
 
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      "service": "<WORKER_NAME>",
    },
  ],
 
  // R2 incremental cache
  "r2_buckets": [
    {
      "binding": "NEXT_INC_CACHE_R2_BUCKET",
      "bucket_name": "<BUCKET_NAME>",
    },
  ],
 
  // DO Queue
  "durable_objects": {
    "bindings": [
      {
        "name": "NEXT_CACHE_DO_QUEUE",
        "class_name": "DOQueueHandler",
      },
    ],
  },
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["DOQueueHandler"],
    },
  ],
 
  // D1 Tag Cache (Next mode)
  // This is only required if you use On-demand revalidation
  "d1_databases": [
    {
      "binding": "NEXT_TAG_CACHE_D1",
      "database_id": "<DATABASE_ID>",
      "database_name": "<DATABASE_NAME>",
    },
  ],
}
Large site using revalidation
For a larger site, you should use the ShardedDOTagCache that can handle a higher load than the D1NextModeTagCache:

{
  "name": "<WORKER_NAME>",
  // ...
 
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      "service": "<WORKER_NAME>",
    },
  ],
 
  // R2 incremental cache
  "r2_buckets": [
    {
      "binding": "NEXT_INC_CACHE_R2_BUCKET",
      "bucket_name": "<BUCKET_NAME>",
    },
  ],
 
  // DO Queue and DO Sharded Tag Cache
  "durable_objects": {
    "bindings": [
      {
        "name": "NEXT_CACHE_DO_QUEUE",
        "class_name": "DOQueueHandler",
      },
      // This is only required if you use On-demand revalidation
      {
        "name": "NEXT_TAG_CACHE_DO_SHARDED",
        "class_name": "DOShardedTagCache",
      },
      {
        "name": "NEXT_CACHE_DO_PURGE",
        "class_name": "BucketCachePurge",
      },
    ],
  },
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": [
        "DOQueueHandler",
        // This is only required if you use On-demand revalidation
        "DOShardedTagCache",
        "BucketCachePurge",
      ],
    },
  ],
}
SSG site
If your site is static, you do not need a Queue nor a Tag Cache. You can use a read-only Workers Static Assets-based incremental cache for the prerendered routes.

import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";
 
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
Staging
For staging, when your site receives low traffic from a single IP, you can replace the DO queue with a memory queue.

References
Static Assets Caching
The worker doesn't run in front of static assets, so the headers option of next.config.ts doesn't apply to public files (public) and immutable build files (like _next/static).

By default, Cloudflare Static Assets headers use max-age=0 with must-revalidate, allowing the browser to cache assets but with a revalidation request. This is the same default behavior as the public folder on Next.js.

Next.js also generates immutable files that don't change between builds. Those files will also be served from Static Assets. To match the default cache behavior of immutable assets in Next.js, avoiding unnecessary revalidation requests, add the following header to the public/_headers file:

/_next/static/*
  Cache-Control: public,max-age=31536000,immutable
Incremental Static Regeneration (ISR)
There are 3 storage options for the incremental cache:

R2 Object Storage: A cost-effective S3-compatible object storage option for large amounts of unstructured data. Data is stored in a single region, meaning cache interactions may be slower - this can be mitigated with a regional cache.
Workers KV: A fast key value store, it uses Cloudflare's Tiered Cache to increase cache hit rates. When you write cached data to Workers KV, you write to storage that can be read by any Cloudflare location. This means your app can fetch data, cache it in KV, and then subsequent requests anywhere around the world can read from this cache.
Workers Static Assets: A read-only store for the incremental cache, serving build-time values from Workers Static Assets. Revalidation is not supported with this cache.
1. Create an R2 Bucket
npx wrangler@latest r2 bucket create <YOUR_BUCKET_NAME>
2. Add the R2 Bucket and Service Binding to your Worker
The binding name used in your app's worker is NEXT_INC_CACHE_R2_BUCKET. The service binding should be a self reference to your worker where <WORKER_NAME> is the name in your wrangler configuration file.

The prefix used by the R2 bucket can be configured with the NEXT_INC_CACHE_R2_PREFIX environment variable, and defaults to incremental-cache.

// wrangler.jsonc
{
  // ...
  "name": "<WORKER_NAME>",
  "r2_buckets": [
    {
      "binding": "NEXT_INC_CACHE_R2_BUCKET",
      "bucket_name": "<BUCKET_NAME>",
    },
  ],
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      "service": "<WORKER_NAME>",
    },
  ],
}
3. Configure the cache
In your project's OpenNext config, enable the R2 cache.

You can optionally setup a regional cache to use with the R2 incremental cache. This will enable faster retrieval of cache entries and reduce the amount of requests being sent to object storage.

The regional cache has two modes:

short-lived: Responses are re-used for up to a minute.
long-lived: Fetch responses are re-used until revalidated, and ISR/SSG responses are re-used for up to 30 minutes.
Additionally there are options you can use to customize the behavior of the regional cache:

shouldLazilyUpdateOnCacheHit: Instructs the cache to be lazily updated, meaning that when requesting data from the cache, a background request is sent to the R2 bucket to get the latest entry. This is enabled by default for the long-lived mode.
bypassTagCacheOnCacheHit: Instructs the cache not to check the tag cache when there is a regional cache hit. This enables reducing response times. When this option is used you need to make sure that the cache gets correctly purged either by enabling the automatic cache purge or purging the cache manually. Defaults to false.
// open-next.config.ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
// ...
 
// With regional cache enabled:
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: "long-lived",
    shouldLazilyUpdateOnCacheHit: true,
  }),
  // ...
});
 
// Without regional cache:
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  // ...
});
Queue
A queue must be setup for projects using Time-Based revalidation. It is not needed when revalidation is not used nor only On-Demand revalidation is used.

Configure the queue

In your project's OpenNext config, enable the cache and set up a queue.

The Durable Object Queue will send revalidation requests to a page when needed, and offers support for de-duplicating requests. By default there will be a maximum of 10 instance of the Durables Object Queue and they can each process up to 5 requests in parallel, for up to 50 concurrent ISR revalidations.

// open-next.config.ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// ...
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
 
export default defineCloudflareConfig({
  // ...
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
});
You will also need to add some binding to your wrangler.jsonc file.

"durable_objects": {
    "bindings": [
      {
        "name": "NEXT_CACHE_DO_QUEUE",
        "class_name": "DOQueueHandler"
      }
    ]
  },
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["DOQueueHandler"]
    }
  ],
You can customize the behaviors of the queue with environment variables:

The max number of revalidations that can be processed by an instance of durable object at the same time (NEXT_CACHE_DO_QUEUE_MAX_RETRIES)
The max time in milliseconds that a revalidation can take before being considered as failed (NEXT_CACHE_DO_QUEUE_REVALIDATION_TIMEOUT_MS)
The amount of time after which a revalidation will be attempted again if it failed. If it fails again it will exponentially back off until it reaches the max retry interval (NEXT_CACHE_DO_QUEUE_RETRY_INTERVAL_MS)
The maximum number of attempts that can be made to revalidate a path (NEXT_CACHE_DO_QUEUE_MAX_RETRIES)
Disable SQLite for this durable object. It should only be used if your incremental cache is not eventually consistent (NEXT_CACHE_DO_QUEUE_DISABLE_SQLITE)
There is 2 additional modes that you can use for the queue direct and the memory queue

The memory queue will dedupe request but only on a per isolate basis. It is not fully suitable for production deployments, you can use it at your own risk!

The direct mode for the queue is intended for debugging purposes and is not recommended for use in production. It only works in preview mode (i.e. wrangler dev)

For apps using the Page Router, res.revalidate requires to provide a self reference service binding named WORKER_SELF_REFERENCE.

In certain situations, you may encounter the limits of what the Durable Object queue can manage for a single page or route. In such cases, you can utilize the queueCache to minimize the number of stale requests sent to the queue. This is achieved by adding and verifying a cache entry via the Cache API before dispatching a request to the queue. If a cache entry already exists, the request will not be sent to the queue, as it will be considered already in process.

// open-next.config.ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// ...
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import queueCache from "@opennextjs/cloudflare/overrides/queue/queue-cache";
 
export default defineCloudflareConfig({
  // ...
  incrementalCache: r2IncrementalCache,
  queue: queueCache(doQueue, {
    regionalCacheTtlSec: 5, // The TTL for the regional cache, defaults to 5 seconds
 
    // Whether to wait for the queue to acknowledge the request before returning
    // When set to false, the cache will be populated asap and the queue will be called after.
    // When set to true, the cache will be populated only after the queue ack is received.
    waitForQueueAck: true,
  }),
});
Tag Cache for On-Demand Revalidation
The tag revalidation mechanism can use either a Cloudflare D1 database or Durable Objects with SqliteStorage as its backing store for information about tags, paths, and revalidation times.

To use on-demand revalidation, you should also follow the ISR setup steps.

If your app only uses the pages router, it does not need to have a tag cache and should skip this step. You can also skip this step if your app doesn't use revalidateTag nor revalidatePath.

There are 2 different options to choose from for the tag cache: d1NextTagCache, doShardedTagCache. Which one to choose should be based on two key factors:

Expected Load: Consider the volume of traffic or data you anticipate.
Usage of revalidateTag / revalidatePath: Evaluate how frequently these features will be utilized.
If either of these factors is significant, opting for a sharded database is recommended. Additionally, incorporating a regional cache can further enhance performance.

Create a D1 database and Service Binding

The binding name used in your app's worker is NEXT_TAG_CACHE_D1. The WORKER_SELF_REFERENCE service binding should be a self reference to your worker where <WORKER_NAME> is the name in your wrangler configuration file.

// wrangler.jsonc
{
  // ...
  "d1_databases": [
    {
      "binding": "NEXT_TAG_CACHE_D1",
      "database_id": "<DATABASE_ID>",
      "database_name": "<DATABASE_NAME>",
    },
  ],
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      "service": "<WORKER_NAME>",
    },
  ],
}
Create table for tag revalidations

The D1 tag cache requires a revalidations table that tracks On-Demand revalidation times.

Configure the cache

In your project's OpenNext config, enable the R2 cache and set up a queue (see above). The queue will send a revalidation request to a page when needed, but it will not dedupe requests.

// open-next.config.ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";
 
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
  tagCache: d1NextTagCache,
});
4. Initialise the cache during deployments
In order for the cache to be properly initialised with the build-time revalidation data, you need to run a command as part of your deploy step. This should be run as part of each deployment to ensure that the cache is being populated with each build's data.

To populate remote bindings and create a new version of your application at the same time, you can use either the deploy command or the upload command. Similarly, the preview command will populate your local bindings and start a Wrangler dev server.

# Populate remote and deploy the worker immediately.
opennextjs-cloudflare deploy
 
# Populate remote and upload a new version of the worker.
opennextjs-cloudflare upload
 
# Populate local and start dev server.
opennextjs-cloudflare preview
It is possible to only populate the cache without any other steps with the populateCache command.

# The target is passed as an option, either `local` or `remote`.
opennextjs-cloudflare populateCache local
Automatic Cache Purge
You can only enable cache purge functionality on a zone (e.g., when using a custom domain).

The cache purge component automatically clears the cache when a page is revalidated. It is only necessary if you use On-Demand revalidation along with one of the cache components that leverage the Cache API.

This component can either call the Cache API's purge function directly or route the purge request through an intermediate durable object. Using a durable object helps buffer requests and avoid reaching API rate limits.

Cache purge are only called when you call revalidateTag, revalidatePath or res.revalidate in the pages router. It is not called for ISR revalidation.

To use cache purge, you need to define the following wrangler secrets:

CACHE_PURGE_API_TOKEN should be set to an API token with the Cache Purge permission
CACHE_PURGE_ZONE_ID should be set to the zone ID of your deployment domain
Below is an example configuration for integrating the cache purge component in your open-next.config.ts:

import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import doShardedTagCache from "@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import { purgeCache } from "@opennextjs/cloudflare/overrides/cache-purge/index";
 
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, { mode: "long-lived" }),
  queue: doQueue,
  // This is only required if you use On-demand revalidation
  tagCache: doShardedTagCache({ baseShardSize: 12 }),
  // Disable this if you want to use PPR
  enableCacheInterception: true,
  // you can also use the `durableObject` option to use a durable object as a cache purge
  cachePurge: purgeCache({ type: "direct" }),
});
If you want to use the durable object option, you will need to add the following binding to your wrangler.jsonc file:

{
  "durable_objects": {
    "bindings": [
      {
        "name": "NEXT_CACHE_DO_PURGE",
        "class_name": "BucketCachePurge",
      },
    ],
  },
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["BucketCachePurge"],
    },
  ],
}
You can customize the duration of the cache purge buffering with the NEXT_CACHE_DO_PURGE_BUFFER_TIME_IN_SECONDS environment variable. The default is 5 seconds. It works by buffering the purge requests for a given amount of time and then sending them all at once. This is useful to avoid hitting the API rate limits.