"use client";

import React from "react";
import { Settings } from "lucide-react";
import { useSettings } from "./SettingsProvider";

export function SettingsButton() {
  const { setDrawerOpen, isDrawerOpen } = useSettings();

  return (
    <button 
      onClick={() => setDrawerOpen(!isDrawerOpen)}
      className="p-2 -mr-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Display Settings"
    >
      <Settings size={20} />
    </button>
  );
}
