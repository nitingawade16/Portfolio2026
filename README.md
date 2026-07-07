# Nitin Gawade — Premium Portfolio

A modern, award-worthy personal portfolio built with React + Vite + Tailwind CSS + Framer Motion.

## 🚀 Tech Stack

| Library | Purpose |
|---|---|
| React 19 + Vite 8 | Core framework & build tool |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Smooth animations & page transitions |
| Lenis | Buttery smooth scroll |
| React Router v7 | Client-side routing |
| React Icons | Icon library |
| EmailJS | Contact form emails (no backend needed) |
| React Hot Toast | Toast notifications |

## 📁 Folder Structure

```
src/
├── components/
│   ├── animations/     # Reusable animation wrappers
│   ├── layout/         # Navbar, Footer
│   ├── sections/       # Large section components
│   └── ui/             # Small reusable UI pieces
├── context/            # React context (ThemeContext)
├── data/               # All content data (personalInfo, skills, projects...)
├── hooks/              # Custom React hooks
├── pages/              # Full page components
├── utils/              # Helper utilities
├── App.jsx             # Root component with routing
├── main.jsx            # React entry point
└── index.css           # Global styles + Tailwind
```

## ⚡ Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## ✏️ How to Customize

### 1. Update Personal Info
Edit `src/data/personalInfo.js` — name, email, social links, bio, stats.

### 2. Add Your Projects
Edit `src/data/projects.js` — add real projects with GitHub/demo links.

### 3. Update Skills
Edit `src/data/skills.js` — add/remove skills and adjust levels.

### 4. Add Education & Certificates
Edit `src/data/education.js` — fill in real institute, course, and CGPA.

### 5. Set Up EmailJS (Contact Form)
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create a service and email template
3. Copy `.env.example` → `.env`
4. Fill in your credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
   ```

### 6. Add Profile Photo
- Place your photo at `public/profile.jpg`
- Update `personalInfo.profileImage = "/profile.jpg"` in `personalInfo.js`

### 7. Add Resume PDF
- Place your resume at `public/resume.pdf`
- Update `personalInfo.resumeUrl = "/resume.pdf"` in `personalInfo.js`

## 🎨 Theme Colors

| Variable | Value | Usage |
|---|---|---|
| `--accent-blue` | `#00d4ff` | Primary accent |
| `--accent-purple` | `#8b5cf6` | Secondary accent |
| `--accent-cyan` | `#06b6d4` | Tertiary accent |
| `--bg-primary` | `#050510` | Main background |

Change these in `src/index.css` `:root` block.

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 📦 Deploy

Works great on:
- **Vercel** — `npm run build` → deploy `dist/`
- **Netlify** — connect repo, build command: `npm run build`
- **GitHub Pages** — with `vite-plugin-gh-pages`
