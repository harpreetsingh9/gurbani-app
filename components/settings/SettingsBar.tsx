"use client";

import React from "react";
import { useSettings } from "./SettingsProvider";
import { X, Type, AlignLeft, Sun, Moon, Monitor } from "lucide-react";

export function SettingsBar() {
  const { settings, updateSettings, isDrawerOpen, setDrawerOpen } = useSettings();

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Glass Settings Panel (positioned under header right side) */}
      <div className="fixed top-16 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="w-[calc(100vw-2rem)] max-w-md bg-card-bg backdrop-blur-xl border border-border p-4 sm:p-5 rounded-3xl shadow-2xl flex flex-col gap-4 text-foreground">
          
          {/* Panel Header */}
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Display Settings</span>
            <button 
              onClick={() => setDrawerOpen(false)}
              className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close Settings"
            >
              <X size={18} />
            </button>
          </div>

          {/* Top Row: Font Size Slider + Larivaar Toggle */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-border">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <Type size={16} className="text-muted-foreground shrink-0" />
              <input 
                type="range" 
                min="0.8" max="2" step="0.1" 
                value={settings.fontSize}
                onChange={(e) => updateSettings({ fontSize: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-muted rounded-full appearance-none outline-none accent-primary cursor-pointer"
              />
              <span className="text-xs font-bold text-muted-foreground w-9 text-right shrink-0">
                {Math.round(settings.fontSize * 100)}%
              </span>
            </div>

            <div className="w-px h-5 bg-border shrink-0" />
            
            <button
              onClick={() => updateSettings({ larivaar: !settings.larivaar })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                settings.larivaar 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
              title="Toggle Larivaar (Continuous Text)"
            >
              <AlignLeft size={14} />
              <span>Larivaar</span>
            </button>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-border">
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
                      : "bg-muted hover:bg-muted/80 text-foreground"
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
                        : "bg-muted hover:bg-muted/80 text-foreground"
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
                        : "bg-muted hover:bg-muted/80 text-foreground"
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
    </>
  );
}
