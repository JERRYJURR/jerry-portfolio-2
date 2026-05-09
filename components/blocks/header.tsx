"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Button } from "@/components/ui/button";
import { BrandLink } from "@/components/blocks/brand-link";
import { cn } from "@/lib/cn";
import { LINKS } from "@/lib/links";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 py-3 md:py-4">
      <div className="px-4 md:px-12">
        <div
          className={cn(
            "mx-auto flex h-12 md:h-14 w-full max-w-[1024px] items-center justify-between rounded-full p-1.5 md:p-2",
            "transition-[background-color,box-shadow,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
            scrolled
              ? "bg-bg/85 shadow-[var(--shadow-bar)] backdrop-blur-md"
              : "bg-transparent shadow-none",
          )}
        >
          <BrandLink />
          <div className="flex items-center gap-2">
            <Button
              variant="filled"
              size="md"
              href={LINKS.calendar}
              target="_blank"
              rel="noopener"
              className="max-md:!h-9 max-md:!px-3.5 max-md:!text-[14px]"
            >
              Book a call
              <ArrowRight motion="btn-x" />
            </Button>
            <Button
              variant="outline"
              size="md"
              href={LINKS.resume}
              target="_blank"
              rel="noopener"
              className="hidden md:inline-flex"
            >
              Resume
              <ArrowDown motion="btn-y-down" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
