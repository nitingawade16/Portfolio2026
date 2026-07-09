# Nitin Gawade — Premium Portfolio

> **For AI Models**: This README is written to give you full architectural context so you can make accurate, consistent changes to this codebase without guessing. Read it completely before touching any file.

---

## 🗂️ Project Overview

A multi-page personal portfolio website for **Nitin Gawade** (Frontend Developer / Python Programmer / AI Enthusiast). Built with React 19 + Vite 8 + Tailwind CSS v4 + Framer Motion. It is a **client-side SPA** with React Router v7 handling navigation. There is **no backend** — emails are sent via EmailJS.

The visual theme is a **dark, deep-ocean aesthetic**: deep navy/black backgrounds (`#050510`), cyan/blue/purple accents, glassmorphism cards, animated ocean background canvas, smooth scroll (Lenis), and Framer Motion transitions on every page.

---

## 🚀 Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React | ^19.1.0 | Core UI framework |
| Vite | ^8.1.0 | Build tool & dev server |
| Tailwind CSS | ^4.3.1 | Utility-first styling (via `@tailwindcss/vite`) |
| Framer Motion | ^12.42.0 | Animations & page transitions |
| Lenis | ^1.3.25 | Buttery smooth scroll |
| React Router DOM | ^7.18.0 | Client-side routing |
| Lucide React | ^1.23.0 | Icon library |
| @emailjs/browser | ^4.4.1 | Contact form email delivery |
| React Hot Toast | ^2.6.0 | Toast notifications |
| clsx + tailwind-merge | latest | Conditional className merging |

---

## 📁 Full Project Structure

```
portolio/                        <- project root
├── index.html                   <- HTML entry point (sets meta, fonts, title)
├── vite.config.js               <- Vite config (aliases, chunking, build options)
├── package.json
├── tsconfig.json                <- TypeScript config (even though project uses .jsx)
├── .env.example                 <- Template for EmailJS environment variables
│
├── public/                      <- Static assets served at /
│   ├── profile.jpg              <- Profile photo (put it here, reference via "/profile.jpg")
│   └── resume.pdf               <- Resume PDF (put it here, reference via "/resume.pdf")
│
└── src/
    ├── main.jsx                 <- React entry — mounts <App /> to #root
    ├── App.jsx                  <- Root component: routing, layout, global UI chrome
    ├── index.css                <- ALL global CSS: design tokens, base styles, utilities
    │
    ├── assets/                  <- Static imports (images used inside JSX)
    │
    ├── components/
    │   ├── animations/
    │   │   └── ScrollReveal.jsx        <- Intersection Observer fade-in wrapper
    │   │
    │   ├── backgrounds/
    │   │   ├── OceanBackground.jsx     <- Animated canvas ocean (fixed, z-index 0)
    │   │   └── OceanBackground.css     <- Ocean animation styles
    │   │
    │   ├── layout/
    │   │   ├── Navbar.jsx              <- Top navigation bar (routes, mobile menu)
    │   │   ├── Footer.jsx              <- Site footer (links, social, copyright)
    │   │   └── SmoothScroll.jsx        <- Lenis smooth scroll provider wrapper
    │   │
    │   ├── sections/
    │   │   └── FeaturedProjectSection.jsx  <- Featured projects block used in Home
    │   │
    │   └── ui/                         <- Reusable UI primitives
    │       ├── AnimatedInput.jsx        <- Animated form input component
    │       ├── BackToTop.jsx            <- Floating "back to top" button
    │       ├── CommandPalette.jsx       <- Ctrl+K command palette (keyboard nav)
    │       ├── ContactCard.jsx          <- Contact info card with social links
    │       ├── CountUp.jsx              <- Animated number counter
    │       ├── CustomIcons.jsx          <- SVG icon components not in lucide
    │       ├── InteractiveContactForm.jsx  <- Full contact form with EmailJS
    │       ├── InteractiveSkillCard.jsx    <- Skill card with hover effects
    │       ├── KeyboardShortcuts.jsx       <- Keyboard shortcut handler
    │       ├── Loader.jsx               <- Full-screen loading animation (on first load)
    │       ├── ProjectCard3D.jsx        <- 3D tilt project card
    │       ├── ProjectModal.jsx         <- Full-screen project detail modal
    │       ├── ScrollProgress.jsx       <- Top scroll progress bar
    │       ├── SectionTitle.jsx         <- Reusable section heading component
    │       ├── SkillChart.jsx           <- Bar chart for skill levels
    │       ├── SkillRadar.jsx           <- Radar/spider chart for skills
    │       ├── SkillTree.jsx            <- Tree visualization for skills
    │       ├── SpotlightBackground.jsx  <- Mouse-tracking spotlight effect
    │       └── TechStackVisualization.jsx  <- Visual tech stack grid
    │
    ├── context/
    │   └── AccessibilityContext.jsx    <- Accessibility settings (reduce motion, etc.)
    │
    ├── data/                           <- ALL CONTENT LIVES HERE — edit these files
    │   ├── personalInfo.js             <- Name, bio, email, social links, roles, stats
    │   ├── projects.js                 <- Project list with tech, links, descriptions
    │   ├── skills.js                   <- Skills with categories and levels
    │   └── education.js               <- Degrees, institutions, certificates
    │
    ├── hooks/                          <- Custom React hooks
    │   ├── useInView.js                <- Intersection observer hook
    │   ├── useMousePosition.js         <- Mouse x/y tracking hook
    │   └── useScrollProgress.js        <- Scroll percentage hook
    │
    ├── lib/                            <- Reserved for shared utilities (currently empty)
    │
    ├── pages/                          <- Full page components (lazy-loaded)
    │   ├── Home.jsx                    <- Landing page (hero, stats, featured projects)
    │   ├── About.jsx                   <- About me page
    │   ├── Skills.jsx                  <- Skills page (charts, cards, categories)
    │   ├── Projects.jsx                <- All projects with filter & modal
    │   ├── Education.jsx               <- Education & timeline
    │   ├── Certificates.jsx            <- Certificates & credentials
    │   ├── Achievements.jsx            <- Achievements & awards
    │   └── Contact.jsx                 <- Contact form + social links
    │
    └── utils/                          <- Helper functions go here (currently empty)
```

