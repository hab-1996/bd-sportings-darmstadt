# BD Sporting’s Darmstadt — Vue frontend

This folder contains the standalone Vue 3 conversion of the BD Sporting’s Darmstadt website. The original React/Next/Vinext project remains unchanged in the parent folder and can continue to be used as a reference.

## Technology

- Vue 3
- Vite
- Vue Router
- Plain JavaScript
- Regular CSS with CSS variables
- npm

There is no backend in this project yet. News, events, fixtures, results, and committee content live in `src/data/` so those imports can later be replaced by FastAPI calls without redesigning the views.

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
