import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function AngPage({ params }: { params: Promise<{ number: string }> }) {
  const resolvedParams = await params;
  const ang = resolvedParams.number;

  return (
    <main className="flex-1 w-full max-w-3xl mx-auto p-4 sm:p-6 pb-24">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <Link 
          href="/"
          className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
        >
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">Ang {ang}</h1>
      </header>

      <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 text-center border border-muted/50 shadow-sm">
        <p className="text-xl text-primary font-medium mb-2">Coming Soon</p>
        <p className="text-muted-foreground">
          Ang-by-Ang browsing will be available in Phase 2.
        </p>
      </div>
    </main>
  );
}
