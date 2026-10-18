# BD Sporting’s Darmstadt — Vue frontend

This folder contains the standalone Vue 3 conversion of the BD Sporting’s Darmstadt website. The original React/Next/Vinext project remains unchanged in the parent folder and can continue to be used as a reference.

## Technology

- Vue 3
- Vite
- Vue Router
- Plain JavaScript
- Regular CSS with CSS variables
- npm

There is no traditional backend in this project yet. Public website content is prepared for a Google Sheets content manager, with the original files in `src/data/` retained as a safe fallback. FastAPI can replace the content service later without redesigning the views.

## Requirements

- Node.js 20.19 or newer (Node.js 22 LTS is recommended)
- npm

## Run locally

From the original project folder:

```bash
cd frontend-vue
npm install
npm run dev
```

Vite will print the local URL, normally `http://localhost:5173/`.

## Production build

```bash
npm run build
```

The production files are written to `dist/`. To preview that build locally:

```bash
npm run preview
```

## Routes

- `/` — homepage
- `/committee` — committee page

## Content management

The site can load approved public content from the Google Sheet named **BD Sporting Website Content**. Club editors can update homepage text, committee members and photos, news, events, fixtures, results and site settings without editing Vue files.

The integration uses `src/services/contentApi.js` and `src/composables/useSiteContent.js`. If the Sheet cannot be reached, the website automatically uses the local files in `src/data/`, so a permission or network problem does not take the site offline.

For the one-time connection, the Sheet must be readable by website visitors. Give it **Anyone with the link — Viewer** access. Do not place private member records, passwords, payment details or unpublished personal data in this Sheet.

After that one-time connection, the normal workflow is:

1. Edit a row in the Google Sheet.
2. Set `Published` to `Yes` when the content is ready.
3. Reload the website. No Git commit or Cloudflare deployment is required for content-only updates.

## Project structure

```text
frontend-vue/
├── public/
│   ├── club-logo.png
│   └── team-photo.png
├── src/
│   ├── components/
│   │   ├── ClubLogo.vue
│   │   ├── SiteFooter.vue
│   │   └── SiteHeader.vue
│   ├── data/
│   │   ├── committee.js
│   │   ├── events.js
│   │   ├── fixtures.js
│   │   └── news.js
│   ├── router/
│   │   └── index.js
│   ├── styles/
│   │   └── main.css
│   ├── views/
│   │   ├── CommitteeView.vue
│   │   └── HomeView.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
└── vite.config.js
```

## Future backend integration

The planned backend can be added separately with FastAPI and SQLite, then moved to PostgreSQL if needed. A practical next step will be to add a small API/service layer in `src/` that fetches the same data shapes currently exported from `src/data/`. The Vue components already render from those objects and arrays, so the page design does not need to change when the data source becomes an API.
