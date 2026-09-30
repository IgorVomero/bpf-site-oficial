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

The Home uses only optimized individual images from the approved Figma ZIP.
The original export and full-page render remain outside the deployed assets.
The Quem Somos page has its own HTML entry and reuses the shared styles and
existing Home imagery where the approved design repeats those images.
Its history and mission/vision/values copy remain omitted pending approved text.

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
