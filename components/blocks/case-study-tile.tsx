"use client";

import { useState } from "react";
import Link from "next/link";
import { MeshGradient } from "@paper-design/shaders-react";
import { ArrowRight } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaFrame, type MediaPalette } from "@/components/ui/media-frame";

export type Stat = { value: string; label: string };

export type CaseStudyPalette = MediaPalette & {
  /** Hover ambient fill — low-alpha rgba/hex8 that complements the mesh. */
  ambient?: string;
  ambientActive?: string;
};

const FALLBACK_COLORS = ["#F4F4F5", "#C7D2FE", "#FBCFE8", "#A5F3FC"];
const GRADIENT_MASK = "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.4) 100%)";
const GRADIENT_FALLBACK =
  "linear-gradient(in oklab 180deg, oklab(80.2% 0 0 / 5%) 0%, oklab(80.2% 0 0 / 25%) 100%)";
// Exact values from the Paper design. overflow:clip on the container (not hidden)
// is what clips filter GPU layers correctly without creating a BFC.
const IMAGE_SHADOW =
  "drop-shadow(rgba(0,0,0,0.25) 0px 2px 4px) drop-shadow(rgba(0,0,0,0.25) 0px 8px 16px) drop-shadow(rgba(0,0,0,0.25) 0px 32px 32px)";

// ─── Thumbnail ────────────────────────────────────────────────────────────────

function CaseThumbnail({
  src,
  alt,
  palette,
  hovered,
}: {
  src: string;
  alt: string;
  palette?: CaseStudyPalette;
  hovered: boolean;
}) {
  const colors = palette?.colors ?? FALLBACK_COLORS;
  const [offsetX = 0, offsetY = 0] = palette?.offset ?? [];

  return (
    <div
      className="relative flex-shrink-0"
      style={{
        height: 238,
        borderRadius: 24,
        overflow: "clip",
        transform: "translateZ(0)",
        padding: "16px 16px 0",
      }}
    >
      {/* Mesh gradient — blurred background, sits behind padded content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 motion-reduce:hidden"
        style={{
          filter: "blur(16px)",
          maskImage: GRADIENT_MASK,
          WebkitMaskImage: GRADIENT_MASK,
        }}
      >
        <MeshGradient
          colors={colors}
          speed={hovered ? 0.18 : 0}
          distortion={0.75}
          swirl={0.45}
          grainMixer={0}
          grainOverlay={0}
          offsetX={offsetX}
          offsetY={offsetY}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Static fallback for prefers-reduced-motion */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden motion-reduce:block"
        style={{ backgroundImage: GRADIENT_FALLBACK }}
      />

      {/* Screenshot — fills padding area, bleeds off the bottom. */}
      <div className="relative flex items-start justify-center">
        <img
          src={src}
          alt={alt}
          className="block w-full object-cover object-top
            transition-transform duration-[var(--duration-medium)] ease-[var(--ease-standard)]
            group-hover:scale-[1.015]"
          style={{ filter: IMAGE_SHADOW }}
        />
      </div>
    </div>
  );
}

// ─── Tile ─────────────────────────────────────────────────────────────────────

export function CaseStudyTile({
  href,
  year,
  project,
  headline,
  stats,
  imageSrc,
  palette,
}: {
  href: string;
  year: string;
  project: string;
  headline: string;
  stats: Stat[];
  imageSrc?: string;
  palette?: CaseStudyPalette;
}) {
  const [hovered, setHovered] = useState(false);
  const ambient = palette?.ambient ?? "#09090B05";
  const ambientActive = palette?.ambientActive ?? "#09090B08";

  return (
    <Link
      href={href}
      className="group relative block h-full focus-visible:outline-none"
      style={{ "--ambient": ambient, "--ambient-active": ambientActive } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ambient hover fill — bleeds 12px past card edge, tinted from palette */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-[28px] bg-transparent
          transition-colors duration-[var(--duration-medium)] ease-[var(--ease-standard)]
          group-hover:bg-[var(--ambient)] group-active:bg-[var(--ambient-active)]"
      />

      <div className="relative flex h-full flex-col">
        {imageSrc ? (
          <CaseThumbnail src={imageSrc} alt={headline} palette={palette} hovered={hovered} />
        ) : (
          <MediaFrame aspect="16/9" padding={16} alt={headline} palette={palette} />
        )}

        <div className="flex flex-1 flex-col gap-8 px-6 pt-6 pb-3">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-2">
                <Eyebrow>{year}</Eyebrow>
                <Eyebrow className="text-ink-faint">·</Eyebrow>
                <Eyebrow>{project}</Eyebrow>
              </div>
              <ArrowRight
                className="mt-px text-ink-faint
                  transition-transform duration-[var(--duration-medium)] ease-[var(--ease-standard)]
                  group-hover:translate-x-1 group-hover:text-ink"
              />
            </div>
            <h3 className="font-display text-[20px] leading-[1.45] text-ink">
              <span
                className="bg-no-repeat bg-left-bottom bg-[length:0%_1px]
                  bg-[linear-gradient(currentColor,currentColor)] pb-px
                  transition-[background-size] duration-[var(--duration-base)] ease-[var(--ease-standard)]
                  group-hover:bg-[length:100%_1px]"
              >
                {headline}
              </span>
            </h3>
          </div>

          <div className="flex flex-col gap-1.5">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span className="font-display text-[15px] font-medium text-ink-muted tabular-nums">
                  {stat.value}
                </span>
                <span className="font-mono text-[11px] leading-4 tracking-[0.1em] uppercase text-ink-subtle">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
