"use client";

import { useEffect, useRef, useState } from "react";

const PREFERS_REDUCED = "(prefers-reduced-motion: reduce)" as const;

/**
 * Splits a value like "$1B+" into { prefix: "$", num: 1, tail: "B+" }
 * so we can animate the numeric portion only. Returns null for values
 * without a leading number (e.g. "WCAG 2.1 AA"), in which case the
 * value is rendered as-is with no animation.
 */
function split(value: string) {
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  return {
    prefix: m[1],
    num: parseFloat(m[2]),
    decimals: (m[2].split(".")[1] ?? "").length,
    tail: m[3],
  };
}

function format(prefix: string, n: number, decimals: number, tail: string) {
  const rounded = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  // Preserve thousands separators for large numbers (matches "186,000+").
  const withCommas = decimals > 0 ? rounded : Number(rounded).toLocaleString();
  return `${prefix}${withCommas}${tail}`;
}

export function CountUp({
  value,
  duration = 1200,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const startedRef = useRef(false);
  const parts = split(value);

  useEffect(() => {
    if (!parts || startedRef.current) return;
    if (typeof window === "undefined") return;

    if (window.matchMedia(PREFERS_REDUCED).matches) {
      setDisplay(value);
      return;
    }

    setDisplay(format(parts.prefix, 0, parts.decimals, parts.tail));

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        const start = performance.now();
        const target = parts.num;
        const ease = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const n = ease(t) * target;
          setDisplay(format(parts.prefix, n, parts.decimals, parts.tail));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  if (!parts) return <span>{value}</span>;

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