---

## 🏛️ Architecture & Key Patterns

### App Shell (`App.jsx`)

```
AccessibilityProvider
  └── LazyMotion (Framer Motion — domAnimation only)
        └── BrowserRouter
              ├── Loader (full-screen, shown until loaded=true)
              └── SmoothScroll (Lenis)
                    ├── OceanBackground (fixed canvas, z-index 0)
                    ├── CommandPalette (Ctrl+K)
                    ├── ScrollProgress (top bar)
                    ├── Navbar
                    ├── <main> → AnimatedRoutes (lazy pages)
                    ├── Footer
                    ├── BackToTop
                    ├── Toaster (react-hot-toast)
                    └── KeyboardShortcuts
```

### Routing

All pages are **lazy-loaded** via `React.lazy()`. Routes are wrapped in `<PageTransition>` (Framer Motion fade, 150ms). A 404 catch-all is included.

| Route | Page Component |
|---|---|
| `/` | `Home.jsx` |
| `/about` | `About.jsx` |
| `/skills` | `Skills.jsx` |
| `/projects` | `Projects.jsx` |
| `/education` | `Education.jsx` |
| `/certificates` | `Certificates.jsx` |
| `/achievements` | `Achievements.jsx` |
| `/contact` | `Contact.jsx` |

### Path Alias

`@` resolves to `./src`. So `@/components/ui/Loader` → `src/components/ui/Loader.jsx`. Configured in both `vite.config.js` and `tsconfig.json`.

### Styling System

- **Primary file**: `src/index.css` (~55KB) — contains ALL CSS custom properties, base resets, component classes, utility classes, animations, and Tailwind directives.
- **CSS Variables (design tokens)** are defined in `:root`:
  - `--accent-blue: #00d4ff` (primary)
  - `--accent-purple: #8b5cf6` (secondary)
  - `--accent-cyan: #06b6d4` (tertiary)
  - `--bg-primary: #050510` (main background)
  - `--glass-bg`, `--glass-bg-light` — glassmorphism backgrounds
  - `--text-primary`, `--text-secondary`, `--text-muted`, `--text-dim`
- **Tailwind CSS v4** is used alongside vanilla CSS. It is loaded as a Vite plugin.
- `clsx` + `tailwind-merge` are available for conditional class merging.

---

## 📊 Data Files — Shape Reference

### `src/data/personalInfo.js`

```js
export const personalInfo = {
  name: string,             // "NITIN GAWADE"
  firstName: string,
  lastName: string,
  tagline: string,          // Shown under hero name
  bio: string,              // Multi-line paragraph
  email: string,
  instagram: string,        // Full URL
  phone: string,
  linkedin: string,         // Full URL
  github: string,           // Full URL
  location: string,
  resumeUrl: string,        // "/resume.pdf" or "#"
  profileImage: string | null,  // "/profile.jpg" or null
  availableForWork: boolean,
  roles: string[],          // Typed animation roles in hero
  stats: [{ label, value, icon }],  // Hero stats section
  siteTitle: string,        // SEO <title>
  siteDescription: string,
  siteKeywords: string,
};
```

### `src/data/projects.js`

```js
export const projects = [
  {
    id: string,
    title: string,
    description: string,         // Short (card preview)
    longDescription: string,     // Full (modal detail)
    tech: string[],              // Technology tags
    category: string,            // "web" | "ai" | "mobile" | etc.
    github: string | null,       // GitHub URL
    demo: string | null,         // Live demo URL
    image: string | null,        // Image path
    featured: boolean,           // Show on Home page
    status: string,              // "completed" | "in-progress" | "planned"
  }
];
```

### `src/data/skills.js`

```js
export const skills = [
  {
    category: string,            // "Frontend" | "Backend" | "Tools" | etc.
    items: [
      { name: string, level: number }   // level: 0–100
    ]
  }
];
```

