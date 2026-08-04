import React from "react";
import Link from "next/link";
import { ChevronLeft, Search as SearchIcon } from "lucide-react";

export default function SearchPage() {
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
        <h1 className="text-2xl font-bold">Search</h1>
      </header>

      {/* Search Input Shell */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
          <SearchIcon size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Search Gurbani (English, Gurmukhi, or Ang)"
          className="w-full bg-white dark:bg-stone-900 border border-muted-foreground/30 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        />
      </div>

      <div className="text-center py-12 text-muted-foreground">
        <p>Search functionality will be implemented in the next phase.</p>
        <p className="text-sm mt-2">Currently showing UI shell only.</p>
      </div>
    </main>
  );
}
