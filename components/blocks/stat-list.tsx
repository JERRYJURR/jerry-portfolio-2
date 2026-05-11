"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Stat = { value: string; label: string };

function parseStat(raw: string) {
  const m = raw.match(/^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
  if (!m) return null;
  const [, prefix, numStr, suffix] = m;
  return {
    prefix,
    target: parseFloat(numStr.replace(/,/g, "")),
    decimals: (numStr.split(".")[1] ?? "").length,
    hasCommas: numStr.includes(","),
    suffix,
  };
}

function formatCount(n: number, decimals: number, hasCommas: boolean) {
  if (decimals > 0) return n.toFixed(decimals);
  const rounded = Math.round(n);
  return hasCommas ? rounded.toLocaleString() : String(rounded);
}

function AnimatedStat({
  value,
  label,
  active,
  delay,
  isLast,
}: {
  value: string;
  label: string;
  active: boolean;
  delay: number;
  isLast: boolean;
}) {
  const parsed = useMemo(() => parseStat(value), [value]);
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!active || !parsed) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(parsed.target);
      return;
    }

    const timer = setTimeout(() => {
      const duration = 1000;
      let start: number | null = null;

      const tick = (ts: number) => {
        if (!start) start = ts;
        const t = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setCount(eased * parsed.target);
        if (t < 1) raf.current = requestAnimationFrame(tick);
      };

      raf.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf.current);
    };
  }, [active, parsed?.target, delay]);

  const displayed = parsed
    ? parsed.prefix + formatCount(count, parsed.decimals, parsed.hasCommas) + parsed.suffix
    : value;

  return (
    <div className={"flex flex-col gap-4 p-4 md:p-6" + (!isLast ? " border-b border-rule" : "")}>
      <div className="font-display text-[24px] md:text-[40px] font-normal tracking-[-0.05em] leading-none text-ink tabular-nums">
        {displayed}
      </div>
      <div className="font-mono text-[11px] md:text-[13px] leading-4 tracking-[0.1em] uppercase text-ink-subtle">
        {label}
      </div>
    </div>
  );
}

export function StatList({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex h-fit flex-col self-start rounded-2xl outline outline-1 outline-rule-strong"
    >
      {stats.map((stat, i) => (
        <AnimatedStat
          key={stat.label}
          value={stat.value}
          label={stat.label}
          active={active}
          delay={i * 80}
          isLast={i === stats.length - 1}
        />
      ))}
    </div>
  );
}
