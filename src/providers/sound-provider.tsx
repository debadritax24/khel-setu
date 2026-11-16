"use client";

import { useEffect } from "react";
import { playHoverSound } from "@/lib/sound";

export function SoundEffectsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Resume audio context on first user interaction to comply with browser autoplay policies
    const handleFirstGesture = () => {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const tempCtx = new AudioCtx();
          if (tempCtx.state === "suspended") {
            tempCtx.resume();
          }
        }
      } catch {
        // Ignore
      }
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };

    window.addEventListener("pointerdown", handleFirstGesture, { passive: true, once: true });
    window.addEventListener("keydown", handleFirstGesture, { passive: true, once: true });

    // Global hover detection for any button or role="button"
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, [role="button"], [data-slot="button"], a.btn, input[type="button"], input[type="submit"]'
      );

      if (interactive) {
        playHoverSound();
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };
  }, []);

  return <>{children}</>;
}
