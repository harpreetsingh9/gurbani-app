import { getBaniBySlug, getBaniList } from "@/lib/gurbani";
import { BaniReader } from "@/components/reader/BaniReader";
import { ReadingHeader } from "@/components/reader/ReadingHeader";
import { SettingsBar } from "@/components/settings/SettingsBar";
import { notFound } from "next/navigation";

export const revalidate = 86400; // revalidate at most once a day

// Generate static routes for all baanis at build time
export async function generateStaticParams() {
  const baanis = await getBaniList();
  return baanis.map((bani) => ({
    slug: bani.slug,
  }));
}

export default async function BaniPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const bani = await getBaniBySlug(resolvedParams.slug);

  if (!bani) {
    notFound();
  }

  return (
    <main className="flex-1 w-full relative">
      {/* Sticky Reading Header with Scroll Progress Line */}
      <ReadingHeader title={bani.name.gurmukhi} />

      {/* Reader */}
      <BaniReader bani={bani} />

      {/* Floating Settings Bar */}
      <SettingsBar />
    </main>
  );
}
