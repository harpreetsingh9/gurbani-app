"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSettings } from "../settings/SettingsProvider";
import { NormalizedBani, NormalizedVerse } from "@/lib/gurbani/types";
import { saveReadingProgress, getReadingProgress } from "@/lib/reading-progress";
import { recordBaniRead } from "@/lib/insights-storage";
import { useSearchParams } from "next/navigation";
import { Check, Sparkles } from "lucide-react";
import { AiExplainDrawer } from "./AiExplainDrawer";

export function BaniReader({ bani }: { bani: NormalizedBani }) {
  const { settings } = useSettings();
  const searchParams = useSearchParams();
  const [currentVerseIndex, setCurrentVerseIndex] = useState<number>(1);
  const [restoredVerse, setRestoredVerse] = useState<number | null>(null);
  const [selectedAiVerse, setSelectedAiVerse] = useState<NormalizedVerse | null>(null);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleOpenAi = (verse: NormalizedVerse) => {
    setSelectedAiVerse(verse);
    setIsAiDrawerOpen(true);
  };

  const applyLarivaar = (text: string) => {
    if (!settings.larivaar) return text;
    // Remove spaces but keep punctuation marks like || (॥)
    return text.replace(/\s+(?=[^॥])/g, "").replace(/ (?=॥)/g, "");
  };

  // Restore scroll position on initial load
  useEffect(() => {
    const verseParam = searchParams.get("verse");
    let targetIndex = verseParam ? parseInt(verseParam, 10) : null;

    if (!targetIndex) {
      const saved = getReadingProgress(bani.slug);
      if (saved && saved.verseIndex > 1) {
        targetIndex = saved.verseIndex;
      }
    }

    if (targetIndex && targetIndex > 0 && targetIndex <= bani.verses.length) {
      setRestoredVerse(targetIndex);
      setCurrentVerseIndex(targetIndex);
      const timer = setTimeout(() => {
        const el = document.getElementById(`verse-${targetIndex}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [bani.slug, bani.verses.length, searchParams]);

  // Track currently visible verse on scroll & update localStorage
  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const indexAttr = entry.target.getAttribute("data-verse-index");
          if (indexAttr) {
            const idx = parseInt(indexAttr, 10);
            setCurrentVerseIndex(idx);

            const verseObj = bani.verses[idx - 1];
            saveReadingProgress({
              slug: bani.slug,
              name: {
                gurmukhi: bani.name.gurmukhi,
                en: bani.name.en,
              },
              verseIndex: idx,
              totalVerses: bani.verses.length,
              versePreview: verseObj?.gurmukhi || "",
            });

            // If user reaches last 3 verses, record completion in insights
            if (idx >= Math.max(1, bani.verses.length - 2)) {
              recordBaniRead(bani.slug, bani.name.gurmukhi, bani.name.en);
            }
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when verse reaches upper-middle section
      threshold: 0.1,
    });

    const verseEls = document.querySelectorAll(".verse-container");
    verseEls.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [bani.slug, bani.name, bani.verses]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 pb-48">
      {/* Restored Position Banner Toast */}
      {restoredVerse && (
        <div className="mb-6 p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between text-xs text-primary font-medium animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <Check size={16} />
            <span>Resumed reading at Line {restoredVerse} of {bani.verses.length}</span>
          </div>
          <button 
            onClick={() => setRestoredVerse(null)}
            className="hover:underline opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header Title */}
      <div className="text-center mb-16 border-b border-black/5 dark:border-white/5 pb-8">
        <h1 
          className="font-gurbani text-foreground mb-3"
          style={{ fontSize: `${settings.fontSize * 3}rem` }}
        >
          {bani.name.gurmukhi}
        </h1>
        <h2 className="text-muted-foreground uppercase tracking-widest text-xs font-bold">{bani.name.en}</h2>
        <p className="text-[11px] text-muted-foreground mt-2">
          Line {currentVerseIndex} of {bani.verses.length} ({Math.round((currentVerseIndex / bani.verses.length) * 100)}%)
        </p>
      </div>

      {/* Verses List */}
      <div className="space-y-12">
        {bani.verses.map((verse: NormalizedVerse, idx: number) => {
          const verseNum = idx + 1;
          const isRestored = restoredVerse === verseNum;
          const displayMeaning = 
            settings.translation === "en" ? verse.meaning.en :
            settings.translation === "hi" ? (verse.meaning.hi || verse.meaning.en) :
            (verse.meaning.pa || verse.meaning.en);

          return (
            <div 
              key={verse.id || idx}
              id={`verse-${verseNum}`}
              data-verse-index={verseNum}
              className={`verse-container text-center flex flex-col items-center gap-3 group p-4 rounded-2xl transition-all duration-500 ${
                isRestored ? "bg-primary/5 ring-1 ring-primary/20" : ""
              }`}
            >
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

              {/* Ask AI Action Button */}
              <button
                onClick={() => handleOpenAi(verse)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 hover:bg-primary/15 text-primary border border-primary/20 text-[11px] font-semibold transition-all mt-2 opacity-90 hover:opacity-100 active:scale-95 shadow-2xs"
                title="Ask AI for 7-part Gurbani insights"
              >
                <Sparkles size={12} />
                <span>Ask AI</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* AI Explanation Drawer Modal */}
      {selectedAiVerse && (
        <AiExplainDrawer
          isOpen={isAiDrawerOpen}
          onClose={() => setIsAiDrawerOpen(false)}
          verseGurmukhi={selectedAiVerse.gurmukhi}
          verseEnglish={selectedAiVerse.meaning.en}
          verseTransliteration={selectedAiVerse.transliteration.en}
          baniName={bani.name.en}
        />
      )}
    </div>
  );
}
