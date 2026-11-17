# EZ-Bites — Owner Dashboard (Frontend Prototype)

A **standalone React + Vite frontend demo** for the EZ-Bites software engineering course project.
It is intentionally separate from the team's existing `frontend` folder, so you can inspect it first without replacing any existing files.

## Run on Windows (VS Code)

1. Install Node.js if needed (Node 20 LTS or newer recommended).
2. Extract this ZIP into a separate folder.
3. Open the extracted `ez-bites-owner-dashboard` folder in VS Code.
4. In **Terminal > New Terminal**, run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL shown in the terminal (usually `http://localhost:5173`).

For a production build later:

```bash
npm run build
```

## What works now

- **Restaurant Preview**: desktop / mobile layout, English / French menu-name toggle, sunny/cloudy/rainy theme selection with **Save theme**.
- **Menu Management**: add items (English name, French name and CAD price required), edit, delete, availability toggle, search.
- **Orders**: sample orders with ID, time, customer name, telephone, items, quantities, total; expand and collapse details; manually refresh demo data.
- **Reset demo**: restore original sample products and the sunny theme.

## What intentionally does NOT work yet

- **No backend, API calls or database.**
- No real orders or actual customers: the orders are fictional examples in `src/data.js`.
- No authentication. Do not expose this as a real restaurant administration site.
- The customer site within Restaurant Preview is **read-only**. Its Add button and cart are visual placeholders; you can test the language switch. Full customer checkout belongs to a later phase.
- Refresh Orders simply reloads the same in-memory sample data until an API is integrated.

## Data persistence (local demo only)

The owner menu and saved theme are stored in **your browser's `localStorage`** so you can refresh the page and continue the demo. This is *not* a database, is not shared across devices, and can be cleared by browser settings. The fictional orders remain hardcoded. The customer's cart is not implemented; when implemented, the agreed requirement is **no cart restoration after refreshing or closing the customer page**.

## Files

- `src/App.jsx`: dashboard and interactive page components.
- `src/Icons.jsx`: built-in SVG icons; no separate icon library required.
- `src/data.js`: demonstration products, orders, theme configuration.
- `src/styles.css`: responsive styles and three weather palettes.
- `public/images`: offline SVG fallbacks if remote food photos cannot load.

## Media sources

For the initial demo, food photos are loaded remotely from Wikimedia Commons and may require an internet connection. If loading fails, the website displays built-in SVG fallback artwork:

- Sunny cheeseburger: [NIH / Renee Comet, public domain](https://commons.wikimedia.org/wiki/File:Cheeseburger_(2).jpg).
- Cloudy shepherd's pie: [Simon Speed, CC0](https://commons.wikimedia.org/wiki/File:ShepherdsPieAndPeas.JPG).
- Rainy clam chowder: [Jon Sullivan, public domain](https://commons.wikimedia.org/wiki/File:Clam_chowder.jpg).

These sample media can be replaced later with the team's own food photos in `src/data.js`.

## Integration path (later)

When the team is ready, we can replace:

- local `products` state with a `GET /api/products` response.
- menu add/edit/delete and availability actions with backend API calls.
- saved theme `localStorage` with a restaurant settings API.
- demo orders with an orders API and manual Refresh button.

Before exposing a real Owner Dashboard with customers' names and phone numbers, add appropriate authentication and access control.
