# LenanaLabs

A Kenya-based engineering studio website built with Next.js, React, TypeScript, and Tailwind CSS. The design combines warm cream backgrounds, burnt orange accents, deep green sections, expressive typography, and an interactive synthetic contour map.

## Run locally

Use Node.js 22 or newer and npm. Run all npm commands inside the application directory:

```sh
cd lenanalabs
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

## Production build

```sh
cd lenanalabs
npm run build
npm run start
```

The latest production build passed, including TypeScript checking, the homepage, custom 404 page, and metadata routes. No domain is needed for local development. Next.js may warn that social-image metadata defaults to localhost until a production origin is configured.

## Features

- Hero, About, Capabilities, Approach, Lab, Contact, and footer.
- Deterministic terrain visualization with pointer, touch, and keyboard sampling.
- Accessible mobile navigation with focus containment and Escape support.
- An honest, data-driven Lab with an empty state until verified work is available.
- Contact form that opens an email draft, plus direct email and copy controls.
- A branded 404 page and Lucide icons for interface controls.

The terrain is illustrative; its coordinates and elevations are not geographical measurements. Contact opens the visitor's email application; this website does not send or store messages.

## Project structure

```text
lenanalabs/
  src/app/          Page composition, metadata, 404, and global styles
  src/components/   Sections, forms, navigation, shared controls, and visuals
  src/config/       Centralized studio details
  src/data/         Capabilities and verified Lab projects
  src/lib/          Terrain math and contact validation
  scripts/          Unit and browser checks
```

`lenanalabs` is explicitly configured as the Turbopack root. Keep dependencies and npm lockfiles inside that directory.

## Documentation

- [Application setup, content editing, and checks](lenanalabs/README.md)
- [Implementation review and verification history](lenanalabs/IMPLEMENTATION_REVIEW.md)
- [Original visual reference](final.html)
