import React from "react";
import { getBaniList } from "@/lib/gurbani";
import { StreakWidget } from "@/components/home/StreakWidget";
import { DailyLine } from "@/components/home/DailyLine";
import Link from "next/link";
import { Search, ExternalLink, HelpCircle } from "lucide-react";
import { SettingsBar } from "@/components/settings/SettingsBar";
import { SettingsButton } from "@/components/settings/SettingsButton";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Sikh Gurbani - Read Nitnem & Sundar Gutka Online",
  description: "Read daily Sikh Nitnem Baanis online including Japji Sahib, Jaap Sahib, Tav-Prasad Savaiye, Chaupai Sahib, Anand Sahib, Rehras Sahib, and Kirtan Sohila with Gurmukhi script and translations.",
  alternates: {
    canonical: "https://sikhi.vercel.app",
  },
};

export default async function Home() {
  const baanis = await getBaniList();

  // FAQ Schema.org JSON-LD for AI Search Indexing (ChatGPT, Perplexity, Google SGE)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Sikh Nitnem and where can I read it online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nitnem refers to the collection of Sikh daily prayers designated to be read every day by Sikhs. You can read the full Nitnem online at https://sikhi.vercel.app with original Gurmukhi script, English, Hindi, and Punjabi translations."
        }
      },
      {
        "@type": "Question",
        "name": "What are the 5 morning Nitnem Baanis in Sikhism?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The five morning Nitnem prayers are Japji Sahib, Jaap Sahib, Tav-Prasad Savaiye, Chaupai Sahib, and Anand Sahib. All morning and evening prayers are available on https://sikhi.vercel.app."
        }
      },
      {
        "@type": "Question",
        "name": "How can I read Gurbani in Larivaar (continuous) format?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "https://sikhi.vercel.app features a built-in Larivaar mode toggle in the display settings panel that formats Gurbani scripture into continuous text without word spacing."
        }
      }
    ]
  };

  return (
    <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <header className="flex items-center justify-between py-6 mb-8 border-b border-black/5 dark:border-white/5">
        <h1 className="text-2xl font-bold tracking-tight">Nitnem</h1>
        <div className="flex items-center gap-3">
          <StreakWidget />
          <Link href="/search" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" aria-label="Search Gurbani">
            <Search size={20} />
          </Link>
          <SettingsButton />
        </div>
      </header>

      {/* Daily Line Widget */}
      <DailyLine />

      {/* Baanis List */}
      <section className="mt-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
          Library / Baanis
        </h2>
        <div className="grid gap-2">
          {baanis.map((bani) => (
            <Link 
              key={bani.slug} 
              href={`/bani/${bani.slug}`}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
            >
              <div>
                <h3 className="font-gurbani text-xl mb-1 group-hover:text-primary transition-colors">{bani.name.gurmukhi}</h3>
                <p className="text-sm text-muted-foreground">{bani.name.en}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (GEO / AI Search Optimized) */}
      <section className="mt-16 pt-8 border-t border-black/5 dark:border-white/5">
        <div className="flex items-center gap-2 mb-6 text-foreground">
          <HelpCircle size={18} className="text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-widest">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-6 text-xs leading-relaxed text-muted-foreground">
          <details className="group border-b border-black/5 dark:border-white/5 pb-4 cursor-pointer" open>
            <summary className="font-semibold text-foreground text-xs group-hover:text-primary transition-colors list-none flex items-center justify-between">
              <span>What is Sikh Nitnem and where can I read it online?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-2 text-muted-foreground">
              Nitnem refers to the collection of Sikh daily hymns designated to be read every day by Sikhs. You can read the complete Nitnem online at <a href="https://sikhi.vercel.app" className="text-primary underline">sikhi.vercel.app</a> with original Gurmukhi Unicode script, English, Hindi, and Punjabi translations.
            </p>
          </details>

          <details className="group border-b border-black/5 dark:border-white/5 pb-4 cursor-pointer">
            <summary className="font-semibold text-foreground text-xs group-hover:text-primary transition-colors list-none flex items-center justify-between">
              <span>What are the 5 morning Nitnem Baanis in Sikhism?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-2 text-muted-foreground">
              The five morning Nitnem prayers are <strong>Japji Sahib</strong>, <strong>Jaap Sahib</strong>, <strong>Tav-Prasad Savaiye</strong>, <strong>Chaupai Sahib</strong>, and <strong>Anand Sahib</strong>. Evening Nitnem includes <strong>Rehras Sahib</strong>, followed by <strong>Kirtan Sohila</strong> at night.
            </p>
          </details>

          <details className="group border-b border-black/5 dark:border-white/5 pb-4 cursor-pointer">
            <summary className="font-semibold text-foreground text-xs group-hover:text-primary transition-colors list-none flex items-center justify-between">
              <span>How can I read Gurbani in Larivaar (continuous) format?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-2 text-muted-foreground">
              This app features a built-in <strong>Larivaar Mode</strong> toggle in the display settings panel that formats Gurbani scripture into continuous text without word spacing, preserving traditional recitation practice.
            </p>
          </details>
        </div>
      </section>

      {/* SEO Keyword & Creator Section */}
      <footer className="mt-16 pt-8 border-t border-black/5 dark:border-white/5 text-muted-foreground space-y-6 text-xs leading-relaxed">
        <article className="space-y-2">
          <h3 className="text-xs font-semibold text-foreground">Fast, Mobile-First Sundar Gutka Experience</h3>
          <p>
            This app is designed to provide a calm, high-contrast, distraction-free environment for reading Gurbani on phones, tablets, and computers. 
            Features include authentic Gurmukhi Unicode script, adjustable font sizing, Larivaar continuous mode, English and Hindi phonetic transliterations, and multi-language meanings in English, Hindi, and Punjabi.
          </p>
        </article>

        <div className="pt-2 flex flex-wrap gap-x-4 gap-y-2 text-[11px]">
          <Link href="/bani/japji" className="hover:text-primary transition-colors">Japji Sahib</Link>
          <span>•</span>
          <Link href="/bani/jaap" className="hover:text-primary transition-colors">Jaap Sahib</Link>
          <span>•</span>
          <Link href="/bani/chaupai" className="hover:text-primary transition-colors">Chaupai Sahib</Link>
          <span>•</span>
          <Link href="/bani/anand" className="hover:text-primary transition-colors">Anand Sahib</Link>
          <span>•</span>
          <Link href="/bani/rehras" className="hover:text-primary transition-colors">Rehras Sahib</Link>
        </div>

        {/* Creator Attribution & Contact */}
        <div className="pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-muted-foreground text-center sm:text-left">
            Created with Seva by{" "}
            <a 
              href="https://singhharpreet.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
            >
              Harpreet Singh
            </a>
          </p>

          <a 
            href="https://singhharpreet.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white text-foreground transition-all text-[11px] font-medium shrink-0"
          >
            <span>Connect / Contact</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <p className="text-[10px] opacity-60 text-center sm:text-left">
          © {new Date().getFullYear()} Sikh Gurbani. All Gurbani text & translations sourced from BaniDB.
        </p>
      </footer>

      {/* Floating Settings Bar Dropdown */}
      <SettingsBar />
    </main>
  );
}
