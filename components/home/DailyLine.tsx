import React from "react";
import { getRandomLine } from "@/lib/gurbani";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function DailyLine() {
  const line = await getRandomLine();

  if (!line) return null;

  return (
    <div className="relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
      <div className="bg-white/50 dark:bg-black/20 p-6 sm:p-8 rounded-r-2xl border-y border-r border-black/5 dark:border-white/5 backdrop-blur-sm transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">
          Daily Hukamnama Line
        </h2>
        
        <p className="font-gurbani text-3xl leading-relaxed text-foreground mb-4">
          {line.gurmukhi}
        </p>
        
        {line.meaning.en && (
          <p className="text-sm text-muted-foreground mb-8 max-w-xl font-medium">
            {line.meaning.en}
          </p>
        )}
        
        <div className="flex">
          <Link 
            href={`/search?q=${line.id}`} 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity"
          >
            Read Shabad <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
