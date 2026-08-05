import React from "react";
import { HistoryList } from "@/components/history/HistoryList";
import { SettingsButton } from "@/components/settings/SettingsButton";
import { SettingsBar } from "@/components/settings/SettingsBar";
import { History as HistoryIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading History & Progress - Sikh Gurbani",
  description: "View saved reading positions, resume Nitnem prayers, and track your daily Gurbani reading history.",
  alternates: {
    canonical: "https://sikhi.vercel.app/history",
  },
};

export default function HistoryPage() {
  return (
    <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 pb-32">
      {/* Top Header */}
      <header className="flex items-center justify-between py-6 mb-6 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
            <HistoryIcon size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">History & Saved</h1>
            <p className="text-xs text-muted-foreground">Continue reading where you left off</p>
          </div>
        </div>
        <SettingsButton />
      </header>

      {/* History List Component */}
      <HistoryList />

      {/* Floating Settings Bar Dropdown */}
      <SettingsBar />
    </main>
  );
}
