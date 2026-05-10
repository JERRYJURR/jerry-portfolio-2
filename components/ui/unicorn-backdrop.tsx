"use client";

import { useEffect } from "react";
import { cn } from "@/lib/cn";

const SCRIPT_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js";

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized?: boolean;
      init?: () => void;
    };
  }
}

/**
 * Embeds a Unicorn Studio shader. Loads the umd script once and re-runs
 * UnicornStudio.init() on every mount so the project div picks up the
 * renderer. Render this as an absolutely-positioned child of a relatively-
 * positioned parent for use as a background.
 */
export function UnicornBackdrop({
  projectId,
  className,
}: {
  projectId: string;
  className?: string;
}) {
  useEffect(() => {
    const existing = window.UnicornStudio;
    if (existing?.init) {
      existing.init();
      return;
    }
    if (existing) {
      // Script tag is already in flight from a prior mount; let its onload fire.
      return;
    }
    window.UnicornStudio = { isInitialized: false };
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => window.UnicornStudio?.init?.();
    document.head.appendChild(script);
  }, []);

  return (
    <div
      data-us-project={projectId}
      className={cn("h-full w-full", className)}
      aria-hidden
    />
  );
}
