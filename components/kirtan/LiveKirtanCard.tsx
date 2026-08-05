"use client";

import React from "react";
import { useLiveAudio } from "@/hooks/useLiveAudio";
import { LIVE_STREAMS, LiveStream } from "@/lib/kirtan/streams";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  RotateCw,
  AlertCircle,
  MapPin,
} from "lucide-react";

export function LiveKirtanCard() {
  const {
    currentStream,
    status,
    isPlaying,
    isMuted,
    volume,
    errorMessage,
    togglePlay,
    setVolume,
    toggleMute,
    retry,
    selectStream,
  } = useLiveAudio(LIVE_STREAMS[0]);

  const isConnecting = status === "connecting";
  const isBuffering = status === "buffering";
  const isError = status === "error";

  const getStatusBadge = () => {
    switch (status) {
      case "live":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <span>LIVE</span>
          </div>
        );
      case "connecting":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-semibold">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Connecting...</span>
          </div>
        );
      case "buffering":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-semibold">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            <span>Buffering...</span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-semibold">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            <span>Offline</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground text-[10px] font-semibold">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            <span>Paused</span>
          </div>
        );
    }
  };

  return (
    <section className="mb-8">
      <div className="relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-primary/5 to-background border border-primary/20 shadow-sm transition-all hover:shadow-md">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Radio size={16} />
            <span>Live Gurbani Kirtan</span>
          </div>
          {getStatusBadge()}
        </div>

        {/* Stream Info & Visualizer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground">
              {currentStream.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <MapPin size={13} className="text-primary" />
              <span>{currentStream.location}</span>
              <span>•</span>
              <span>{currentStream.source}</span>
            </div>
          </div>

          {/* Equalizer Animation (visible when audio is playing) */}
          {isPlaying && (
            <div className="flex items-end gap-1 h-6 px-3 py-1 bg-primary/10 rounded-lg shrink-0">
              <span className="w-1 bg-primary rounded-full animate-[bounce_1s_infinite_100ms] h-4" />
              <span className="w-1 bg-primary rounded-full animate-[bounce_1s_infinite_300ms] h-6" />
              <span className="w-1 bg-primary rounded-full animate-[bounce_1s_infinite_200ms] h-3" />
              <span className="w-1 bg-primary rounded-full animate-[bounce_1s_infinite_400ms] h-5" />
            </div>
          )}
        </div>

        {/* Stream Selector Dropdown/Tabs */}
        {LIVE_STREAMS.length > 1 && (
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 no-scrollbar">
            {LIVE_STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => selectStream(s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  s.id === currentStream.id
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-black/5 dark:bg-white/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        )}

        {/* Error Alert with Retry */}
        {isError && (
          <div className="mb-6 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-between gap-3 text-xs text-destructive">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMessage || "Unable to connect to the live stream."}</span>
            </div>
            <button
              onClick={retry}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold hover:bg-destructive/90 transition-all shrink-0"
              aria-label="Retry live stream connection"
            >
              <RotateCw size={12} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Player Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-black/5 dark:border-white/5">
          {/* Main Play/Pause Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              disabled={isConnecting || isBuffering}
              aria-label={isPlaying ? "Pause Live Kirtan" : "Play Live Kirtan"}
              className="p-3.5 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md shrink-0 active:scale-95 disabled:opacity-75"
            >
              {isConnecting || isBuffering ? (
                <RotateCw size={20} className="animate-spin" />
              ) : isPlaying ? (
                <Pause size={20} className="fill-current" />
              ) : (
                <Play size={20} className="fill-current ml-0.5" />
              )}
            </button>

            <div>
              <p className="text-xs font-semibold text-foreground">
                {isPlaying ? "Now Playing Live" : "Listen Live 24/7"}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {isConnecting
                  ? "Connecting to SGPC server..."
                  : isBuffering
                  ? "Buffering stream..."
                  : isPlaying
                  ? "28 kbps • High Quality Audio"
                  : "Tap play to start live broadcast"}
              </p>
            </div>
          </div>

          {/* Volume Controls */}
          <div className="flex items-center gap-2 sm:self-center">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Volume level"
              className="w-24 sm:w-28 h-1.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
