# Rocky Concrete Inc.

A modern, high-performance website for Rocky Concrete Inc., showcasing premium concrete and landscaping services in Bakersfield, CA.

**Live Site:** [rockyconcreteinc.com](https://rockyconcreteinc.com)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Astro 5](https://astro.build) (SSR) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| CMS | [Sanity](https://sanity.io) (embedded studio) |
| Video | [Mux](https://mux.com) |
| UI Components | React 18 |
| Hosting | [Netlify](https://netlify.com) |

---

## Features

- **Dynamic Gallery System** — Browse projects by category with drag-and-drop ordering in the CMS
- **Video Support** — Upload and stream project videos via Mux integration
- **Embedded CMS** — Sanity Studio accessible at `/admin` for content management
- **Server-Side Rendering** — Fast, SEO-optimized pages with Astro SSR
- **Responsive Design** — Luxury dark theme with bronze accents, optimized for all devices
- **Scroll Animations** — Smooth reveal animations throughout the site
- **Contact Forms** — Netlify Forms integration for lead capture
- **Auto Sitemap** — SEO-friendly sitemap generation

---

## Services Showcased

- Concrete Work (driveways, patios, walkways, flatwork)
- Outdoor Kitchens
- Covered Patios
- Fire Features (pits, tables, fireplaces)
- Landscaping (turf, gardens, water features)
- Iron Work (gates, railings, metalwork)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/jen444x/upgrade-rocky-concrete.git
cd upgrade-rocky-concrete

# Install dependencies
npm install

# Start development server
npm run dev
```

The site runs at `http://localhost:4321` and Sanity Studio at `http://localhost:4321/admin`.

### Environment Variables

Create a `.env.local` file:

```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token  # For uploads/mutations
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Project Structure

```
src/
├── components/       # Astro & React components
├── layouts/          # Page layouts
├── pages/
│   ├── index.astro   # Homepage
│   ├── gallery.astro # Gallery overview
│   └── gallery/[category].astro  # Dynamic category pages
├── sanity/
│   ├── client.ts     # Sanity client config
│   └── schemaTypes/  # CMS content schemas
├── styles/           # Global styles & animations
└── utils/            # Helper functions
```

---

## CMS Content Types

**Gallery Item** — Photos and videos with:
- Category & subcategory classification
- Featured/hero image flags
- Drag-and-drop ordering
- Video support via Mux
- Finish type tags (for concrete)

**Category Covers** — Cover images for each service category on the homepage

---

## Deployment

The site deploys automatically to Netlify on push to `main`.

Manual deployment:

```bash
npm run build
# Deploy the `dist/` folder
```

---

## License

MIT License
