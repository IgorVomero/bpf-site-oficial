# BPF Cartões

Static Vite multi-page foundation for the institutional website.

## Requirements

- Node.js 24 or newer
- npm

## Commands

```sh
npm ci
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
```

`preview` serves the local production build after `build`.

## Architecture principles

- Static build output; no server runtime, database, CMS, or runtime secrets.
- Add dependencies and project structure only when a confirmed requirement needs them.
- Each public route needs its own HTML entry; direct navigation does not use an SPA fallback.
- Use semantic HTML and browser capabilities for static content. React remains installed but is not loaded by any current page.
- Share only confirmed styles and assets. Exact local Kumbh Sans and Mulish font files are pending.
- Add other page content only after it is approved.

The Home uses only optimized images from the approved local ZIP.
The original export and full-page render remain outside the deployed assets.
The Quem Somos page has its own HTML entry and reuses the shared styles and
existing Home imagery where the approved design repeats those images.
Pass 9 restores the approved NEW-render copy, including its history and
mission/vision/values, subject to the client's final editorial corrections.
Pass 9.5 restores Home's approved metrics (300k+ cards, 300 establishments and
600 companies), the institutional icons and overlapping solution cards.
Other numerical claims remain excluded. Home's six FAQ entries use native
`details`/`summary` elements and the exact client-approved wording.

The provider assets at `public/estabelecimentos/providers/` come from the
Estabelecimentos NEW render in the approved local `BPF Site (Copy).zip`.
The original white logo artwork was isolated from that render's red background;
Rede Pop is excluded. Clover comes from the existing local file
`/Users/igorvomero/Downloads/Clover_mobile_app_Logo.svg.png`, optimized to WebP
with its proportions preserved. CSS displays it in white to match the strip.
Pass 9.5 keeps this approved Clover asset and displays all seven accepted
providers in a seamless 30-second CSS marquee. Its duplicate list is hidden
from assistive technology; reduced motion shows the complete static list.
The two new Home benefit icons come from the ZIP's `Group 1.png` and `Group 2.png`.
The Mission and Vision artwork comes from those same assets; Values and the
three Users benefit icons are isolated from their complete approved NEW renders.

The clean source photographs for the Companies CTA, Home hero and establishment
portal are absent from the ZIP. The establishment CTA export also contains
baked-in copy. Existing backgrounds remain unchanged where the full photograph
cannot be recovered without generating replacement content.

## Privacy-policy URLs

The legal text has one maintained copy at `bpf-politicas-privacidade/index.html`.
Its six sections were transcribed without wording changes from the recovered
former BPF site page and checked against the archived site HTML.

The canonical public URL is `/bpf-politicas-privacidade/`. On the eventual
Apache-compatible host, merge this internal rewrite into the existing root
configuration **before any catch-all rule**:

```apache
RewriteEngine On
RewriteRule ^site/politica/?$ /bpf-politicas-privacidade/index.html [END]
```

This serves the same file at `/site/politica` while keeping that URL in the
address bar. It is not a browser redirect. Vite's local preview does not apply
Apache rules, so the alias must be verified when hosting is configured.

The original archived PDFs are kept unchanged at `/site/adesao.pdf` and
`/site/etica-e-integridade.pdf` for legacy links. They are downloaded only
when requested.
