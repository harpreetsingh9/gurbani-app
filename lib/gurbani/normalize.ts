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

  // Extract English meaning
  const meaningEn = 
    verse.translation?.en?.bdb || 
    verse.translation?.en?.ms || 
    verse.translation?.en?.ssk || 
    (typeof verse.translation?.en === "string" ? verse.translation?.en : null);

  // Extract Punjabi meaning with full unicode/gurmukhi fallbacks across all scholar fields (ss, bdb, ms, ft)
  const meaningPa = 
    verse.translation?.pu?.ss?.unicode || 
    verse.translation?.pu?.ss?.gurmukhi || 
    verse.translation?.pu?.bdb?.unicode || 
    verse.translation?.pu?.bdb?.gurmukhi || 
    verse.translation?.pu?.ms?.unicode || 
    verse.translation?.pu?.ms?.gurmukhi || 
    verse.translation?.pu?.ft?.unicode || 
    (typeof verse.translation?.pu?.ft === "string" ? verse.translation?.pu?.ft : null) || 
    (typeof verse.translation?.pu?.ss === "string" ? verse.translation?.pu?.ss : null) || 
    (typeof verse.translation?.pu === "string" ? verse.translation?.pu : null);

  // Extract Hindi meaning (if available in API) or fallback gracefully to English/Punjabi
  const hiObj = verse.translation?.hi as any;
  const meaningHi = 
    hiObj?.ss || 
    hiObj?.sts || 
    (typeof verse.translation?.hi === "string" ? verse.translation?.hi : null) || 
    meaningEn || 
    meaningPa;

  return {
    id: verse.verseId || Math.random(),
    gurmukhi: gurmukhiText,
    transliteration: {
      en: verse.transliteration?.english || verse.transliteration?.en || "",
      hi: verse.transliteration?.hindi || verse.transliteration?.hi || "",
    },
    meaning: {
      en: meaningEn,
      hi: meaningHi,
      pa: meaningPa || meaningEn,
    },
    pageNo: verse.pageNo,
  };
}
