# Ali Hassan — Graphic Designer Portfolio

A single-page graphic designer portfolio built with Next.js App Router, TypeScript, Framer Motion, and Lucide icons.

## Features

- **Interactive 3D Orbit Showcase** — rotating circular project gallery
  - Hover the stage to pause rotation
  - Click a card once to focus, click again to open a fullscreen modal
  - Press `Esc`, click outside, or use the `X` to close the modal
- **Dark / Light mode toggle** — remembers your choice in `localStorage`
- Responsive layout for mobile, tablet, and desktop
- WhatsApp contact integration

## Adding images to the 3D orbit showcase

Put any image file (`.webp`, `.png`, `.jpg`, `.jpeg`, `.svg`, `.gif`, `.avif`) inside:

```
public/orbit/
```

Every image in that folder automatically appears in the rotating 3D showcase. After adding/removing images, rebuild (or just push to GitHub — Vercel will rebuild automatically).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx        Root layout + fonts + metadata
  page.tsx          Server component that loads orbit images
  PortfolioClient.tsx  All client UI, dark mode, orbit + modal
  globals.css       All styling (CSS custom properties, themes)
public/
  images/           Portfolio section images
  orbit/            Add images here for the 3D showcase
```
