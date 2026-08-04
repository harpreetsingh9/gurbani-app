import React from "react";
import { getBaniList } from "@/lib/gurbani";
import { StreakWidget } from "@/components/home/StreakWidget";
import { DailyLine } from "@/components/home/DailyLine";
import Link from "next/link";
import { Search } from "lucide-react";
import { SettingsBar } from "@/components/settings/SettingsBar";

export const revalidate = 86400;

export default async function Home() {
  const baanis = await getBaniList();

  return (
    <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 pb-32">
      {/* Header */}
      <header className="flex items-center justify-between py-6 mb-8 border-b border-black/5 dark:border-white/5">
        <h1 className="text-2xl font-bold tracking-tight">Nitnem</h1>
        <div className="flex items-center gap-4">
          <StreakWidget />
          <Link href="/search" className="p-2 -mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Search size={20} className="text-muted-foreground" />
          </Link>
        </div>
      </header>

      {/* Daily Line Widget */}
      <DailyLine />

      {/* Baanis List */}
      <section className="mt-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
          Library
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

      {/* Floating Settings Bar */}
      <SettingsBar />
    </main>
  );
}
