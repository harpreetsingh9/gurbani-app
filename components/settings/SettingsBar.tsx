"use client";

import React, { useState } from "react";
import { useSettings } from "./SettingsProvider";
import { Settings, X, Type, AlignLeft, Sun, Moon, Monitor } from "lucide-react";

export function SettingsBar() {
  const { settings, updateSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
      {/* Floating Glass Settings Panel */}
      <div 
        className={`transition-all duration-300 ease-out mb-3 ${
          isOpen 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-4 scale-95 pointer-events-none absolute bottom-12"
        }`}
      >
        <div className="w-[calc(100vw-2rem)] max-w-md bg-white/90 dark:bg-black/85 backdrop-blur-xl border border-black/10 dark:border-white/20 p-4 sm:p-5 rounded-3xl shadow-2xl flex flex-col gap-4">
          
          {/* Top Row: Font Size Slider + Larivaar Toggle */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <Type size={16} className="text-muted-foreground shrink-0" />
              <input 
                type="range" 
                min="0.8" max="2" step="0.1" 
                value={settings.fontSize}
                onChange={(e) => updateSettings({ fontSize: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-black/10 dark:bg-white/20 rounded-full appearance-none outline-none accent-primary cursor-pointer"
              />
              <span className="text-xs font-bold text-muted-foreground w-9 text-right shrink-0">
                {Math.round(settings.fontSize * 100)}%
              </span>
            </div>

            <div className="w-px h-5 bg-black/10 dark:bg-white/10 shrink-0" />
            
            <button
              onClick={() => updateSettings({ larivaar: !settings.larivaar })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                settings.larivaar 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-black/5 dark:bg-white/10 text-muted-foreground hover:text-foreground"
              }`}
              title="Toggle Larivaar (Continuous Text)"
            >
              <AlignLeft size={14} />
              <span>Larivaar</span>
            </button>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-black/5 dark:border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Theme</span>
            <div className="flex gap-1">
              {[
                { id: "light", label: "Light", Icon: Sun },
                { id: "dark", label: "Dark", Icon: Moon },
                { id: "system", label: "Auto", Icon: Monitor },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => updateSettings({ theme: id as any })}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 transition-all ${
                    settings.theme === id 
                      ? "bg-primary text-white shadow-sm" 
                      : "bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-foreground"
                  }`}
                >
                  <Icon size={13} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Transliteration & Translation Selectors */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            {/* Transliteration */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phonetic</span>
              <div className="flex gap-1">
                {(["en", "hi", "off"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => updateSettings({ transliteration: opt })}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                      settings.transliteration === opt 
                        ? "bg-primary text-white shadow-sm" 
                        : "bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-foreground"
                    }`}
                  >
                    {opt === "en" ? "EN" : opt === "hi" ? "HI" : "OFF"}
                  </button>
                ))}
              </div>
            </div>

            {/* Translation */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Meaning</span>
              <div className="flex gap-1">
                {(["en", "hi", "pa", "off"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => updateSettings({ translation: opt })}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                      settings.translation === opt 
                        ? "bg-primary text-white shadow-sm" 
                        : "bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-foreground"
                    }`}
                  >
                    {opt === "en" ? "EN" : opt === "hi" ? "HI" : opt === "pa" ? "PA" : "OFF"}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 dark:bg-black/85 backdrop-blur-xl border border-black/10 dark:border-white/20 shadow-xl text-foreground hover:bg-white dark:hover:bg-black transition-all active:scale-95"
        aria-label="Toggle Display Settings"
      >
        {isOpen ? <X size={20} /> : <Settings size={20} />}
      </button>
    </div>
  );
}
