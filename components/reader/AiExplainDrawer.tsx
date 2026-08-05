"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  X,
  Copy,
  Check,
  BookOpen,
  History,
  Compass,
  Lightbulb,
  FileText,
  HeartHandshake,
  RotateCw,
  Globe,
} from "lucide-react";
import { AiExplanationResult } from "@/app/api/ai-explain/route";

interface AiExplainDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  verseGurmukhi: string;
  verseEnglish?: string | null;
  verseTransliteration?: string | null;
  baniName?: string | null;
}

export function AiExplainDrawer({
  isOpen,
  onClose,
  verseGurmukhi,
  verseEnglish,
  verseTransliteration,
  baniName,
}: AiExplainDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AiExplanationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"punjabi" | "english" | "all">("all");

  useEffect(() => {
    if (isOpen && verseGurmukhi) {
      fetchExplanation();
    } else {
      setData(null);
      setError(null);
    }
  }, [isOpen, verseGurmukhi]);

  const fetchExplanation = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verseGurmukhi,
          verseEnglish,
          verseTransliteration,
          baniName,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI insights");
      }

      const result: AiExplanationResult = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Unable to generate AI insights right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAll = () => {
    if (!data) return;
    const textToCopy = `Gurbani Line: ${verseGurmukhi}\n\n` +
      `🇵🇦 Punjabi: ${data.punjabi}\n\n` +
      `🇬🇧 English: ${data.english}\n\n` +
      `🏛️ History: ${data.history}\n\n` +
      `🧘 Philosophy: ${data.philosophy}\n\n` +
      `💡 Key Teaching: ${data.teaching}\n\n` +
      `🌱 Daily Life Example: ${data.dailyLife}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-background rounded-t-3xl sm:rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl max-h-[85vh] sm:max-h-[80vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-2 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-black/5 dark:border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <span>Gurbani AI Insights</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Gemini AI
                </span>
              </h2>
              <p className="text-xs text-muted-foreground">Deep 7-part spiritual analysis & wisdom</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {data && (
              <button
                onClick={handleCopyAll}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs font-medium flex items-center gap-1.5"
                title="Copy all insights"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Close Drawer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Selected Verse Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-500/10 via-primary/5 to-background border-b border-black/5 dark:border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
            Selected Verse • {baniName || "Gurbani Scripture"}
          </p>
          <h3 className="font-gurbani text-xl sm:text-2xl text-foreground leading-relaxed">
            {verseGurmukhi}
          </h3>
          {verseTransliteration && (
            <p className="text-xs text-muted-foreground italic mt-1">{verseTransliteration}</p>
          )}
          {verseEnglish && (
            <p className="text-xs font-medium text-foreground/80 mt-1">"{verseEnglish}"</p>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {loading && (
            <div className="space-y-4 py-8">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-primary animate-pulse">
                <RotateCw size={16} className="animate-spin" />
                <span>Generating 7-part Gurbani AI Insights...</span>
              </div>
              <div className="space-y-3">
                <div className="h-16 bg-black/5 dark:bg-white/5 rounded-2xl animate-pulse" />
                <div className="h-16 bg-black/5 dark:bg-white/5 rounded-2xl animate-pulse" />
                <div className="h-16 bg-black/5 dark:bg-white/5 rounded-2xl animate-pulse" />
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-8 space-y-3">
              <p className="text-xs text-destructive font-medium">{error}</p>
              <button
                onClick={fetchExplanation}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all"
              >
                <RotateCw size={14} />
                <span>Retry Connection</span>
              </button>
            </div>
          )}

          {data && !loading && (
            <div className="space-y-4">
              {/* Section 1: Simple Punjabi Explanation */}
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  <Globe size={14} />
                  <span>1. Simple Punjabi Explanation (ਸਰਲ ਪੰਜਾਬੀ ਵਿਆਖਿਆ)</span>
                </div>
                <p className="font-gurbani text-base leading-relaxed text-foreground">
                  {data.punjabi}
                </p>
              </div>

              {/* Section 2: Simple English Explanation */}
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/15 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                  <BookOpen size={14} />
                  <span>2. Simple English Explanation</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {data.english}
                </p>
              </div>

              {/* Section 3: Historical Context */}
              <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <History size={14} className="text-primary" />
                  <span>3. Historical Context (ਇਤਿਹਾਸਕ ਪਿਛੋਕੜ)</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {data.history}
                </p>
              </div>

              {/* Section 4: Sikh Philosophy */}
              <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/15 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  <Compass size={14} />
                  <span>4. Sikh Philosophy (ਸਿੱਖ ਫਲਸਫਾ)</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {data.philosophy}
                </p>
              </div>

              {/* Section 5: Key Teaching */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  <Lightbulb size={14} />
                  <span>5. Key Teaching (ਮੁੱਖ ਉਪਦੇਸ਼)</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                  {data.teaching}
                </p>
              </div>

              {/* Section 6: Related Gurbani References */}
              {data.references && data.references.length > 0 && (
                <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/15 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                    <FileText size={14} />
                    <span>6. Related Gurbani References (ਸੰਬੰਧਿਤ ਤੁਕਾਂ)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs font-gurbani text-foreground">
                    {data.references.map((ref, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{ref}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Section 7: Daily Life Example */}
              <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  <HeartHandshake size={14} />
                  <span>7. Daily Life Example (ਰੋਜ਼ਾਨਾ ਜ਼ਿੰਦਗੀ ਵਿੱਚ ਵਰਤੋਂ)</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {data.dailyLife}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
