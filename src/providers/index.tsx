"use client";

import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";
import { SoundEffectsProvider } from "./sound-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SoundEffectsProvider>
        {children}
        <ToastProvider />
      </SoundEffectsProvider>
    </ThemeProvider>
  );
}

export { ThemeProvider } from "./theme-provider";
export { ToastProvider } from "./toast-provider";
export { SoundEffectsProvider } from "./sound-provider";
export { playHoverSound, playClickSound } from "@/lib/sound";
