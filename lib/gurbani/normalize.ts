import { Verse, NormalizedVerse } from "./types";

/**
 * Normalizes a raw BaniDB Verse into a flat, component-friendly NormalizedVerse.
 * Safely unwraps nested `{ verse: { ... } }` payload shapes from /banis/{id}.
 * Uses unicode fields for proper Gurmukhi rendering across modern devices.
 */
export function normalizeVerse(rawVerse: any): NormalizedVerse {
  // Unwrap nested `verse` property if present (BaniDB /banis/{id} API structure)
  const verse: Verse = rawVerse?.verse || rawVerse;

  const gurmukhiText = verse.verse?.unicode || verse.verse?.gurmukhi || "";
  const larivaarText = verse.larivaar?.unicode || verse.larivaar?.gurmukhi || "";

  return {
    id: verse.verseId || Math.random(),
    gurmukhi: gurmukhiText,
    transliteration: {
      en: verse.transliteration?.english || verse.transliteration?.en || "",
      hi: verse.transliteration?.hindi || verse.transliteration?.hi || "",
    },
    meaning: {
      // Fallback chain: bdb > ms > ssk
      en: verse.translation?.en?.bdb || verse.translation?.en?.ms || verse.translation?.en?.ssk || null,
      // Fallback chain: ss > sts
      hi: verse.translation?.hi?.ss || verse.translation?.hi?.sts || null,
      // Fallback chain: ss > ft > bdb > ms
      pa: 
        verse.translation?.pu?.ss?.unicode || 
        verse.translation?.pu?.ss?.gurmukhi || 
        verse.translation?.pu?.ft?.unicode || 
        (typeof verse.translation?.pu?.ft === "string" ? verse.translation?.pu?.ft : null) || 
        null,
    },
    pageNo: verse.pageNo,
  };
}
