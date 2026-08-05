"use client";

export interface ReadingProgress {
  slug: string;
  name: {
    gurmukhi: string;
    en: string;
  };
  verseIndex: number; // 1-indexed verse number or ID
  totalVerses: number;
  versePreview?: string;
  updatedAt: number; // timestamp
}

const STORAGE_KEY = "gurbani_reading_progress_v1";

/**
 * Save current reading progress for a Bani
 */
export function saveReadingProgress(progress: Omit<ReadingProgress, "updatedAt">): void {
  if (typeof window === "undefined") return;

  try {
    const history = getAllReadingHistory();
    const updatedHistory: Record<string, ReadingProgress> = {
      ...history,
      [progress.slug]: {
        ...progress,
        updatedAt: Date.now(),
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to save reading progress:", error);
  }
}

/**
 * Get reading progress for a specific Bani
 */
export function getReadingProgress(slug: string): ReadingProgress | null {
  if (typeof window === "undefined") return null;

  try {
    const history = getAllReadingHistory();
    return history[slug] || null;
  } catch {
    return null;
  }
}

/**
 * Get all reading history, sorted by most recently updated
 */
export function getAllReadingHistory(): Record<string, ReadingProgress> {
  if (typeof window === "undefined") return {};

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/**
 * Get the single most recently read Bani
 */
export function getLastReadBani(): ReadingProgress | null {
  const history = getAllReadingHistory();
  const list = Object.values(history);
  if (list.length === 0) return null;

  // Sort descending by updatedAt
  list.sort((a, b) => b.updatedAt - a.updatedAt);
  return list[0];
}

/**
 * Clear reading history
 */
export function clearReadingHistory(slug?: string): void {
  if (typeof window === "undefined") return;

  try {
    if (slug) {
      const history = getAllReadingHistory();
      delete history[slug];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Failed to clear reading history:", error);
  }
}
