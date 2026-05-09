"use client";

import Image, { type StaticImageData } from "next/image";
import { MeshGradient } from "@paper-design/shaders-react";
import type { MediaPalette } from "@/components/ui/media-frame";

const FALLBACK_COLORS = ["#F4F4F5", "#C7D2FE", "#FBCFE8", "#A5F3FC"];
const GRADIENT_MASK = "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.4) 100%)";
const GRADIENT_FALLBACK =
  "linear-gradient(in oklab 180deg, oklab(80.2% 0 0 / 5%) 0%, oklab(80.2% 0 0 / 25%) 100%)";
const IMAGE_SHADOW =
  "drop-shadow(rgba(0,0,0,0.25) 0px 2px 4px) drop-shadow(rgba(0,0,0,0.25) 0px 8px 16px) drop-shadow(rgba(0,0,0,0.25) 0px 32px 32px)";

/**
 * Case study page image block. Mirrors the home-page thumbnail structure:
 * mesh gradient background, inset top/sides, image bleeds off the bottom.
 *
 * Two modes:
 *   - default: container grows to wrap the image with `padding` on all sides.
 *   - bleed:   container is fixed to `aspect` with no bottom padding, so the
 *              image overflows and gets clipped (matches the home thumbnails).
 *
 * When no src is provided, renders a gradient placeholder at the given aspect.
 */
export function CaseImage({
  src,
  alt = "",
  palette,
  aspect = "32/15",
  padding = 64,
  hoverScale = false,
  preload = false,
  bleed = false,
  sizes = "(max-width: 1024px) 100vw, 1024px",
}: {
  src?: StaticImageData;
  alt?: string;
  palette?: MediaPalette;
  aspect?: string;
  padding?: number;
  hoverScale?: boolean;
  preload?: boolean;
  bleed?: boolean;
  sizes?: string;
}) {
  const colors = palette?.colors ?? FALLBACK_COLORS;
  const [offsetX = 0, offsetY = 0] = palette?.offset ?? [];

  const containerSizing = src
    ? bleed
      ? {
          aspectRatio: aspect,
          padding: `${padding}px ${padding}px 0`,
        }
      : { padding: `${padding}px` }
    : { aspectRatio: aspect };

  return (
    <div
      className="relative"
      style={{
        borderRadius: 24,
        overflow: "clip",
        transform: "translateZ(0)",
        ...containerSizing,
      }}
    >
      {/* Mesh gradient background */}
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

      {/* Static fallback for prefers-reduced-motion */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden motion-reduce:block"
        style={{ backgroundImage: GRADIENT_FALLBACK }}
      />

      {src && (
        <div className="relative flex items-start justify-center">
          <Image
            src={src}
            alt={alt}
            sizes={sizes}
            preload={preload}
            placeholder="blur"
            className={"block w-full h-auto" + (hoverScale ? " transition-transform duration-[var(--duration-medium)] ease-[var(--ease-standard)] group-hover:scale-[1.015]" : "")}
            style={{ filter: IMAGE_SHADOW }}
          />
        </div>
      )}
    </div>
  );
}
