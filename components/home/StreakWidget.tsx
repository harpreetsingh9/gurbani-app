"use client";

import React, { useEffect, useState } from "react";
import { Flame } from "lucide-react";

export function StreakWidget() {
  const [streak, setStreak] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Basic local storage streak logic for phase 1
    const lastRead = localStorage.getItem("gurbani_last_read");
    const currentStreak = localStorage.getItem("gurbani_streak") || "0";
    
    const today = new Date().toDateString();
    
    if (lastRead === today) {
      setStreak(parseInt(currentStreak, 10));
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastRead === yesterday.toDateString()) {
        // Continue streak
        const newStreak = parseInt(currentStreak, 10) + 1;
        setStreak(newStreak);
        localStorage.setItem("gurbani_streak", newStreak.toString());
      } else if (lastRead !== today) {
        // Reset streak
        setStreak(1);
        localStorage.setItem("gurbani_streak", "1");
      }
      localStorage.setItem("gurbani_last_read", today);
    }
    
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-24 bg-muted rounded-full animate-pulse" />;
  }

  return (
    <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5">
      <Flame 
        className={streak > 0 ? "text-primary" : "text-muted-foreground"} 
        size={16} 
        fill={streak > 0 ? "currentColor" : "none"} 
      />
      <span className="font-bold text-xs tracking-wider uppercase text-foreground">
        {streak} {streak === 1 ? 'Day' : 'Days'}
      </span>
    </div>
  );
}
