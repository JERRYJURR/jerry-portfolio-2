"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";

/**
 * Avatar + name link in the header.
 * On home: smooth-scrolls to top.
 * Anywhere else: navigates to home.
 */
export function BrandLink() {
  const pathname = usePathname();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      onClick={onClick}
      className="
        group relative inline-flex items-center gap-2 rounded-full pr-3
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
      "
    >
      {/* Hover fill — extends 4px past the link's edge */}
      <span
        aria-hidden
        className="
          pointer-events-none absolute -inset-1 rounded-full bg-transparent
          transition-colors duration-[var(--duration-medium)] ease-[var(--ease-standard)]
          group-hover:bg-hover-bg
        "
      />
      <Avatar
        size="sm"
        src="/jerry.webp"
        alt="Jerry Kou"
        className="relative"
      />
      <span className="relative font-display text-[20px] font-medium tracking-[-0.025em] leading-none text-ink">
        Jerry Kou
      </span>
    </Link>
  );
}
