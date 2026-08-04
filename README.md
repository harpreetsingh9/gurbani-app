# Sikh Gurbani Reading App

A fast, mobile-first, PWA-ready Sikh Gurbani reading web app built with **Next.js 16 (App Router), TypeScript, and Tailwind CSS**. Designed with a minimalist black-and-white visual identity inspired by dub.com and cal.com, featuring deep Kesari accents and responsive glassmorphism overlays.

---

## 🌟 Key Features

- **Static Generation & ISR**: Pre-renders 111+ Baanis at build time using `generateStaticParams` and Incremental Static Regeneration (`revalidate: 86400`) for blazing-fast load times.
- **Live BaniDB API Integration**: Connects to the open `https://api.banidb.com/v2` endpoints without hardcoded static datasets.
- **Data Normalization Layer**: Automatically unwraps nested API payloads and selects optimal translation sources (`bdb`, `ms`, `ssk`) and Unicode scripture strings.
- **Gurmukhi Unicode Typography**: Optimized with Google Font `Noto Sans Gurmukhi` for crisp, accurate scripture rendering across all modern mobile and desktop browsers.
- **Floating Glassmorphism Settings Bar**:
  - **Font Size Control**: Smooth scale adjustment (80% to 200%).
  - **Larivaar Mode**: Toggle continuous text without word spacing.
  - **Multilingual Translations**: Switch between English, Hindi, Punjabi, or Off (with automatic fallbacks).
  - **Phonetic Transliterations**: English, Hindi, or Off.
  - **Theme Switcher**: Instant switching between Light mode, Dark mode, and System Auto mode.
- **PWA & Offline Ready**: Service worker setup via `@serwist/next` with offline route pre-caching and PWA web manifest.
- **Daily Streak & Hukamnama**: LocalStorage-backed streak counter with active flame indicators, alongside periodic daily Hukamnama line rotation.

---

## 📁 Project Structure

```
gurbaniapp/
├── app/
│   ├── api/
│   │   └── search/        # Internal route handler proxying BaniDB search
│   ├── bani/
│   │   └── [slug]/        # Statically generated Bani reading page
│   ├── search/            # Search UI shell
│   ├── ang/
│   │   └── [number]/      # Ang-by-Ang reading route stub
│   ├── globals.css        # Tailwind 4 CSS theme variables & dark mode classes
│   ├── layout.tsx         # Root layout with Noto Sans Gurmukhi & SettingsProvider
│   ├── manifest.ts        # PWA web app manifest
│   ├── page.tsx           # Home page with Hukamnama, Streak & Library list
│   └── sw.ts              # Serwist Service Worker implementation
├── components/
│   ├── home/              # DailyLine and StreakWidget components
│   ├── reader/            # BaniReader scripture component
│   └── settings/          # SettingsProvider context & floating SettingsBar UI
├── lib/
│   └── gurbani/
│       ├── index.ts       # Central API fetching and slug-to-ID resolver
│       ├── normalize.ts   # Verse normalization & fallback engine
│       └── types.ts       # Raw BaniDB payload & normalized UI TypeScript types
```

---

## 🚀 Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/harpreetsingh9/gurbani-app.git
cd gurbaniapp
npm install
```

### 2. Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

Build the static routes, pre-cache Bani content, and compile the Service Worker:

```bash
npm run build
npm run start
```

---

## 🛠️ API & Data Access

All Gurbani data access is abstracted behind `lib/gurbani/index.ts`:

- `getBaniList()`: Fetches `/banis` and maps tokens to Unicode names.
- `getBaniBySlug(slug)`: Resolves friendly slugs (e.g. `japuji-sahib` or `japji`) to numeric IDs and fetches `/banis/{ID}`.
- `getRandomLine()`: Periodically fetches `/random/G` for the Daily Hukamnama widget.

---

## 📄 License

This project is open-source. Gurbani text and translations are sourced from the open BaniDB API.
