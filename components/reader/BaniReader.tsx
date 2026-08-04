"use client";

import React from "react";
import { useSettings } from "../settings/SettingsProvider";
import { NormalizedBani, NormalizedVerse } from "@/lib/gurbani/types";

export function BaniReader({ bani }: { bani: NormalizedBani }) {
  const { settings } = useSettings();

  const applyLarivaar = (text: string) => {
    if (!settings.larivaar) return text;
    // Remove spaces but keep punctuation marks like || (॥)
    return text.replace(/\s+(?=[^॥])/g, "").replace(/ (?=॥)/g, "");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 pb-48">
      <div className="text-center mb-16 border-b border-black/5 dark:border-white/5 pb-8">
        <h1 
          className="font-gurbani text-foreground mb-3"
          style={{ fontSize: `${settings.fontSize * 3}rem` }}
        >
          {bani.name.gurmukhi}
        </h1>
        <h2 className="text-muted-foreground uppercase tracking-widest text-xs font-bold">{bani.name.en}</h2>
      </div>

      <div className="space-y-12">
        {bani.verses.map((verse: NormalizedVerse) => {
          const displayMeaning = 
            settings.translation === "en" ? verse.meaning.en :
            settings.translation === "hi" ? (verse.meaning.hi || verse.meaning.en) :
            (verse.meaning.pa || verse.meaning.en);

          return (
            <div key={verse.id} className="text-center flex flex-col items-center gap-3 group">
              <p 
                className="font-gurbani leading-relaxed text-foreground transition-all duration-300 group-hover:text-primary"
                style={{ fontSize: `${settings.fontSize * 1.5}rem` }}
              >
                {applyLarivaar(verse.gurmukhi)}
              </p>

              {settings.transliteration !== "off" && (
                <p 
                  className="text-muted-foreground italic"
                  style={{ fontSize: `${settings.fontSize * 1}rem` }}
                >
                  {settings.transliteration === "en" ? verse.transliteration.en : verse.transliteration.hi}
                </p>
              )}

              {settings.translation !== "off" && displayMeaning && (
                <p 
                  className="text-foreground/90 font-medium max-w-xl mt-2"
                  style={{ fontSize: `${settings.fontSize * 0.9}rem` }}
                >
                  {displayMeaning}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
