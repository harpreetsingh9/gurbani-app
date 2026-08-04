"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type LanguageSettings = {
  transliteration: "en" | "hi" | "off";
  translation: "en" | "hi" | "pa" | "off";
  fontSize: number; // e.g. 1 (normal), 1.25, 1.5, etc.
  larivaar: boolean;
};

const defaultSettings: LanguageSettings = {
  transliteration: "en",
  translation: "en",
  fontSize: 1,
  larivaar: false,
};

type SettingsContextType = {
  settings: LanguageSettings;
  updateSettings: (newSettings: Partial<LanguageSettings>) => void;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<LanguageSettings>(defaultSettings);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("gurbani_settings");
    if (saved) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    setMounted(true);
  }, []);

  const updateSettings = (newSettings: Partial<LanguageSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("gurbani_settings", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isDrawerOpen, setDrawerOpen }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
