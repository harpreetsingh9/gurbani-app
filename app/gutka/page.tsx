import React from "react";
import { getBaniList } from "@/lib/gurbani";
import { GutkaList } from "@/components/gutka/GutkaList";
import { SettingsButton } from "@/components/settings/SettingsButton";
import { SettingsBar } from "@/components/settings/SettingsBar";
import { BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Sundar Gutka - Complete Gurbani Library",
  description: "Browse the complete Sikh Sundar Gutka library online. Read all 113+ daily Nitnem prayers, Vaars, and compositions in Gurmukhi with multilingual translations.",
  alternates: {
    canonical: "https://sikhi.vercel.app/gutka",
  },
};

export default async function GutkaPage() {
  const baanis = await getBaniList();

  return (
    <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 pb-32">
      {/* Top Header */}
      <header className="flex items-center justify-between py-6 mb-6 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Sundar Gutka</h1>
            <p className="text-xs text-muted-foreground">Complete Scripture Library ({baanis.length} Baanis)</p>
          </div>
        </div>
        <SettingsButton />
      </header>

      {/* Baanis Search & List */}
      <GutkaList baanis={baanis} />

      {/* Floating Settings Bar Dropdown */}
      <SettingsBar />
    </main>
  );
}
