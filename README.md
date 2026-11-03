# Shivam Ruhela — Portfolio

Personal developer portfolio. Single page, dark mode by default.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 3 · shadcn/ui (Radix) · framer-motion · next-themes

## Getting started

```bash
npm install
cp .env.example .env.local   # GITHUB_TOKEN (GitHub section), RESEND_API_KEY + CONTACT_TO_EMAIL (contact form)
npm run dev                  # http://localhost:3000
```

## Scripts

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server (Turbopack) |
| `npm run build` | Production build (webpack)       |
| `npm run start` | Serve the production build       |
| `npm run lint`  | ESLint (next/core-web-vitals)    |

## Structure

```
app/          routes, layout, API routes
components/   ui/ (shadcn primitives) · sections/ (page sections) · site chrome
hooks/        client hooks
lib/          data.ts (all content) · types.ts · utils
public/       static assets
styles/       globals.css (design tokens)
```

All copy lives in `lib/data.ts`. Search for `TODO_` to find placeholders that still need real values.

## Environment variables

| Variable               | Where       | Purpose                                                                 |
| ---------------------- | ----------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | build       | Canonical origin for metadata, Open Graph, sitemap and robots           |
| `GITHUB_TOKEN`         | server only | GitHub GraphQL token (`read:user`) for the activity section             |
| `RESEND_API_KEY`       | server only | Resend API key for the contact form                                     |
| `CONTACT_TO_EMAIL`     | server only | Inbox that receives contact-form messages                               |
| `CONTACT_FROM_EMAIL`   | server only | Optional sender, only after verifying a domain in Resend                |

Without `GITHUB_TOKEN` the GitHub section shows a fallback card. Without the Resend
values the contact form logs to the terminal in development and returns 503 in production.

## Deploying to Vercel

1. **Finish the content.** Search for `TODO_` in `lib/data.ts` and replace every placeholder
   (email, GitHub URL/username, LeetCode, resume, photo, project links, certification year).
   Put the resume at `public/resume.pdf` and the photo under `public/images/`, then point
   `resumeUrl` and `photo.src` at them. Replace the generated SVGs in `public/images/projects/`
   with real screenshots (1200×675).
2. **Push to GitHub** and import the repo at [vercel.com/new](https://vercel.com/new).
   Framework preset: Next.js. Build command: `npm run build`. No other settings needed.
3. **Add environment variables** in Project → Settings → Environment Variables (table above).
   Set `NEXT_PUBLIC_SITE_URL` to the final domain, e.g. `https://shivamruhela.vercel.app`,
   with no trailing slash.
4. **Deploy.** The home page is static with hourly ISR, so GitHub data refreshes on its own.
5. **After the first deploy, check:**
   - `/sitemap.xml`, `/robots.txt` and `/opengraph-image` resolve.
   - Paste the URL into a social preview checker (e.g. opengraph.xyz) and confirm the card.
   - Submit the contact form once and confirm the email arrives with Reply-To set.
   - Run Lighthouse on the production URL (target 90+ on all four categories).
6. **Custom domain (optional):** add it under Project → Settings → Domains, then update
   `NEXT_PUBLIC_SITE_URL` and redeploy so canonical URLs and the sitemap match.
