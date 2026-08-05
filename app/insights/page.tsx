import React from "react";
import { InsightsDashboard } from "@/components/insights/InsightsDashboard";
import { SettingsButton } from "@/components/settings/SettingsButton";
import { SettingsBar } from "@/components/settings/SettingsBar";
import { TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading Insights & Analytics - Sikh Gurbani",
  description: "Track your personal Gurbani reading journey, Nitnem consistency, habits, favorite scripture, and milestone celebrations.",
  alternates: {
    canonical: "https://sikhi.vercel.app/insights",
  },
};

export default function InsightsPage() {
  return (
    <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 pb-32">
      {/* Top Header */}
      <header className="flex items-center justify-between py-6 mb-6 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
            <TrendingUp size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Reading Insights</h1>
            <p className="text-xs text-muted-foreground">Your spiritual journey & statistics</p>
          </div>
        </div>
        <SettingsButton />
      </header>

      {/* Insights Dashboard Component */}
      <InsightsDashboard />

      {/* Floating Settings Bar Dropdown */}
      <SettingsBar />
    </main>
  );
}
