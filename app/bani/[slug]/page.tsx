import { getBaniBySlug, getBaniList } from "@/lib/gurbani";
import { BaniReader } from "@/components/reader/BaniReader";
import { ReadingHeader } from "@/components/reader/ReadingHeader";
import { SettingsBar } from "@/components/settings/SettingsBar";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 86400; // revalidate at most once a day

// Generate static routes for all baanis at build time
export async function generateStaticParams() {
  const baanis = await getBaniList();
  return baanis.map((bani) => ({
    slug: bani.slug,
  }));
}

// Generate dynamic SEO metadata for each specific Bani
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const bani = await getBaniBySlug(resolvedParams.slug);

  if (!bani) {
    return {
      title: "Bani Not Found",
    };
  }

  const title = `${bani.name.en} (${bani.name.gurmukhi}) - Read Online with Translation`;
  const description = `Read ${bani.name.en} (${bani.name.gurmukhi}) online in original Gurmukhi script with English, Hindi, and Punjabi translations and transliteration.`;

  return {
    title,
    description,
    keywords: [
      bani.name.en,
      bani.name.gurmukhi,
      bani.name.hi,
      "Gurbani",
      "Nitnem",
      "Read Gurbani Online",
      `${bani.name.en} Translation`,
      `${bani.name.en} Transliteration`,
    ],
    openGraph: {
      title,
      description,
      url: `https://sikhi.vercel.app/bani/${resolvedParams.slug}`,
      siteName: "Sikh Gurbani",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://sikhi.vercel.app/bani/${resolvedParams.slug}`,
    },
  };
}

export default async function BaniPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const bani = await getBaniBySlug(resolvedParams.slug);

  if (!bani) {
    notFound();
  }

  // Schema.org Article / Book JSON-LD for rich Google snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${bani.name.en} - ${bani.name.gurmukhi}`,
    "name": bani.name.en,
    "alternateName": bani.name.gurmukhi,
    "inLanguage": ["pa", "en", "hi"],
    "about": "Sikh Gurbani Scripture",
    "author": {
      "@type": "Organization",
      "name": "Sikh Gurbani App"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sikh Gurbani App"
    },
    "description": `Read ${bani.name.en} (${bani.name.gurmukhi}) with Gurmukhi script and multilingual translations.`,
    "mainEntityOfPage": `https://sikhi.vercel.app/bani/${resolvedParams.slug}`
  };

  return (
    <main className="flex-1 w-full relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sticky Reading Header with Scroll Progress Line & Settings Button */}
      <ReadingHeader title={bani.name.gurmukhi} />

      {/* Reader */}
      <BaniReader bani={bani} />

      {/* Floating Settings Bar Dropdown */}
      <SettingsBar />
    </main>
  );
}
