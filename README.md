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

The site is a static export (`output: "export"`), so `npm run build` writes plain HTML, CSS, and JS to `lenanalabs/out`. `next start` does not serve static exports, so `npm run start` previews the build with a static file server instead:

```sh
cd lenanalabs
NEXT_PUBLIC_SITE_URL=https://lenanalabs.tech npm run build
npm run start
```

`NEXT_PUBLIC_SITE_URL` sets the canonical URL, social-image URLs, `robots.txt`, and `sitemap.xml`. Without it, the sitemap is empty and metadata falls back to localhost.

## Deployment

`.github/workflows/deploy-pages.yml` lints, typechecks, tests, builds, and publishes `lenanalabs/out` to GitHub Pages on every push to `main`. It can also be run by hand from the Actions tab.

One-time setup:

The domain is registered at get.tech and its DNS is hosted on Cloudflare (free plan).

1. **Move DNS to Cloudflare.** In the Cloudflare dashboard, choose *Add a domain*, enter `lenanalabs.tech`, and pick the Free plan. Delete any records Cloudflare imports for `@` or `www` (registrar parking or forwarding). Cloudflare then shows two nameservers, such as `xxx.ns.cloudflare.com`.
2. **Point get.tech at Cloudflare.** In the get.tech domain control panel, turn off DNSSEC if it is on, then replace the nameservers with the two from Cloudflare. Wait for Cloudflare to mark the domain *Active* (usually under an hour, at most 24 hours).
3. **Pages source.** In the repository's Settings → Pages, set *Source* to **GitHub Actions**.
4. **Verify the domain** (prevents takeover). In the Lenana-Labs organization's Settings → Pages → *Add a domain*, enter `lenanalabs.tech`. Add the TXT record GitHub shows (host `_github-pages-challenge-lenana-labs`) in Cloudflare → DNS → Records, then click *Verify* on GitHub.
5. **DNS records** in Cloudflare → DNS → Records. Set every record to **DNS only** (grey cloud) for now:

   | Type  | Name  | Content | Proxy |
   |-------|-------|---------|-------|
   | A     | `@`   | `185.199.108.153` | DNS only |
   | A     | `@`   | `185.199.109.153` | DNS only |
   | A     | `@`   | `185.199.110.153` | DNS only |
   | A     | `@`   | `185.199.111.153` | DNS only |
   | AAAA  | `@`   | `2606:50c0:8000::153` | DNS only |
   | AAAA  | `@`   | `2606:50c0:8001::153` | DNS only |
   | AAAA  | `@`   | `2606:50c0:8002::153` | DNS only |
   | AAAA  | `@`   | `2606:50c0:8003::153` | DNS only |
   | CNAME | `www` | `lenana-labs.github.io` | DNS only |

   GitHub only issues the HTTPS certificate when it can see its own IPs. A proxied (orange cloud) record hides them and the domain check fails.
6. **Custom domain.** In the repository's Settings → Pages, enter `lenanalabs.tech` under *Custom domain* and save. A `CNAME` file is not needed because Actions deployments ignore it.
7. **HTTPS.** Once the DNS check passes and the certificate is issued (minutes to a few hours), tick *Enforce HTTPS*. `www.lenanalabs.tech` then redirects to the apex.
8. **Optional: turn on the Cloudflare proxy.** GitHub Pages already serves through a CDN, so grey-cloud records are a complete setup. To get Cloudflare analytics, caching rules, or firewall rules, do this only after step 7 works:
   - Set SSL/TLS → Overview → encryption mode to **Full (strict)**. *Flexible* causes an endless redirect loop with *Enforce HTTPS*.
   - Turn off Speed → *Rocket Loader*, which rewrites scripts and can break Next.js hydration.
   - Switch the `@` and `www` records to *Proxied*.

   If GitHub later reports a certificate or DNS problem, switch the records back to *DNS only* until it clears.

## Features

- Hero, About, Capabilities, Approach, Lab, Contact, and footer.
- Deterministic terrain visualization with pointer, touch, and keyboard sampling.
- Accessible mobile navigation with focus containment and Escape support.
- An honest, data-driven Lab with an empty state until verified work is available.
- Contact form that opens an email draft, plus direct email and copy controls.
- A branded 404 page and Lucide icons for interface controls.
- Dedicated `/about` and `/projects` pages with shared navigation and footer.
- Three clearly labeled team placeholders, ready for approved profile details.
- A project archive with explicit publication controls, featured entries and category filters.

The terrain is illustrative; its coordinates and elevations are not geographical measurements. Contact opens the visitor's email application; this website does not send or store messages.

## Project structure

```text
lenanalabs/
  src/app/          Page composition, metadata, 404, and global styles
  src/components/   Sections, forms, navigation, shared controls, and visuals
  src/config/       Centralized studio details
  src/data/         Capabilities, team profiles, principles and project registry
  src/lib/          Terrain math, contact validation and project filtering
  scripts/          Unit and browser checks
```

`lenanalabs` is explicitly configured as the Turbopack root. Keep dependencies and npm lockfiles inside that directory.

## Documentation

- [Application setup, content editing, and checks](lenanalabs/README.md)
- [Implementation review and verification history](lenanalabs/IMPLEMENTATION_REVIEW.md)
- [About and Projects implementation and current content status](lenanalabs/README.md#about-and-projects)
- [Approved design references](design/README.md)
- [Original visual reference](final.html)
