import { getBaniBySlug, getBaniList } from "@/lib/gurbani";
import { BaniReader } from "@/components/reader/BaniReader";
import { SettingsBar } from "@/components/settings/SettingsBar";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

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
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center">
          <Link 
            href="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors py-2 -ml-2"
          >
            <ChevronLeft size={20} />
            <span className="font-medium text-sm">Library</span>
          </Link>
        </div>
      </header>

      {/* Reader */}
      <BaniReader bani={bani} />

      {/* Floating Settings Bar */}
      <SettingsBar />
    </main>
  );
}
