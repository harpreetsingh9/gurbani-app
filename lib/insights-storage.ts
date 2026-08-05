"use client";

export interface CompletedBaniStat {
  slug: string;
  gurmukhi: string;
  english: string;
  readsCount: number;
}

export interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  targetCount: number;
  currentCount: number;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface InsightsData {
  daysRead: number;
  totalDaysWindow: number; // 21
  consistencyStatus: string;
  favoriteBani: {
    name: string;
    gurmukhi: string;
    revisitDays: number;
  };
  peakReadingTime: string; // e.g. "6 AM - 7 AM"
  mostActiveDay: string; // e.g. "Sunday"
  avgSessionMinutes: number; // e.g. 14
  longestStreakDays: number; // e.g. 37
  completedBanis: CompletedBaniStat[];
  weeklyActivity: { day: string; minutes: number; isToday?: boolean }[];
  milestones: Milestone[];
}

const STORAGE_KEY = "gurbani_insights_data_v1";

const DEFAULT_INSIGHTS: InsightsData = {
  daysRead: 18,
  totalDaysWindow: 21,
  consistencyStatus: "Excellent consistency",
  favoriteBani: {
    name: "Japji Sahib",
    gurmukhi: "ਜਪੁਜੀ ਸਾਹਿਬ",
    revisitDays: 5,
  },
  peakReadingTime: "6 AM - 7 AM",
  mostActiveDay: "Sunday",
  avgSessionMinutes: 14,
  longestStreakDays: 37,
  completedBanis: [
    { slug: "japji", gurmukhi: "ਜਪੁਜੀ ਸਾਹਿਬ", english: "Japji Sahib", readsCount: 41 },
    { slug: "chaupai", gurmukhi: "ਚੌਪਈ ਸਾਹਿਬ", english: "Chaupai Sahib", readsCount: 28 },
    { slug: "anand", gurmukhi: "ਅਨੰਦੁ ਸਾਹਿਬ", english: "Anand Sahib", readsCount: 19 },
    { slug: "rehras", gurmukhi: "ਰਹਰਾਸਿ ਸਾਹਿਬ", english: "Rehras Sahib", readsCount: 15 },
  ],
  weeklyActivity: [
    { day: "Mon", minutes: 12 },
    { day: "Tue", minutes: 16 },
    { day: "Wed", minutes: 14 },
    { day: "Thu", minutes: 20 },
    { day: "Fri", minutes: 10 },
    { day: "Sat", minutes: 18 },
    { day: "Sun", minutes: 25, isToday: true },
  ],
  milestones: [
    {
      id: "japji-50",
      title: "Completed Japji Sahib",
      subtitle: "50 Times",
      targetCount: 50,
      currentCount: 50,
      unlocked: true,
      unlockedAt: Date.now() - 86400000 * 2,
    },
    {
      id: "streak-30",
      title: "30-Day Streak Master",
      subtitle: "Read Nitnem for 30 consecutive days",
      targetCount: 30,
      currentCount: 37,
      unlocked: true,
    },
    {
      id: "nitnem-100",
      title: "Nitnem Devotee",
      subtitle: "Completed 100 Nitnem sessions",
      targetCount: 100,
      currentCount: 103,
      unlocked: true,
    },
  ],
};

/**
 * Get insights data from localStorage or fallback defaults
 */
export function getInsightsData(): InsightsData {
  if (typeof window === "undefined") return DEFAULT_INSIGHTS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_INSIGHTS));
      return DEFAULT_INSIGHTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_INSIGHTS;
  }
}

/**
 * Increment completion count for a specific Bani when user reads it
 */
export function recordBaniRead(slug: string, gurmukhi: string, english: string): void {
  if (typeof window === "undefined") return;

  try {
    const data = getInsightsData();
    const existingIdx = data.completedBanis.findIndex((b) => b.slug === slug);

    if (existingIdx >= 0) {
      data.completedBanis[existingIdx].readsCount += 1;
    } else {
      data.completedBanis.push({
        slug,
        gurmukhi,
        english,
        readsCount: 1,
      });
    }

    // Sort descending by readsCount
    data.completedBanis.sort((a, b) => b.readsCount - a.readsCount);

    // Update favorite bani if top item changes
    if (data.completedBanis[0]) {
      data.favoriteBani.name = data.completedBanis[0].english;
      data.favoriteBani.gurmukhi = data.completedBanis[0].gurmukhi;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to record Bani read in insights:", error);
  }
}
