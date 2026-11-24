# Hadeel Baroud — Engineering Portfolio 🚀

> **Full-Stack Systems Engineer & AI Solutions Architect**  
> High-performance web architectures, modern interactive UI, and enterprise-grade platforms.

---

## 🌟 Overview

A modern, minimalist portfolio engineered with an Apple/Stripe aesthetic. Designed to highlight high-impact software engineering projects, verified academic & industry credentials, and technical skills with fluid micro-interactions and dual-language localization (Arabic & English).

## 🛠️ Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
* **Library:** [React 19](https://react.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Validation:** [Zod](https://zod.dev/)

---

## ✨ Key Features

* 🌐 **Full Bilingual Support:** Instant toggle between English (`en`) and Arabic (`ar`) with dynamic font swapping (Cairo & Plus Jakarta Sans) and directional layout (`rtl` / `ltr`).
* 📖 **3D Interactive Credential Album:** Realistic 180° page-folding flip animation with verified credentials and high-resolution inspection modals.
* ⚡ **Live Production Showcases:** Direct interactive preview frames for real-world platforms including *Coach Space* and *EduHub*.
* 🧠 **Interactive Bento Skills Matrix:** Categorized technical competencies with custom cursor spotlights and deep inspection sheets.
* 🤖 **AI Portfolio Assistant:** Client-side assistant bot with knowledge of projects, architecture, and background.
* 📬 **Direct Contact & Dispatch:** Integrated messaging pipeline with instant WhatsApp and direct inbox routing.

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18.x or later
* npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/baroudhadeel9/hadeel-portfolio.git

# Navigate to project directory
cd hadeel-portfolio

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment & Security Architecture

Create a `.env.local` file based on `.env.example`:

```env
# Server-side Web3Forms API Key (Do NOT prefix with NEXT_PUBLIC_)
WEB3FORMS_ACCESS_KEY=your_key_here
```

#### Security Controls:
1. **Server-Side API Key Isolation:** `WEB3FORMS_ACCESS_KEY` is strictly accessed within the Next.js API route (`src/app/api/contact/route.ts`). No client bundle ever exposes the access key.
2. **Invisible Honeypot (`botField`):** Submissions with populated hidden fields are silently accepted with a 200 response to prevent bot adaptation while blocking spam delivery.
3. **In-Memory Rate Limiting (Serverless Caveat):** The contact route enforces IP-based rate limiting (5 requests per 15-minute window). **Note on Serverless:** On serverless hosting platforms (such as Vercel or AWS Lambda), in-memory state is maintained per ephemeral execution container. Thus, rate limiting is best-effort. If globally strict cross-region rate limiting is required, an external distributed store like Upstash Redis can be attached.
4. **Content Security Policy (CSP):** Delivered with security headers in `next.config.ts`. Initial rollout uses `Content-Security-Policy-Report-Only` to observe violations before enforcement.
5. **Safe External Navigation:** All external hyperlinks specify `rel="noopener noreferrer"`.

### Production Build

```bash
npm run type-check
npm run lint
npm run build
npm run start
```

---

## 👩‍💻 Author

**Hadeel Baroud (هديل بارود)**  
* Systems & Software Engineer · Al-Azhar University
* GitHub: [@baroudhadeel9](https://github.com/baroudhadeel9)
* Email: [baroudhadeel9@gmail.com](mailto:baroudhadeel9@gmail.com)
