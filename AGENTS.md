# Eno CSS Playground

A practical CSS toolkit for frontend developers and students. Visual generators with live preview, code output, presets, and mini lessons.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React (icons)

## Project Structure

- `src/app/` — Route pages (one directory per generator)
- `src/components/` — Shared UI components (Sidebar, Controls, CodeOutput, etc.)
- `src/app/globals.css` — CSS variables, theme tokens, global styles
- `public/` — Static assets

## Conventions

- Every generator page is a `"use client"` component in its own route directory.
- Controls (Slider, Color, Select) come from `@/components/Controls`.
- Code output uses `@/components/CodeOutput` with copy-to-clipboard.
- Presets use `@/components/Presets` with active state tracking.
- Explanation panels use `@/components/ExplanationPanel` for collapsible lessons.
- Dark mode is handled by `ThemeProvider` using CSS variables and `localStorage`.
- All pages use `pt-14 md:pt-0` to offset the mobile header.

## Scripts

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm start      # Serve production build
npm run lint   # Run ESLint
```
