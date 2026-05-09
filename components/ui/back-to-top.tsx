"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const SHOW_AFTER_PX = 600;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setVisible(false);
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={onClick}
      className={cn(
        "group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent",
        "shadow-[0_1px_2px_#00000066,0_4px_12px_#00000033]",
        "transition-[opacity,transform,box-shadow,background-color] duration-[var(--duration-medium)] ease-[var(--ease-standard)]",
        "hover:bg-accent-hover hover:shadow-[0_2px_4px_#00000080,0_8px_24px_#0000004D]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-1 pointer-events-none",
      )}
    >
      <ArrowUp
        strokeWidth={1.6}
        className="h-5 w-5 text-on-accent transition-transform duration-[var(--duration-medium)] ease-[var(--ease-standard)] group-hover:-translate-y-0.5"
      />
    </button>
  );
}
