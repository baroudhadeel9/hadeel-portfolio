# Eng. Hadeel Baroud — Engineering Portfolio 🚀

[![CI Pipeline](https://github.com/baroudhadeel9/hadeel-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/baroudhadeel9/hadeel-portfolio/actions)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x_Strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-FCC72B?logo=vitest)](https://vitest.dev/)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG_2.2_AA-brightgreen)](https://www.w3.org/WAI/standards-guidelines/wcag/)

> **Computer Systems Engineer & AI-Integrated Full-Stack Developer**  
> High-performance web architectures, modern interactive micro-interactions, resilient bilingual localization (Arabic & English), and enterprise-grade security posture.

---

## 🌟 Architectural Overview

This repository houses the personal engineering portfolio of **Eng. Hadeel Emad Baroud**. The project has undergone a complete, 10-phase production-grade engineering overhaul focusing on zero-compromise type safety, strict server-side security, fluid bidirectional (RTL/LTR) internationalization, WCAG 2.2 AA accessibility, optimized Core Web Vitals, and continuous automated testing.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js 16 App Router                           │
│     (Server Component Page, Edge Caching & Partial Prefetching)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│  Typography  │             │   Security   │             │ Testing & CI │
│  & RTL Engine│             │ Architecture │             │              │
├──────────────┤             ├──────────────┤             ├──────────────┤
│ * Almarai    │             │ * Honeypot   │             │ * Vitest     │
│ * Sp.Grotesk │             │ * Rate Limit │             │ * Prettier   │
│ * Inter      │             │ * CSP Report │             │ * ESLint 9   │
│ * JetBrains  │             │ * Secret Iso.│             │ * GitHub CI  │
└──────────────┘             └──────────────┘             └──────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js (App Router)](https://nextjs.org/) | `16.4.6` | Server Components, Turbopack, Image Optimization, Edge Routing |
| **UI Library** | [React](https://react.dev/) | `19.3.0` | Modern hooks, concurrent rendering, dynamic transitions |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.x` | Strict mode, `noUncheckedIndexedAccess`, zero `any` types |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `4.3.3` | Modern CSS engine, zero-runtime tokens, CSS variables |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) | `14.14.0` | Hardware-accelerated transitions & 3D book page flips |
| **Validation** | [Zod](https://zod.dev/) | `4.6.7` | Runtime contract validation for forms, data, and schemas |
| **Testing** | [Vitest](https://vitest.dev/) + [JSDOM](https://github.com/jsdom/jsdom) | `5.1.2` | Fast unit & integration test runner with Node ESM support |
| **Formatting** | [Prettier](https://prettier.io/) | `3.10.1` | Automated single-source-of-truth code formatting |
| **Icons** | [Lucide React](https://lucide.dev/) | `1.73.0` | Accessible SVG iconography |

---

## ✨ Engineering Highlights & Core Features

### 1. Dual-Language & Bidirectional (RTL/LTR) Localization
- Instant locale switching between **Arabic (`ar`)** and **English (`en`)** with zero page reloads.
- Dynamic HTML document synchronization (`dir="rtl"` / `dir="ltr"` and `lang="ar"` / `lang="en"`).
- **Curated Typography System:**
  - **Arabic Headings & Body:** Google Font **Almarai** (`font-almarai`), optimized for technical Arabic readability.
  - **English Headings:** **Space Grotesk** (`font-space-grotesk`), engineering & architectural aesthetic.
  - **English Body:** **Inter** (`font-inter`), crisp multi-screen UI body text.
  - **Code & Tech Badges:** **JetBrains Mono** (`font-jetbrains-mono`).
- **Automated i18n Verification:** Custom verification script (`scripts/verify-i18n.mjs`) ensuring 100% symmetry across 99 keys in `data/locales/ar.json` and `data/locales/en.json`, failing CI if any key is missing or empty.

### 2. 3D Credential Album & Verification Matrix
- Realistic 180° page-turning flip animation for accredited certificates.
- Direct dual-view toggle: Interactive 3D Book vs. Accessible Responsive Grid.
- High-resolution zoom inspection modal with full keyboard trap, backdrop dismiss, and Escape listener.
- Category filtering spanning AI, Systems Architecture, Full-Stack, ICDL, and JavaScript.

### 3. Bento Technical Arsenal & Interactive Inspector
- Spotlight glow tracking cursor movement across technical competencies.
- Deep architectural skill modal detailing real-world enterprise applications for each skill.

### 4. Interactive Project Showcases
- Production case studies (*EduHub*, *Coach Space*, etc.) with problem statements, architecture choices, and live metrics.
- Mobile-responsive typography with overflow protection and line-clamp safety.

### 5. Multi-Layer Security Architecture
- **Server-Side Secret Isolation:** `WEB3FORMS_ACCESS_KEY` is strictly confined to server-side Route Handlers (`src/app/api/contact/route.ts`). Client bundles contain zero secrets.
- **Invisible Honeypot (`botField`):** Submissions with populated hidden bot fields are silently trapped with a `200 OK` response to neutralize spam without triggering bot retry adaptations.
- **Sliding-Window Rate Limiting:** Enforces IP-based sliding window rate limits (5 requests per 15-minute window).
  > **Serverless Architectural Note:** On serverless hosting platforms (such as Vercel or AWS Lambda), in-memory state is maintained per ephemeral execution container. For strict cross-region rate limiting at scale, an external distributed store like Upstash Redis can be attached via `src/lib/rate-limit.ts`.
- **Content Security Policy (CSP):** Configured via HTTP security headers in `next.config.ts`.
- **Safe External Links:** All external anchors implement `rel="noopener noreferrer"`.

### 6. Accessibility (WCAG 2.2 AA Compliance)
- **Skip-to-Content Link:** Instant keyboard navigation bypass (`#main-content`).
- **Focus Rings:** High-visibility `:focus-visible` styling (`outline-emerald-500` with 2px offset).
- **Accessible Modals:** Full `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby` wiring.
- **Keyboard Navigation:** Native Enter/Space triggers on interactive album pages, zoom controls, and cards.
- **Reduced Motion:** Automatic support for `@media (prefers-reduced-motion: reduce)`.

---

## 📁 Repository Structure

```
hadeel-portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated CI (lint, type-check, test, build, i18n)
├── data/
│   ├── locales/
│   │   ├── ar.json              # Arabic translation dictionary (99 keys)
│   │   └── en.json              # English translation dictionary (99 keys)
│   ├── certificates.json        # Verified credentials and accredited hours data
│   ├── profile.json             # Core profile, contact, and bio data
│   ├── projects.json            # Engineered projects & case studies data
│   └── skills.json              # Technical capabilities matrix
├── scripts/
│   └── verify-i18n.mjs          # Translation parity validator script
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts     # Protected contact route handler with rate-limiting
│   │   ├── error.tsx            # Global bilingual error boundary component
│   │   ├── globals.css          # Tailwind CSS v4 directives, font variables & WCAG rings
│   │   ├── layout.tsx           # Root Server Component with JSON-LD Schema.org metadata
│   │   ├── loading.tsx          # Fast initial loading skeleton
│   │   ├── not-found.tsx        # Bilingual 404 handler
│   │   ├── opengraph-image.tsx  # Dynamic OpenGraph & Twitter preview generator
│   │   ├── page.tsx             # Root Server Component page
│   │   ├── robots.ts            # Dynamic robots.txt handler
│   │   └── sitemap.ts           # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── bot/                 # AI Portfolio Assistant components & knowledgebase
│   │   ├── certificates/        # 3D interactive flip-book & certificate grid components
│   │   ├── common/              # ErrorBoundary, skip link, social icons
│   │   ├── contact/             # Contact form with Zod validation & channels card
│   │   ├── hero/                # Hero banner, interactive terminal stats
│   │   ├── home/                # HomeContent client orchestrator
│   │   ├── layout/              # Responsive Navbar & Footer
│   │   ├── projects/            # Interactive project showcases & modals
│   │   ├── providers/           # LocaleProvider (direction, font classes, i18n context)
│   │   └── skills/              # Bento spotlight cards & inspection modal
│   ├── hooks/
│   │   └── useScrollSpy.ts      # Passive viewport spy & scroll progress tracker
│   ├── lib/
│   │   ├── env.ts               # Validated server environment accessor
│   │   ├── rate-limit.ts        # Modular in-memory sliding-window rate limiter
│   │   ├── schemas.ts           # Zod schemas for forms, data contracts, and env
│   │   └── utils.ts             # Tailwind class merging (`cn`) & `toArabicDigits`
│   ├── types/
│   │   ├── certificate.ts       # TypeScript interfaces for certifications
│   │   └── index.ts             # Barrel export for shared types & dictionary interfaces
│   └── __tests__/
│       ├── contact-api.test.ts  # NextRequest route handler integration tests
│       ├── i18n.test.ts         # Translation dictionary symmetry & non-empty tests
│       ├── rate-limit.test.ts   # Rate limiter sliding-window & reset unit tests
│       ├── schemas.test.ts      # Zod schema validation & honeypot tests
│       └── utils.test.ts        # Utility functions (cn, toArabicDigits) unit tests
├── .env.example                 # Template for environment variables
├── .prettierignore              # Prettier ignore rules
├── .prettierrc                  # Prettier formatting standard
├── next.config.ts               # Next.js 16 configuration (headers, CSP, AVIF/WebP)
├── package.json                 # Project dependencies & automated scripts
├── tsconfig.json                # TypeScript strict configuration
└── vitest.config.mts            # Vitest runner configuration with JSDOM
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** `v20.11.0` or later (tested on Node `22` and `24.12.0`)
- **Package Manager:** `npm` (v10+ recommended)

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/baroudhadeel9/hadeel-portfolio.git
cd hadeel-portfolio

# 2. Install dependencies
npm install

# 3. Configure local environment variables
cp .env.example .env.local

# 4. Start local development server with Turbopack
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available NPM Scripts

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm run dev` | `next dev` | Launches local development server with Turbopack |
| `npm run build` | `next build` | Compiles optimized production build |
| `npm run start` | `next start` | Runs compiled production application |
| `npm run type-check` | `tsc --noEmit` | Validates TypeScript strict typing without emitting files |
| `npm run lint` | `eslint` | Runs ESLint 9 checks |
| `npm run test` | `vitest run` | Executes all 28 Vitest unit and integration tests |
| `npm run check-i18n` | `node scripts/verify-i18n.mjs` | Verifies exact translation key symmetry between `ar` and `en` |
| `npm run format` | `prettier --write .` | Formats all files according to project Prettier guidelines |
| `npm run format:check` | `prettier --check .` | Verifies code formatting conformance without modifying files |

---

## 🧪 Testing & Quality Assurance

The project maintains comprehensive test coverage implemented with **Vitest 5** and **JSDOM**:

```bash
npm run test
```

### Test Suites Overview (28 Tests Passed):
- `src/__tests__/schemas.test.ts`: Validates Zod schemas (`ContactFormSchema`, `ProjectSchema`, `CertificateSchema`, `EnvSchema`) with valid inputs, invalid email formats, short messages, and honeypot bot trap detection.
- `src/__tests__/i18n.test.ts`: Asserts complete key symmetry, verified presence of all 7 core application namespaces, and guarantees zero empty string values in both Arabic and English dictionaries.
- `src/__tests__/utils.test.ts`: Tests `toArabicDigits` with integers, percentages, prefixes, suffixes, and mixed strings; tests `cn` for Tailwind class merge resolutions.
- `src/__tests__/rate-limit.test.ts`: Tests window quotas, IP isolation, remaining counts, and manual cache invalidation (`reset`).
- `src/__tests__/contact-api.test.ts`: Integration test for `POST /api/contact` route handler with real `NextRequest` mocks, verifying HTTP 400 validation errors, HTTP 200 silent bot traps, HTTP 429 rate limit triggers, and HTTP 500 secret protection.

---

## 🔒 Security Posture Summary

1. **Zero Secret Leakage:** Strict server-side route handler encapsulation for third-party keys.
2. **Bot Defense:** Invisible Honeypot field traps scrapers and automated bots without false positives.
3. **Abuse Prevention:** IP-based sliding window rate limiter prevents form spam and volumetric abuse.
4. **Header Hardening:**
   - `Content-Security-Policy-Report-Only` (configured for gradual enforcement)
   - `X-Frame-Options: SAMEORIGIN` (clickjacking prevention)
   - `X-Content-Type-Options: nosniff` (MIME sniffing prevention)
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 👩‍💻 Author & Engineering Profile

**Eng. Hadeel Emad Ismail Baroud (م. هديل عماد إسماعيل بارود)**  
*Computer Systems Engineer & Full-Stack Developer*  
*Al-Azhar University, Gaza*

- **GitHub:** [@baroudhadeel9](https://github.com/baroudhadeel9)
- **LinkedIn:** [Hadeel Baroud](https://www.linkedin.com/in/hadeel-baroud-236b28372/)
- **Email:** [baroudhadeel9@gmail.com](mailto:baroudhadeel9@gmail.com)
- **Phone / WhatsApp:** [+972 59-455-8321](https://wa.me/972594558321)

---

## 📄 License

This project is licensed under the MIT License — see the repository for details.
