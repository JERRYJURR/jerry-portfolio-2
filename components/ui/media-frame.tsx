"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { cn } from "@/lib/cn";

export type MediaPalette = {
  /** 3–5 colors for the mesh gradient. First color usually matches the page bg. */
  colors: string[];
  /** Mesh offset, each in -1..1. Lets each instance look distinct. */
  offset?: [x: number, y: number];
};

const defaultPalette: MediaPalette = {
  colors: ["#F4F4F5", "#C7D2FE", "#FBCFE8", "#A5F3FC", "#DDD6FE"],
  offset: [0, 0],
};

/**
 * Gradient placeholder frame. Pass either an `src` to render a framed image,
 * or `children` to render a custom React component inside the frame.
 * If neither is provided, the gradient placeholder fills the frame (empty state).
 *
 * The placeholder is an animated mesh gradient (subtle, blurred, bottom-anchored)
 * with a static fallback for reduced-motion users.
 */
export function MediaFrame({
  src,
  alt,
  aspect = "16/9",
  padding = 8,
  palette = defaultPalette,
  className,
  innerClassName,
  children,
}: {
  src?: string;
  alt?: string;
  aspect?: string;
  /** 8 or 16. Inner radius computed from outer (24) − padding. */
  padding?: 8 | 16;
  palette?: MediaPalette;
  className?: string;
  innerClassName?: string;
  children?: React.ReactNode;
}) {
  const innerRadius = 24 - padding;
  // Color is fully visible at the bottom and fades to ~5% opacity at the top.
  const fadeMask =
    "linear-gradient(to top, black 0%, rgba(0,0,0,0.05) 100%)";
  const [offsetX = 0, offsetY = 0] = palette.offset ?? [0, 0];

  return (
    <div
      className={cn(
        "rounded-[24px] overflow-clip relative bg-bg",
        className,
      )}
      style={{
        aspectRatio: aspect,
        padding: `${padding}px`,
        // Tiny inner border for depth
        boxShadow: "inset 0 0 0 1px rgba(9,9,11,0.03)",
      }}
    >
      {/* Mesh gradient placeholder (animated) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 motion-reduce:hidden"
        style={{
          filter: "blur(16px)",
          maskImage: fadeMask,
          WebkitMaskImage: fadeMask,
        }}
      >
        <MeshGradient
          colors={palette.colors}
          speed={0.18}
          distortion={0.75}
          swirl={0.45}
          grainMixer={0}
          grainOverlay={0}
          offsetX={offsetX}
          offsetY={offsetY}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Reduced-motion fallback — static linear gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden motion-reduce:block"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, oklab(80.2% 0 0 / 5%) 0%, oklab(80.2% 0 0 / 25%) 100%)",
        }}
      />

      {src ? (
        <img
          src={src}
          alt={alt ?? ""}
          className={cn(
            "relative z-10 block h-full w-full object-cover",
            innerClassName,
          )}
          style={{ borderRadius: `${innerRadius}px` }}
        />
      ) : children ? (
        <div
          className={cn(
            "relative z-10 h-full w-full overflow-clip",
            innerClassName,
          )}
          style={{ borderRadius: `${innerRadius}px` }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
