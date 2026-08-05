"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, BookOpen, ChevronRight } from "lucide-react";

interface BaniItem {
  slug: string;
  name: {
    gurmukhi: string;
    en: string;
    hi: string;
  };
}

export function GutkaList({ baanis }: { baanis: BaniItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "nitnem" | "vaars">("all");

  const nitnemSlugs = ["japji", "jaap", "svaiye", "chaupai", "anand", "rehras", "sohila", "sukhmani", "dukhbhanjani", "ardas", "aarti"];

  const filteredBaanis = baanis.filter((b) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      b.slug.toLowerCase().includes(q) ||
      b.name.en.toLowerCase().includes(q) ||
      b.name.gurmukhi.includes(q) ||
      b.name.hi.includes(q);

    if (!matchesSearch) return false;

    if (activeTab === "nitnem") {
      return nitnemSlugs.includes(b.slug.toLowerCase());
    }
    if (activeTab === "vaars") {
      return b.slug.toLowerCase().includes("vaar") || b.name.en.toLowerCase().includes("vaar");
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search in Sundar Gutka (e.g. Japji, Sukhmani, Vaar)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "all"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-black/5 dark:bg-white/5 text-muted-foreground hover:text-foreground"
            }`}
          >
            All Baanis ({baanis.length})
          </button>
          <button
            onClick={() => setActiveTab("nitnem")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "nitnem"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-black/5 dark:bg-white/5 text-muted-foreground hover:text-foreground"
            }`}
          >
            Nitnem & Daily
          </button>
          <button
            onClick={() => setActiveTab("vaars")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "vaars"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-black/5 dark:bg-white/5 text-muted-foreground hover:text-foreground"
            }`}
          >
            Vaars & Composition
          </button>
        </div>
      </div>

      {/* Baanis List Grid */}
      <div className="grid gap-2 sm:grid-cols-2">
        {filteredBaanis.map((bani) => (
          <Link
            key={bani.slug}
            href={`/bani/${bani.slug}`}
            className="flex items-center justify-between p-4 rounded-xl border border-black/5 dark:border-white/5 bg-background hover:bg-black/5 dark:hover:bg-white/5 transition-all group"
          >
            <div className="space-y-0.5">
              <h3 className="font-gurbani text-lg group-hover:text-primary transition-colors">
                {bani.name.gurmukhi}
              </h3>
              <p className="text-xs text-muted-foreground font-medium">
                {bani.name.en}
              </p>
            </div>
            <ChevronRight size={18} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}

        {filteredBaanis.length === 0 && (
          <div className="col-span-full text-center py-12 border border-dashed border-black/10 dark:border-white/10 rounded-2xl">
            <BookOpen size={32} className="mx-auto text-muted-foreground/40 mb-2" />
            <p className="text-sm font-semibold text-muted-foreground">No Baanis found</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Try searching with a different keyword</p>
          </div>
        )}
      </div>
    </div>
  );
}
