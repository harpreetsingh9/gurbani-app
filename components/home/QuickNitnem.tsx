"use client";

import React from "react";
import Link from "next/link";
import { Sun, Sunset, Moon, Sparkles, HeartPulse } from "lucide-react";

export function QuickNitnem() {
  const nitnemList = [
    {
      slug: "japji",
      gurmukhi: "ਜਪੁਜੀ ਸਾਹਿਬ",
      english: "Japji Sahib",
      time: "Morning",
      badgeIcon: Sun,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      slug: "jaap",
      gurmukhi: "ਜਾਪੁ ਸਾਹਿਬ",
      english: "Jaap Sahib",
      time: "Morning",
      badgeIcon: Sun,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      slug: "svaiye",
      gurmukhi: "ਤ੍ਵ ਪ੍ਰਸਾਦਿ ਸਵੱਯੇ",
      english: "Tav-Prasad Savaiye",
      time: "Morning",
      badgeIcon: Sun,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      slug: "chaupai",
      gurmukhi: "ਚੌਪਈ ਸਾਹਿਬ",
      english: "Chaupai Sahib",
      time: "Morning",
      badgeIcon: Sun,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      slug: "anand",
      gurmukhi: "ਅਨੰਦੁ ਸਾਹਿਬ",
      english: "Anand Sahib",
      time: "Morning",
      badgeIcon: Sun,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      slug: "rehras",
      gurmukhi: "ਰਹਰਾਸਿ ਸਾਹਿਬ",
      english: "Rehras Sahib",
      time: "Evening",
      badgeIcon: Sunset,
      color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    },
    {
      slug: "sohila",
      gurmukhi: "ਕੀਰਤਨ ਸੋਹਿਲਾ",
      english: "Kirtan Sohila",
      time: "Night",
      badgeIcon: Moon,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      slug: "sukhmani",
      gurmukhi: "ਸੁਖਮਨੀ ਸਾਹਿਬ",
      english: "Sukhmani Sahib",
      time: "Daily",
      badgeIcon: Sparkles,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      slug: "dukhbhanjani",
      gurmukhi: "ਦੁਖ ਭੰਜਨੀ ਸਾਹਿਬ",
      english: "Dukh Bhanjani Sahib",
      time: "Healing",
      badgeIcon: HeartPulse,
      color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <span>Nitnem & Frequent Baanis</span>
        </h2>
        <span className="text-[11px] text-muted-foreground">Daily Recitations</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nitnemList.map((item) => {
          const BadgeIcon = item.badgeIcon;
          return (
            <Link
              key={item.slug}
              href={`/bani/${item.slug}`}
              className="group p-4 rounded-xl border border-black/5 dark:border-white/5 bg-background hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 flex items-center justify-between shadow-xs hover:shadow-sm"
            >
              <div className="space-y-1">
                <h3 className="font-gurbani text-lg group-hover:text-primary transition-colors">
                  {item.gurmukhi}
                </h3>
                <p className="text-xs text-muted-foreground font-medium">
                  {item.english}
                </p>
              </div>

              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold ${item.color}`}
              >
                <BadgeIcon size={12} />
                <span>{item.time}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
