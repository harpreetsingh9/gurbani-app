import { BaniListItem, BaniResponse, NormalizedBani, NormalizedVerse, Verse } from "./types";
import { normalizeVerse } from "./normalize";
import { cache } from "react";

const API_BASE = "https://api.banidb.com/v2";

/**
 * Common slug aliases mapping to BaniDB tokens or IDs
 */
const ALIAS_MAP: Record<string, string> = {
  "japuji-sahib": "japji",
  "chaupai-sahib": "chaupai",
  "jaap-sahib": "jaap",
  "anand-sahib": "anand",
  "rehras-sahib": "rehras",
};

/**
 * Helper to fetch with retry for resiliency against BaniDB API rate limits or transient errors
 */
async function fetchWithRetry(url: string, init?: RequestInit, retries = 3, delayMs = 400): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, init);
      if (res.ok || res.status === 404) {
        return res;
      }
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * (attempt + 1)));
      } else {
        return res;
      }
    } catch (err) {
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * (attempt + 1)));
      } else {
        throw err;
      }
    }
  }
  return fetch(url, init);
}

/**
 * Fetch raw Bani list from BaniDB API
 * Uses React cache to deduplicate during single render cycle.
 */
const fetchBaniListRaw = cache(async (): Promise<BaniListItem[]> => {
  try {
    const res = await fetchWithRetry(`${API_BASE}/banis`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching raw Bani list:", error);
    return [];
  }
});

/**
 * Get all available baanis (for home page lists, etc.)
 */
export async function getBaniList(): Promise<{ slug: string; name: { gurmukhi: string; en: string; hi: string } }[]> {
  const data = await fetchBaniListRaw();
  return data.map((bani) => ({
    slug: bani.token,
    name: {
      gurmukhi: bani.gurmukhiUni || bani.gurmukhi,
      en: bani.transliterations?.english || bani.transliterations?.en || bani.token,
      hi: bani.transliterations?.hindi || bani.transliterations?.hi || bani.token,
    },
  }));
}

/**
 * Get a specific Bani by its slug (token or numeric ID) and normalize it.
 * Wrapped with React cache to deduplicate requests across generateMetadata and page component.
 */
export const getBaniBySlug = cache(async (slug: string): Promise<NormalizedBani | null> => {
  try {
    const normalizedSlug = slug.toLowerCase();
    const targetToken = ALIAS_MAP[normalizedSlug] || normalizedSlug;

    // Fetch the list of banis to resolve token/slug to numeric ID
    const baniList = await fetchBaniListRaw();
    const matchedBani = baniList.find(
      (b) => b.token.toLowerCase() === targetToken || String(b.ID) === targetToken
    );

    const numericID = matchedBani ? matchedBani.ID : (!isNaN(Number(targetToken)) ? Number(targetToken) : null);

    if (!numericID) {
      console.warn(`Bani not found for slug: ${slug}`);
      return null;
    }

    const res = await fetchWithRetry(`${API_BASE}/banis/${numericID}`, { next: { revalidate: 86400 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch Bani ID ${numericID} (slug: ${slug})`);
    }

    const data: BaniResponse = await res.json();

    if (!data || !data.verses) {
      return null;
    }

    return {
      slug,
      name: {
        gurmukhi: data.baniInfo?.unicode || matchedBani?.gurmukhiUni || data.baniInfo?.gurmukhi || matchedBani?.gurmukhi || "",
        en: data.baniInfo?.english || matchedBani?.transliterations?.english || slug,
        hi: data.baniInfo?.hindi || matchedBani?.transliterations?.hindi || slug,
      },
      verses: data.verses.map(normalizeVerse),
    };
  } catch (error) {
    console.error(`Error in getBaniBySlug(${slug}):`, error);
    return null;
  }
});

/**
 * Get a random line for the daily widget.
 * Source ID 'G' refers to Sri Guru Granth Sahib Ji.
 */
export const getRandomLine = cache(async (): Promise<NormalizedVerse | null> => {
  try {
    const res = await fetchWithRetry(`${API_BASE}/random/G`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch random line");

    const data: { verses: Verse[] } = await res.json();

    if (data.verses && data.verses.length > 0) {
      return normalizeVerse(data.verses[0]);
    }
    return null;
  } catch (error) {
    console.error("Error in getRandomLine:", error);
    return null;
  }
});



