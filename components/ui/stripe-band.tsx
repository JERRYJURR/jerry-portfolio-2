"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Diagonal-stripe band, the signature element used to bookend stat strips and
 * the footer area. Always renders horizontal hairlines on both edges plus
 * vertical hairlines on the inner content frame, matching the desktop spec.
 *
 * Adjacent rows should NOT add their own horizontal borders — this band owns
 * both edges to avoid doubled-up hairlines.
 */
export function StripeBand({ className }: { className?: string }) {
  const reactId = useId();
  // SVG ids must not contain colons.
  const patternId = `stripe-${reactId.replace(/:/g, "")}`;

  return (
    <div
      className={cn(
        "h-6 flex items-center justify-center border-y border-rule",
        className,
      )}
    >
      <div className="relative h-[23px] w-full max-w-[1024px] mx-6 md:mx-12 border-x border-rule overflow-clip">
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={patternId}
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="8"
                stroke="rgba(9, 9, 11, 0.1)"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>
    </div>
  );
}
