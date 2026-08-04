"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type LanguageSettings = {
  transliteration: "en" | "hi" | "off";
  translation: "en" | "hi" | "pa" | "off";
  fontSize: number; // e.g. 1 (normal), 1.25, 1.5, etc.
  larivaar: boolean;
  theme: "light" | "dark" | "system";
};

const defaultSettings: LanguageSettings = {
  transliteration: "en",
  translation: "en",
  fontSize: 1,
  larivaar: false,
  theme: "system",
};

type SettingsContextType = {
  settings: LanguageSettings;
  updateSettings: (newSettings: Partial<LanguageSettings>) => void;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function applyThemeClass(theme: "light" | "dark" | "system") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  
  if (theme === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else if (theme === "light") {
    root.classList.add("light");
    root.style.colorScheme = "light";
  } else {
    root.style.colorScheme = "";
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<LanguageSettings>(defaultSettings);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("gurbani_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const merged = { ...defaultSettings, ...parsed };
        setSettings(merged);
        applyThemeClass(merged.theme);
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    } else {
      applyThemeClass("system");
    }
  }, []);

  const updateSettings = (newSettings: Partial<LanguageSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("gurbani_settings", JSON.stringify(updated));
      if (newSettings.theme) {
        applyThemeClass(newSettings.theme);
      }
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
