"use client";

import React, { useEffect, useState } from "react";
import { getInsightsData, InsightsData } from "@/lib/insights-storage";
import Link from "next/link";
import {
  Sparkles,
  Calendar,
  Heart,
  Clock,
  Flame,
  CheckCircle2,
  Trophy,
  Award,
  BarChart2,
  TrendingUp,
  Sun,
  ChevronRight,
} from "lucide-react";

export function InsightsDashboard() {
  const [data, setData] = useState<InsightsData | null>(null);

  useEffect(() => {
    setData(getInsightsData());
  }, []);

  if (!data) return null;

  // Max minutes for weekly chart scaling
  const maxWeeklyMin = Math.max(...data.weeklyActivity.map((w) => w.minutes), 1);

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <section className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-amber-500/15 via-primary/10 to-background border border-primary/20 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          <Sparkles size={16} />
          <span>Personal Analytics</span>
        </div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          Your Reading Journey
        </h1>
        <p className="text-xs text-muted-foreground mt-1 max-w-md">
          Track your daily Nitnem consistency, habits, favorite scripture, and milestone celebrations.
        </p>
      </section>

      {/* Grid Row 1: Reading Consistency & Favorite Banis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Reading Consistency */}
        <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-background space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Calendar size={16} className="text-primary" />
              <span>Reading Consistency</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
              {data.consistencyStatus}
            </span>
          </div>

          <div>
            <p className="text-2xl font-black text-foreground">
              {data.daysRead} out of last {data.totalDaysWindow} days
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              You have read Gurbani on {Math.round((data.daysRead / data.totalDaysWindow) * 100)}% of recent days.
            </p>
          </div>

          {/* 21 Days Visual Dot Heatmap */}
          <div className="pt-2">
            <div className="flex items-center justify-between gap-1">
              {Array.from({ length: data.totalDaysWindow }).map((_, i) => {
                const isRead = i < data.daysRead;
                return (
                  <div
                    key={i}
                    title={`Day ${i + 1}: ${isRead ? "Read" : "Missed"}`}
                    className={`h-6 flex-1 rounded-md transition-all ${
                      isRead
                        ? "bg-emerald-500 shadow-xs scale-105"
                        : "bg-black/5 dark:bg-white/10 opacity-50"
                    }`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1.5">
              <span>21 Days Ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>

        {/* Card 2: Favorite Banis */}
        <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-background space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Heart size={16} className="text-rose-500" />
            <span>Favorite Banis</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground">
              You revisit <span className="text-primary">{data.favoriteBani.name}</span> often.
            </h3>
            <p className="font-gurbani text-lg text-muted-foreground">
              {data.favoriteBani.gurmukhi}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/15 flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Average revisit:</span>
            <span className="text-xs font-bold text-primary">every {data.favoriteBani.revisitDays} days</span>
          </div>
        </div>
      </div>

      {/* Grid Row 2: Reading Habits & Session Streaks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 3: Reading Habits */}
        <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-background space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Sun size={16} className="text-amber-500" />
            <span>Reading Habits</span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Peak Reading Hours:</p>
              <p className="text-lg font-bold text-foreground mt-0.5">
                You usually read between <span className="text-amber-500">{data.peakReadingTime}</span>
              </p>
            </div>

            <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Most active day:</span>
              <span className="text-xs font-bold text-foreground">{data.mostActiveDay}</span>
            </div>
          </div>
        </div>

        {/* Card 4: Average Session & Streaks */}
        <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-background space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Clock size={16} className="text-indigo-500" />
            <span>Session & Streaks</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/15 text-center space-y-1">
              <p className="text-[11px] text-muted-foreground font-medium">Average Session</p>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {data.avgSessionMinutes} <span className="text-xs font-normal">min</span>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-orange-500/5 border border-orange-500/15 text-center space-y-1">
              <p className="text-[11px] text-muted-foreground font-medium">Longest Streak</p>
              <p className="text-2xl font-black text-orange-500 flex items-center justify-center gap-1">
                <Flame size={20} className="fill-current" />
                <span>{data.longestStreakDays}</span>
                <span className="text-xs font-normal">days</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Row 3: Most Completed Banis & Weekly Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 5: Most Completed Banis */}
        <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-background space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Most Completed Banis</span>
            </div>
            <Link href="/gutka" className="text-xs text-primary hover:underline font-medium">
              View All
            </Link>
          </div>

          <div className="space-y-2.5">
            {data.completedBanis.map((bani, idx) => (
              <Link
                key={bani.slug}
                href={`/bani/${bani.slug}`}
                className="p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-gurbani text-base group-hover:text-primary transition-colors">
                      {bani.gurmukhi}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">{bani.english}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <CheckCircle2 size={14} />
                  <span>{bani.readsCount} Reads</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Card 6: Weekly Insights Chart */}
        <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-background space-y-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <BarChart2 size={16} className="text-primary" />
              <span>Weekly Insights</span>
            </div>
            <span className="text-[11px] text-muted-foreground">This Week</span>
          </div>

          <div className="pt-4 flex items-end justify-between gap-2 h-36">
            {data.weeklyActivity.map((w) => {
              const heightPercent = Math.round((w.minutes / maxWeeklyMin) * 100);
              return (
                <div key={w.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] text-muted-foreground font-semibold">
                    {w.minutes}m
                  </span>
                  <div
                    style={{ height: `${Math.max(heightPercent, 12)}%` }}
                    className={`w-full max-w-[28px] rounded-lg transition-all ${
                      w.isToday
                        ? "bg-primary shadow-sm"
                        : "bg-primary/20 hover:bg-primary/40"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      w.isToday ? "text-primary font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {w.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card 7: Milestone Celebration Banner ("Congratulations!") */}
      <section className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-primary/10 border border-amber-500/30 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500 text-white shadow-md shrink-0">
              <Trophy size={28} />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <Award size={14} />
                <span>Milestone Achieved</span>
              </div>
              <h3 className="text-xl font-extrabold text-foreground">
                Completed Japji Sahib <span className="text-amber-600 dark:text-amber-400">50 Times</span>
              </h3>
              <p className="text-xs text-muted-foreground font-medium">
                Congratulations! You have reached a remarkable milestone in your spiritual Nitnem journey.
              </p>
            </div>
          </div>

          <div className="px-5 py-2.5 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-sm self-start sm:self-center shrink-0">
            🎉 Congratulations!
          </div>
        </div>
      </section>
    </div>
  );
}
