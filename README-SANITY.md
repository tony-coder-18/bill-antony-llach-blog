# Sanity integration

This blog now supports Sanity as the authoring backend while keeping the existing Jekyll frontend.

## What changed

- `sanity-studio/` contains a standalone Sanity Studio for writing and publishing posts.
- `scripts/sync-sanity-posts.mjs` pulls published Sanity posts into `_sanity_posts/` before Jekyll builds.
- `scripts/import-markdown-to-sanity.mjs` imports the current `_posts/*.markdown` files into Sanity so you can migrate existing content once.
- The homepage now prefers Sanity-backed posts and falls back to `_posts/` when no synced content exists yet.

## Setup

1. Copy `.env.example` to `.env` and fill in the Sanity values.
2. Copy `sanity-studio/.env.example` to `sanity-studio/.env` and use the same project ID and dataset.
3. Install root dependencies with `npm install`.
4. Install Studio dependencies with `npm install --prefix sanity-studio`.

## Local workflow

1. Run `npm --prefix sanity-studio run dev` to open the Sanity Studio.
2. Optionally run `npm run import:content` one time to move the existing Markdown posts into Sanity.
3. Run `npm run sync:content` to generate `_sanity_posts/`.
4. Run `bundle exec jekyll serve` to preview the blog.

For builds, use `npm run build`.
