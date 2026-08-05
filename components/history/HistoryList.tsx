"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllReadingHistory, clearReadingHistory, ReadingProgress } from "@/lib/reading-progress";
import { History as HistoryIcon, Play, Trash2, BookOpen, Clock, AlertCircle } from "lucide-react";

export function HistoryList() {
  const [historyList, setHistoryList] = useState<ReadingProgress[]>([]);

  const loadHistory = () => {
    const historyObj = getAllReadingHistory();
    const list = Object.values(historyObj).sort((a, b) => b.updatedAt - a.updatedAt);
    setHistoryList(list);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear your reading history?")) {
      clearReadingHistory();
      setHistoryList([]);
    }
  };

  const handleClearItem = (slug: string) => {
    clearReadingHistory(slug);
    loadHistory();
  };

  const formatTime = (timestamp: number) => {
    const diffMin = Math.floor((Date.now() - timestamp) / (1000 * 60));
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  if (historyList.length === 0) {
    return (
      <div className="text-center py-16 px-4 border border-dashed border-black/10 dark:border-white/10 rounded-2xl bg-black/5 dark:bg-white/5">
        <HistoryIcon size={40} className="mx-auto text-muted-foreground/40 mb-3" />
        <h2 className="text-base font-semibold text-foreground">No Reading History Yet</h2>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1 mb-6">
          Your reading progress and last saved verse positions across all Baanis will automatically appear here.
        </p>
        <Link
          href="/gutka"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs"
        >
          <BookOpen size={16} />
          <span>Explore Sundar Gutka</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-medium">
          Showing {historyList.length} recently read Baanis
        </p>
        <button
          onClick={handleClearAll}
          className="inline-flex items-center gap-1.5 text-xs text-destructive hover:underline font-medium"
        >
          <Trash2 size={14} />
          <span>Clear History</span>
        </button>
      </div>

      <div className="space-y-3">
        {historyList.map((item) => {
          const percentage = Math.min(
            100,
            Math.max(1, Math.round((item.verseIndex / item.totalVerses) * 100))
          );

          return (
            <div
              key={item.slug}
              className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-background hover:bg-black/5 dark:hover:bg-white/5 transition-all space-y-3 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-gurbani text-xl text-foreground group-hover:text-primary transition-colors">
                    {item.name.gurmukhi}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    {item.name.en} • Line {item.verseIndex} of {item.totalVerses} ({percentage}%)
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/bani/${item.slug}?verse=${item.verseIndex}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white font-medium text-xs transition-all"
                  >
                    <Play size={12} className="fill-current" />
                    <span>Resume</span>
                  </Link>

                  <button
                    onClick={() => handleClearItem(item.slug)}
                    className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
                    title="Remove from history"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {item.versePreview && (
                <p className="font-gurbani text-sm text-foreground/80 line-clamp-1 bg-black/5 dark:bg-white/5 p-2.5 rounded-xl">
                  "{item.versePreview}"
                </p>
              )}

              <div className="flex items-center justify-between gap-4 text-[11px] text-muted-foreground pt-1">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{formatTime(item.updatedAt)}</span>
                </div>

                {/* Progress bar */}
                <div className="w-24 bg-black/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
