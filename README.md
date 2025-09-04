# Treat Path Global Health

React + Vite application for Treat Path Global Health. It provides product browsing, authentication (Appwrite), admin upload/editing, search, and saved items. TailwindCSS is used for styling; React Router for routing.

## Prerequisites

- Node.js 18+
- pnpm/npm/yarn (examples use npm)
- Appwrite project (self-hosted or Cloud)

## Quick start

```bash
# Install
npm install

# Development
npm run dev

# Lint
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

## Environment variables

Create a `.env` file in the project root with at least the following:

```bash
VITE_APP_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APP_ID=<your_appwrite_project_id>

# Database and collections (used by AuthContext and other data ops)
VITE_APP_DB=<your_database_id>
VITE_APP_USERS_COLLECTION=<your_users_collection_id>
VITE_APP_PROD_COLLECTION=<your_products_collection_id>

# Optional: Google AdSense (conditional loading)
# Set your publisher ID (format: ca-pub-XXXXXXXXXXXXXXX) to enable AdSense in production
VITE_ADSENSE_PUBLISHER_ID=
```

Notes:

- All variables must start with `VITE_` to be exposed to the client in Vite.
- Do not commit real secrets; keep `.env` out of source control.

## Scripts

- `npm run dev`: Start Vite dev server.
- `npm run build`: Build for production to `dist/`.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint.

## Project structure (high level)

```text
src/
  App.jsx              # Routes and route guards
  context/AuthContext  # Auth, registration, sessions via Appwrite
  config/appwrite.js   # Appwrite client/services setup
  pages/               # Page-level routes (Home, Search, Terms, etc.)
  components/          # UI components and product-related views
  lib/                 # API/data helpers (CRUD, uploads, search)
  assets/              # Images and icons
```

## Appwrite setup (summary)

1. Create a project in Appwrite and note the Project ID.
2. Create a Database and note its Database ID.
3. Create a `users` collection (or similar) and note its Collection ID.
4. Create a `products` collection (or similar) and note its Collection ID.
5. Configure email verification and sessions as desired.
6. Add the values to `.env` using the keys listed above.

## AdSense and ERR_BLOCKED_BY_CLIENT

- If you run an ad blocker, network requests to AdSense may be blocked by the browser/extension, causing console errors like `Failed to load resource: net::ERR_BLOCKED_BY_CLIENT`.
- This project now loads AdSense only when `VITE_ADSENSE_PUBLISHER_ID` is defined and the app runs in production. In development or when the variable is empty, the script is not injected.
- Even in production, some users with ad blockers will still block the request, but we suppress script load errors to avoid noisy logs.

## Deployment

- Build with `npm run build`.
- Deploy the `dist/` directory to your host (Netlify config is included via `netlify.toml`).
- Ensure environment variables are configured on your host as well (e.g., Netlify build environment).

## Troubleshooting

- Missing images in social meta: `index.html` references `/src/assets/og-image.jpg` and `/src/assets/twitter-image.jpg`. Provide these files or adjust the paths.
- Authentication issues: Ensure all Appwrite env vars are set correctly and that allowed platforms/origins include your site URL.
- Styling not applied: Verify Tailwind is installed and `src/index.css` is imported in `src/main.jsx`.
- AdSense errors: See section above; set `VITE_ADSENSE_PUBLISHER_ID` or leave empty during development.
- Search not working: Ensure `VITE_APP_PROD_COLLECTION` is set to your products collection ID.

---
MIT License
