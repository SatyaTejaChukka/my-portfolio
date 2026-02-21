# 🌐 Satya Teja — Personal Portfolio

A premium, fully responsive developer portfolio built with **React + Vite**, featuring glassmorphism design, Framer Motion animations, an interactive spotlight card system, a custom glowing cursor, PWA support, and full dark/light theme switching.

🔗 **Live**: [satyatejachukka.github.io/my-portfolio](https://satyatejachukka.github.io/my-portfolio/)

---

## ✨ Features

### 🎨 UI & Design

- **Glassmorphism** — frosted-glass panels with backdrop blur throughout
- **Dark / Light Theme** — three-state toggle (Dark → Light → System), persisted to `localStorage`
- **Animated Gradient Logo** — cycling gradient on the brand name
- **Three-column Navbar** — logo (left), nav-links pill (centered), resume button (right) — uniformly distributed across the full width at all viewport sizes
- **Responsive Layout** — fully adaptive from mobile to widescreen; a hamburger menu replaces the desktop nav on small screens

### 🖱️ Custom Glowing Cursor

- Small glowing **precision dot** (instant tracking via tight Framer Motion spring)
- Larger **trailing ring** that lags behind for an elegant, premium feel
- Ring **scales up** and brightens when hovering interactive elements (links, buttons)
- Automatically hidden on touch / mobile devices (`pointer: coarse`)

### ✨ Spotlight Cards

- **Mouse-tracking radial gradient glow** that follows the cursor within each card
- Applied to all **Project cards** (cyan glow) and **Experience / Timeline cards** (purple glow)
- Reusable `<SpotlightCard>` wrapper component — drop-in for any card in the project
- Glow fades in/out smoothly on enter/leave

### 🗂️ Sections

| Section        | Highlights                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Hero**       | Animated letter-by-letter title, floating glow balls, availability badge                                                         |
| **About**      | Skills grid, animated bio                                                                                                        |
| **Projects**   | Category filters (All / Web / AI), filterable grid, **Case Study modal** with gallery, tech stack, role, problem/solution/impact |
| **Experience** | Alternating parallax timeline, scroll-linked animated glow line, animated entrance variants                                      |
| **Contact**    | EmailJS-powered form, social links, resume download                                                                              |

### ⚡ Performance & DX

- **Vite** build tool — sub-second HMR in dev
- **Code-splitting** via `React.lazy` + `Suspense` — non-critical sections load on demand
- **Lazy image loading** with `IntersectionObserver` (`LazyImage` component) and emoji fallbacks
- **PWA / Service Worker** — offline-capable via `registerSW`
- **Section progress indicator** — fixed right-side dot tracker showing scroll position across sections
- **Scroll-to-top button** with animated progress ring
- **Error boundaries** — per-section `SectionErrorBoundary` prevents full-page crashes
- **Accessible** — `aria-current`, `aria-label`, `role`, `tabIndex`, skip-link, `focus-visible` outlines

---

## 🛠️ Tech Stack

| Layer      | Technology                             |
| ---------- | -------------------------------------- |
| Framework  | React 18                               |
| Build      | Vite                                   |
| Animations | Framer Motion                          |
| Icons      | Lucide React                           |
| Email      | EmailJS                                |
| CSS        | Vanilla CSS + Tailwind utility classes |
| Deployment | GitHub Pages                           |

---

## 📦 Getting Started

```bash
# 1. Clone
git clone https://github.com/SatyaTejaChukka/my-portfolio.git
cd my-portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Contact Form Setup — Google Apps Script

The contact form is powered by a free **Google Apps Script Web App** — no third-party service, no API keys, no `.env` file required.

**How it works (overview):**

1. A Google Apps Script Web App URL is hardcoded in `src/components/Contact.jsx`
2. On form submit, the data is POSTed to that URL (using `fetch` with `mode: "no-cors"`)
3. The script receives the data, logs it to a **Google Sheet**, and sends you an **email notification**

**To set up your own backend**, replace the `GOOGLE_SCRIPT_URL` constant in `Contact.jsx` with your own Web App URL.

📖 **Full step-by-step guide**: [google_apps_script_instructions.md](./google_apps_script_instructions.md)

---

## 🚀 Deployment

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 📁 Project Structure

```
my-portfolio/
├── public/
│   └── Satya_Teja_Latest_Resume.pdf
├── src/
│   ├── components/
│   │   ├── About.jsx           # Skills & bio section
│   │   ├── Contact.jsx         # EmailJS contact form
│   │   ├── Cursor.jsx          # 🆕 Custom glowing cursor (dot + ring)
│   │   ├── ErrorBoundary.jsx   # Global & per-section error boundaries
│   │   ├── Experience.jsx      # Parallax alternating timeline
│   │   ├── Footer.jsx          # Footer with social links
│   │   ├── Hero.jsx            # Landing hero section
│   │   ├── LazyImage.jsx       # IntersectionObserver lazy loader
│   │   ├── Navbar.jsx          # 3-column responsive navbar + theme toggle
│   │   ├── Projects.jsx        # Filterable grid + case study modal
│   │   ├── ScrollToTop.jsx     # Scroll-to-top button with progress ring
│   │   ├── SectionProgress.jsx # Fixed right-side section dot navigator
│   │   └── SpotlightCard.jsx   # 🆕 Mouse-tracking spotlight glow wrapper
│   ├── utils/
│   │   └── registerSW.js       # PWA service worker registration
│   ├── App.jsx                 # Root layout, lazy imports, Cursor mount
│   ├── App.css                 # Component-level styles
│   ├── index.css               # Global design system & all component CSS
│   └── main.jsx                # Vite entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 📬 Contact

**Satya Teja Chukka**

- GitHub: [@SatyaTejaChukka](https://github.com/SatyaTejaChukka)
- Portfolio: [satyatejachukka.github.io/my-portfolio](https://satyatejachukka.github.io/my-portfolio/)
