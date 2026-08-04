// Raw API Types

export interface VerseTranslation {
  en?: { bdb?: string; ms?: string; ssk?: string };
  pu?: { ss?: { gurmukhi: string | null; unicode: string | null }; ft?: any; bdb?: any; ms?: any };
  es?: { sn?: string | null };
  hi?: { ss?: string; sts?: string };
}

export interface VerseTransliteration {
  english: string;
  hindi: string;
  en: string;
  hi: string;
  ipa: string;
  ur: string;
}

export interface Verse {
  verseId: number;
  shabadId?: number;
  verse: { gurmukhi: string; unicode: string };
  larivaar: { gurmukhi: string; unicode: string };
  translation: VerseTranslation;
  transliteration: VerseTransliteration;
  pageNo: number | null;
  lineNo: number | null;
  updated: string;
  visraam?: { sttm?: any[]; igurbani?: any[]; sttm2?: any[] };
}

export interface ShabadInfo {
  shabadId: number;
  shabadName: number;
  pageNo: number;
  source: { sourceId: string; gurmukhi: string; unicode: string; english: string; pageNo: number };
  raag: { raagId: number; gurmukhi: string; unicode: string; english: string; raagWithPage: string };
  writer: { writerId: number; gurmukhi: string | null; unicode: string | null; english: string };
}

export interface ShabadResponse {
  shabadInfo: ShabadInfo;
  count: number;
  navigation: { previous: number | null; next: number | null };
  verses: Verse[];
}

export interface BaniListItem {
  ID: number;
  token: string;
  gurmukhi: string;
  gurmukhiUni: string;
  transliteration: string;
  transliterations: { english: string; hindi: string; en: string; hi: string; ipa: string; ur: string };
  updated: string;
}

export interface BaniResponse {
  baniInfo: {
    baniId: number;
    gurmukhi: string;
    unicode: string;
    english: string;
    hindi: string;
    en: string;
    hi: string;
    ipa: string;
    ur: string;
    source: { sourceId: string; gurmukhi: string; unicode: string; english: string; pageNo: number };
    raag: { raagId: number; gurmukhi: string; unicode: string; english: string; raagWithPage: string };
    writer: { writerId: number; gurmukhi: string; unicode: string; english: string };
  };
  verses: Verse[];
}

// UI Normalized Types

export interface NormalizedVerse {
  id: number;
  gurmukhi: string;
  transliteration: { en: string; hi: string };
  meaning: { en: string | null; hi: string | null; pa: string | null };
  pageNo: number | null;
}

export interface NormalizedBani {
  slug: string;
  name: { gurmukhi: string; en: string; hi: string };
  verses: NormalizedVerse[];
}

