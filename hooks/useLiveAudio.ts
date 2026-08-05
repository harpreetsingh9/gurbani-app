"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LiveStream, LIVE_STREAMS } from "@/lib/kirtan/streams";

export type AudioStatus = "idle" | "connecting" | "live" | "buffering" | "paused" | "error";

export interface UseLiveAudioReturn {
  currentStream: LiveStream;
  status: AudioStatus;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  errorMessage: string | null;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  retry: () => void;
  selectStream: (stream: LiveStream) => void;
}

export function useLiveAudio(initialStream: LiveStream = LIVE_STREAMS[0]): UseLiveAudioReturn {
  const [currentStream, setCurrentStream] = useState<LiveStream>(initialStream);
  const [status, setStatus] = useState<AudioStatus>("idle");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastVolumeRef = useRef<number>(0.8);

  // Initialize or get single Audio instance safely
  const getAudioInstance = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "none";
      audio.volume = volume;
      audio.muted = isMuted;
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [volume, isMuted]);

  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.load();
        audioRef.current = null;
      }
    };
  }, []);

  // Bind HTML5 Audio Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => {
      setStatus("connecting");
      setErrorMessage(null);
    };

    const handleCanPlay = () => {
      // Audio is ready to play
    };

    const handlePlaying = () => {
      setStatus("live");
      setIsPlaying(true);
      setErrorMessage(null);
    };

    const handleWaiting = () => {
      setStatus("buffering");
    };

    const handlePause = () => {
      setStatus("paused");
      setIsPlaying(false);
    };

    const handleError = () => {
      setStatus("error");
      setIsPlaying(false);
      setErrorMessage("Unable to connect to the live stream.");
    };

    const handleEnded = () => {
      setStatus("idle");
      setIsPlaying(false);
    };

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentStream]);

  // Play audio
  const play = useCallback(() => {
    const audio = getAudioInstance();
    if (!audio) return;

    setErrorMessage(null);
    setStatus("connecting");

    // If source is empty or changed, load current stream URL
    if (audio.src !== currentStream.streamUrl) {
      audio.src = currentStream.streamUrl;
      audio.load();
    }

    audio
      .play()
      .then(() => {
        setStatus("live");
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Audio playback error:", err);
        setStatus("error");
        setIsPlaying(false);
        setErrorMessage("Unable to connect to the live stream.");
      });
  }, [currentStream, getAudioInstance]);

  // Pause audio
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setStatus("paused");
      setIsPlaying(false);
    }
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  // Update volume
  const setVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    if (clamped > 0) {
      lastVolumeRef.current = clamped;
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      audioRef.current.muted = clamped === 0;
    }
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      if (audioRef.current) {
        audioRef.current.muted = nextMuted;
      }
      return nextMuted;
    });
  }, []);

  // Retry connection
  const retry = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
    }
    play();
  }, [play]);

  // Switch stream
  const selectStream = useCallback(
    (stream: LiveStream) => {
      const wasPlaying = isPlaying;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = stream.streamUrl;
        audioRef.current.load();
      }
      setCurrentStream(stream);
      setStatus("idle");
      setIsPlaying(false);
      setErrorMessage(null);

      if (wasPlaying) {
        setTimeout(() => {
          play();
        }, 100);
      }
    },
    [isPlaying, play]
  );

  return {
    currentStream,
    status,
    isPlaying,
    isMuted,
    volume,
    errorMessage,
    play,
    pause,
    togglePlay,
    setVolume,
    toggleMute,
    retry,
    selectStream,
  };
}
