"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  BookOpen,
  TrendingUp,
  History,
  Search,
  Sparkles,
} from "lucide-react";
import { StreakWidget } from "@/components/home/StreakWidget";
import { SettingsButton } from "@/components/settings/SettingsButton";

export function TopNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutGrid,
      exact: true,
    },
    {
      label: "Sundar Gutka",
      href: "/gutka",
      icon: BookOpen,
      exact: false,
    },
    {
      label: "Insights",
      href: "/insights",
      icon: TrendingUp,
      exact: false,
    },
    {
      label: "History",
      href: "/history",
      icon: History,
      exact: false,
    },
  ];

  return (
    <header className="hidden sm:block sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-black/10 dark:border-white/10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Left: Branding Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-primary text-primary-foreground group-hover:scale-105 transition-transform shadow-xs">
            <BookOpen size={18} />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">
              Sikh Gurbani
            </span>
            <span className="block text-[10px] text-muted-foreground font-medium -mt-0.5">
              Nitnem & Scripture
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-2xl border border-black/5 dark:border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-background text-primary shadow-xs scale-100"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Quick Tools (Streak, Search, Settings) */}
        <div className="flex items-center gap-3">
          <StreakWidget />

          <Link
            href="/search"
            className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            title="Search Gurbani (Line or Ang)"
            aria-label="Search Gurbani"
          >
            <Search size={18} />
          </Link>

          <SettingsButton />
        </div>
      </div>
    </header>
  );
}
