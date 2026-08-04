"use client";

import React, { useState } from "react";
import { useSettings } from "./SettingsProvider";
import { Settings, X, Type, Globe, AlignLeft } from "lucide-react";

export function SettingsBar() {
  const { settings, updateSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div 
        className={`flex flex-col items-center gap-4 transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none absolute bottom-0"
        }`}
      >
        <div className="bg-white/70 dark:bg-black/60 backdrop-blur-lg border border-black/10 dark:border-white/20 p-4 rounded-3xl shadow-xl flex gap-6 items-center">
          
          {/* Font Size */}
          <div className="flex flex-col items-center gap-2 group relative">
            <Type size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            <input 
              type="range" 
              min="0.8" max="2" step="0.1" 
              value={settings.fontSize}
              onChange={(e) => updateSettings({ fontSize: parseFloat(e.target.value) })}
              className="w-20 h-1 bg-muted-foreground/30 rounded-full appearance-none outline-none accent-primary"
            />
          </div>

          <div className="w-px h-8 bg-black/10 dark:bg-white/10" />

          {/* Transliteration */}
          <div className="flex flex-col gap-1 items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phonetic</span>
            <div className="flex gap-1">
              {(["en", "hi", "off"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => updateSettings({ transliteration: opt })}
                  className={`text-xs px-2.5 py-1 rounded-full transition-all ${
                    settings.transliteration === opt 
                      ? "bg-primary text-white" 
                      : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  {opt === "en" ? "EN" : opt === "hi" ? "HI" : "OFF"}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-8 bg-black/10 dark:bg-white/10" />

          {/* Translation */}
          <div className="flex flex-col gap-1 items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Meaning</span>
            <div className="flex gap-1">
              {(["en", "hi", "pa", "off"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => updateSettings({ translation: opt })}
                  className={`text-xs px-2.5 py-1 rounded-full transition-all ${
                    settings.translation === opt 
                      ? "bg-primary text-white" 
                      : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  {opt === "en" ? "EN" : opt === "hi" ? "HI" : opt === "pa" ? "PA" : "OFF"}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-px h-8 bg-black/10 dark:bg-white/10" />

          {/* Larivaar */}
          <button
            onClick={() => updateSettings({ larivaar: !settings.larivaar })}
            className={`p-2 rounded-full transition-all ${
              settings.larivaar ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
            }`}
            title="Toggle Larivaar (Continuous)"
          >
            <AlignLeft size={18} />
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="mt-4 mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-lg border border-black/10 dark:border-white/20 shadow-lg text-foreground hover:bg-white/90 dark:hover:bg-black/90 transition-all"
        aria-label="Toggle Display Settings"
      >
        {isOpen ? <X size={20} /> : <Settings size={20} />}
      </button>
    </div>
  );
}
