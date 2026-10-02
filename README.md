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

## Section rhythm foundation

`src/styles/global.css` defines three opt-in vertical-spacing tokens:

| Token | Definition | At 1024 / 1440px | Mobile minimum / maximum |
| --- | --- | --- | --- |
| `--section-space-spacious` | `clamp(3rem, 7vw, 7rem)` | 71.68 / 100.8px | 48 / 112px |
| `--section-space-standard` | `clamp(2.5rem, 5.5vw, 5.5rem)` | 56.32 / 79.2px | 40 / 88px |
| `--section-space-compact` | `clamp(2rem, 4vw, 4rem)` | 40.96 / 57.6px | 32 / 64px |

Values assume the default 16px root font size. During future page-by-page
polish, choose a level for each section and apply it through that page's CSS:

```css
.example-section {
  background: var(--surface);
  padding-block: var(--section-space-standard);
}
```

The section that paints the background also owns its top and bottom padding.
Adjacent red and lilac sections meet directly; lilac padding stays inside the
lilac section. Do not introduce spacer elements, white separator bands, or
external vertical margins to create section breathing room. Internal component
gaps remain independent. Review each section at desktop and mobile widths before
adopting a token; do not apply the foundation globally to every `section`.
No existing section consumes these tokens yet, and the approved Quem Somos
spacing remains unchanged.

The final Quem Somos product visual uses the approved `img-40 3.png` from the
local `BPF Site (Copy).zip`, the same front/back stack already used in
`public/empresas/cartoes-bpf.webp`. Its original is 1898 × 2316px (944,932 bytes).
Only transparent outer margins were trimmed, retaining an 8px safety inset,
before downsampling and WebP encoding at quality 95. The replacement
`public/quem-somos/feature-card.webp` is 1440 × 1262px (140,154 bytes) with alpha.
It replaces the incorrect hand/card photograph in that feature; card artwork
is preserved without generating or fabricating product details.

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

## Shared motion and mobile footer

All seven page entries load `src/reveal.ts`. Add `data-reveal` to a meaningful
composition (intro, image, CTA, or policy section), or `data-reveal-group` to an
existing card grid. The controller observes each direct child of a group;
no animation wrappers or per-card delays are needed. Avoid nesting reveal
targets, and keep heroes and navigation outside the reveal system.

Content is visible in the HTML and CSS by default. Only successfully observed
blocks below the initial viewport are hidden. Entrances use opacity and a 20px
CSS translation over 600ms, once per visit. Cards entering together stagger
by 70ms on each row, capped at 210ms; stacked mobile cards have no cascade.
When the section intro is also entering, cards give it a 70ms head start.
Focus, anchor navigation, reduced-motion changes, and back/forward restoration
leave content readable. Transition styles are released with an event and a
timeout so normal interaction feedback remains independent of reveal motion.

`global.css` owns reveal states, shared tap/focus feedback, and footer styling.
At 48rem and below, the footer has a compact brand/address block, contact and
access action rows, wrapping store badges, and a separated legal area. Its
desktop grid and all existing destinations are preserved; WhatsApp uses the
same action already present in the contact sections.
