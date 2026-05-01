"use client";

import { useEffect, useState } from "react";

/**
 * Thin scroll-progress bar fixed at the top of the viewport.
 * Uses requestAnimationFrame to throttle scroll math.
 * Hidden on mobile (<md) to avoid clutter on small screens.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const p =
        total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      setProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 right-0 z-50 hidden h-1 md:block"
    >
      <div
        className="h-full origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