### `src/data/education.js`

```js
export const education = [
  {
    degree: string,
    institution: string,
    year: string,
    cgpa: string,
    description: string,
  }
];

export const certificates = [
  {
    title: string,
    issuer: string,
    date: string,
    credentialUrl: string | null,
  }
];
```

---

## ⚙️ Environment Variables

Copy `.env.example` → `.env` and fill in EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

All `VITE_` prefixed vars are inlined at build time and accessible via `import.meta.env.VITE_*`.

---

## ⚡ Quick Start

```bash
npm install
npm run dev       # -> http://localhost:5173
```

```bash
npm run build     # Production build -> dist/
npm run preview   # Preview built output locally
```

---

## 🎨 Design Conventions

1. **CSS Custom Properties** — Always use `var(--accent-blue)`, `var(--glass-bg)`, etc. Do NOT hardcode hex values.
2. **Framer Motion** — Import `m` (not `motion`) from `"framer-motion"` since `LazyMotion` with `domAnimation` is active.
3. **Icons** — Use `lucide-react`. Custom SVGs are in `src/components/ui/CustomIcons.jsx`.
4. **Page components** — Self-contained; they import their own data and sub-components.
5. **No TypeScript** — All files are `.jsx` / `.js` despite `tsconfig.json` existing (it's for IDE intellisense only).
6. **Glassmorphism pattern**:
   ```css
   background: var(--glass-bg);
   backdrop-filter: blur(12px);
   border: 1px solid var(--glass-bg-light);
   border-radius: 16px;
   ```

---

## 🧩 Key Components — Quick Reference

| Component | File | What it does |
|---|---|---|
| `<Loader>` | `ui/Loader.jsx` | Full-screen intro animation; calls `onComplete` when done |
| `<Navbar>` | `layout/Navbar.jsx` | Top nav with route links & mobile hamburger menu |
| `<Footer>` | `layout/Footer.jsx` | Bottom footer with social links & copyright |
| `<OceanBackground>` | `backgrounds/OceanBackground.jsx` | Animated canvas fixed to viewport (z-index 0) |
| `<CommandPalette>` | `ui/CommandPalette.jsx` | Ctrl+K quick navigation palette |
| `<ScrollReveal>` | `animations/ScrollReveal.jsx` | Fade-in on scroll IntersectionObserver wrapper |
| `<SectionTitle>` | `ui/SectionTitle.jsx` | Styled heading component for page sections |
| `<ProjectCard3D>` | `ui/ProjectCard3D.jsx` | 3D perspective tilt card for projects |
| `<ProjectModal>` | `ui/ProjectModal.jsx` | Full detail overlay for a single project |
| `<InteractiveContactForm>` | `ui/InteractiveContactForm.jsx` | EmailJS-powered contact form |
| `<BackToTop>` | `ui/BackToTop.jsx` | Floating scroll-to-top button |
| `<CountUp>` | `ui/CountUp.jsx` | Animated number increment on scroll into view |
| `<FeaturedProjectSection>` | `sections/FeaturedProjectSection.jsx` | Featured projects displayed on Home page |

---

## 🏗️ Build Configuration

Vite is configured with manual chunk splitting for optimal loading:

| Chunk | Contents |
|---|---|
| `vendor` | React, React DOM, React Router DOM, Scheduler |
| `framer` | Framer Motion |
| `icons` | Lucide React |
| `vendor-other` | All other node_modules |

Source maps are disabled in production. Target is `esnext`.

**Deploy targets:**
- **Vercel** — connect repo, auto-detects Vite, deploys `dist/`
- **Netlify** — build command: `npm run build`, publish dir: `dist`
- **GitHub Pages** — add `vite-plugin-gh-pages` or use GitHub Actions

---

## 📝 Content Update Checklist

When updating content, **only modify files in `src/data/`**:

- [ ] Personal details → `src/data/personalInfo.js`
- [ ] Projects → `src/data/projects.js`
- [ ] Skills → `src/data/skills.js`
- [ ] Education / Certificates → `src/data/education.js`
- [ ] Profile photo → place at `public/profile.jpg`, set `profileImage: "/profile.jpg"` in personalInfo
- [ ] Resume → place at `public/resume.pdf`, set `resumeUrl: "/resume.pdf"` in personalInfo
- [ ] EmailJS → create `.env` with VITE_EMAILJS_* credentials

---

## ⚠️ Known Gotchas

- **Framer Motion**: Always import `m` (not `motion`) since `LazyMotion` is wrapping the app.
- **Tailwind CSS v4** syntax differs from v3 — configuration is via CSS `@theme` directive, NOT a `tailwind.config.js` file.
- The `@/` alias works in Vite and IDEs but NOT in plain Node.js scripts.
- `tsconfig.json` exists for IDE intellisense only — this is a JavaScript project.
- The `utils/` and `lib/` directories are currently empty — add helpers there as needed.
- `OceanBackground` is a canvas animation fixed to the viewport — do not remove or re-position it without understanding the z-index layering.
