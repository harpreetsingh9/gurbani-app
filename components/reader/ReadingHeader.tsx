"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { SettingsButton } from "@/components/settings/SettingsButton";

export function ReadingHeader({ title }: { title?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setProgress(Math.min(100, Math.max(0, scrolled)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border transition-colors relative">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link 
          href="/"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors py-2 -ml-2 shrink-0"
        >
          <ChevronLeft size={20} />
          <span className="font-medium text-sm">Library</span>
        </Link>

        {title && (
          <span className="font-gurbani text-base font-semibold text-foreground/90 truncate max-w-[180px] sm:max-w-xs text-center px-2">
            {title}
          </span>
        )}

        <SettingsButton />
      </div>

      {/* Slim Scroll Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[3px] bg-muted overflow-hidden">
        <div 
          className="bg-primary h-full transition-all duration-75 ease-out shadow-[0_0_8px_var(--primary)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}
