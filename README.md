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
- Use semantic HTML and browser capabilities for static content. React remains installed but is not loaded by the current page.
- Share only confirmed styles and assets. Exact local Kumbh Sans and Mulish font files are pending.
- Implement approved page content in later batches.
