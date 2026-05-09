"use client";

import Image, { type StaticImageData } from "next/image";
import { MeshGradient } from "@paper-design/shaders-react";
import { cn } from "@/lib/cn";
import type { MediaPalette } from "@/components/ui/media-frame";

// SPEC: see /AGENTS.md — "CaseImage spec — DO NOT DEVIATE"
//
// Outer:    64px padding (16px mobile), rounded, overflow:clip, mesh gradient bg.
// Inner:    height = (IMAGE_HEIGHT − 2·padding) · bleedFactor   if bleed
//                    IMAGE_HEIGHT                                if not bleed
//                    bleedHeight                                 if explicit (NextCaseCard)
//           Implemented via `aspect-ratio` for responsive scaling.
// Image:    next/image with `fill` + `object-cover object-top` — the inner
//           div's height is authoritative; the image is cropped to fit.

const FALLBACK_COLORS = ["#F4F4F5", "#C7D2FE", "#FBCFE8", "#A5F3FC"];
const BLEED_REF_WIDTH = 1024;
const GRADIENT_MASK = "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.4) 100%)";
const GRADIENT_FALLBACK =
  "linear-gradient(in oklab 180deg, oklab(80.2% 0 0 / 5%) 0%, oklab(80.2% 0 0 / 25%) 100%)";
const IMAGE_SHADOW =
  "drop-shadow(rgba(0,0,0,0.25) 0px 2px 4px) drop-shadow(rgba(0,0,0,0.25) 0px 8px 16px) drop-shadow(rgba(0,0,0,0.25) 0px 32px 32px)";

export function CaseImage({
  src,
  alt = "",
  palette,
  aspect = "32/15",
  padding = 64,
  hoverScale = false,
  preload = false,
  bleed = false,
  bleedFactor = 0.85,
  bleedHeight,
  sizes = "(max-width: 1024px) 100vw, 1024px",
}: {
  src?: StaticImageData;
  alt?: string;
  palette?: MediaPalette;
  /** Aspect for the empty-state placeholder (no src). */
  aspect?: string;
  /** Desktop padding in px. Mobile is hardcoded to 16px via override. */
  padding?: number;
  hoverScale?: boolean;
  preload?: boolean;
  bleed?: boolean;
  /** Per-image fudge on the bleed formula. Default 0.85. */
  bleedFactor?: number;
  /** Override the inner wrapper height (px or CSS string). Used by NextCaseCard. */
  bleedHeight?: number | string;
  sizes?: string;
}) {
  const colors = palette?.colors ?? FALLBACK_COLORS;
  const [offsetX = 0, offsetY = 0] = palette?.offset ?? [];

  // Outer padding: 64/16 desktop/mobile. Bleed mode drops bottom padding so the
  // mesh gradient hugs the visible image bottom (no gradient strip below image).
  const mobilePaddingClass = bleed
    ? "max-md:!px-4 max-md:!pt-4 max-md:!pb-0"
    : "max-md:!p-4";

  const outerPadding = src
    ? bleed
      ? `${padding}px ${padding}px 0`
      : `${padding}px`
    : undefined;

  // Inner sizing — translate the spec formulas into aspect-ratio so the height
  // scales with viewport width while still satisfying the formula at the
  // reference (1024px) width.
  let innerStyle: React.CSSProperties | undefined;
  if (src) {
    if (bleedHeight !== undefined) {
      innerStyle = {
        height: typeof bleedHeight === "number" ? `${bleedHeight}px` : bleedHeight,
      };
    } else {
      const innerWidthMax = BLEED_REF_WIDTH - 2 * padding;
      const imageHeightMax = innerWidthMax * (src.height / src.width);
      const visible = bleed
        ? (imageHeightMax - 2 * padding) * bleedFactor
        : imageHeightMax;
      if (visible > 0) {
        innerStyle = { aspectRatio: `${innerWidthMax} / ${visible}` };
      }
    }
  }

  return (
    <div
      className={cn("relative", mobilePaddingClass)}
      style={{
        borderRadius: 24,
        overflow: "clip",
        transform: "translateZ(0)",
        ...(outerPadding ? { padding: outerPadding } : {}),
        ...(src ? {} : { aspectRatio: aspect }),
      }}
    >
      {/* Animated mesh gradient */}
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
          speed={0.08}
          distortion={0.75}
          swirl={0.45}
          grainMixer={0}
          grainOverlay={0}
          offsetX={offsetX}
          offsetY={offsetY}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Reduced-motion fallback */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden motion-reduce:block"
        style={{ backgroundImage: GRADIENT_FALLBACK }}
      />

      {src && (
        <div className="relative" style={innerStyle}>
          {/* Image is w-full + natural-ratio height (no fill, no object-cover).
              That way it can never be cropped sideways — width is always 100%
              of the inner div. If the natural rendered height exceeds the
              inner div's fixed/aspect-derived height, the image overflows
              downward and the outer container's `overflow: clip` handles the
              vertical clipping. Matches the home-page thumbnail behavior. */}
          <Image
            src={src}
            alt={alt}
            sizes={sizes}
            preload={preload}
            placeholder="blur"
            className={cn(
              "block w-full h-auto",
              hoverScale &&
                "transition-transform duration-[var(--duration-medium)] ease-[var(--ease-standard)] group-hover:scale-[1.015]",
            )}
            style={{ filter: IMAGE_SHADOW }}
          />
        </div>
      )}
    </div>
  );
}
