"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getLastReadBani, ReadingProgress } from "@/lib/reading-progress";
import { Play, BookOpen, Clock } from "lucide-react";

export function ContinueReadingCard() {
  const [lastRead, setLastRead] = useState<ReadingProgress | null>(null);

  useEffect(() => {
    const item = getLastReadBani();
    setLastRead(item);
  }, []);

  if (!lastRead) return null;

  const percentage = Math.min(
    100,
    Math.max(1, Math.round((lastRead.verseIndex / lastRead.totalVerses) * 100))
  );

  const formatTime = (timestamp: number) => {
    const diffMin = Math.floor((Date.now() - timestamp) / (1000 * 60));
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <section className="mb-8">
      <div className="relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-primary/5 to-background border border-primary/20 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <BookOpen size={14} />
            <span>Continue Reading</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock size={12} />
            <span>{formatTime(lastRead.updatedAt)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-md">
            <h3 className="font-gurbani text-2xl text-foreground">
              {lastRead.name.gurmukhi}
            </h3>
            <p className="text-xs text-muted-foreground font-medium">
              {lastRead.name.en} • Line {lastRead.verseIndex} of {lastRead.totalVerses} ({percentage}%)
            </p>
            {lastRead.versePreview && (
              <p className="font-gurbani text-sm text-foreground/80 line-clamp-1 mt-2">
                "{lastRead.versePreview}"
              </p>
            )}
          </div>

          <Link
            href={`/bani/${lastRead.slug}?verse=${lastRead.verseIndex}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90 transition-all shadow-sm shrink-0 active:scale-95"
          >
            <Play size={14} className="fill-current" />
            <span>Resume Reading</span>
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}
