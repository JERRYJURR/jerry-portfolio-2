"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/cn";

const PREFERS_REDUCED =
  "(prefers-reduced-motion: reduce)" as const;

/**
 * Wraps content in an intersection-observer-triggered reveal.
 * - Fades in (opacity 0→1) and lifts (translateY 12→0)
 * - 600ms ease-out, fires once per instance
 * - `delay` lets the parent stagger siblings (e.g. hero items)
 * - Auto-reveals immediately under prefers-reduced-motion
 *
 * Above-the-fold content reveals on mount because IntersectionObserver
 * fires its initial check; no extra logic needed for first-load orchestration.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  duration = 900,
  translate = 12,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  duration?: number;
  translate?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia(PREFERS_REDUCED).matches) {
      setRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10%" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : `translateY(${translate}px)`,
        transition: `opacity ${duration}ms var(--ease-out) ${delay}ms, transform ${duration}ms var(--ease-out) ${delay}ms`,
        willChange: revealed ? undefined : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
