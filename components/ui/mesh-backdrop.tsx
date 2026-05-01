"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { cn } from "@/lib/cn";

export type MeshBackdropProps = {
  colors: string[];
  offset?: [number, number];
  speed?: number;
  blur?: number;
  /** Direction of the bottom-anchored fade. Defaults to "up". */
  fade?: "up" | "down";
  /** Override the mask entirely. */
  maskImage?: string;
  className?: string;
};

/**
 * Page-scale animated mesh gradient placed behind a section's content.
 * Heavily blurred, masked to fade out in one direction, hidden under
 * `prefers-reduced-motion`. Wrap in a `relative isolate` parent and put
 * content above with `relative` (or explicit z) so the mesh stays behind.
 */
export function MeshBackdrop({
  colors,
  offset = [0, 0],
  speed = 0.1,
  blur = 48,
  fade = "up",
  maskImage,
  className,
}: MeshBackdropProps) {
  const computedMask =
    maskImage ??
    (fade === "up"
      ? "linear-gradient(to top, black 0%, transparent 80%)"
      : "linear-gradient(to bottom, black 0%, transparent 80%)");

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 motion-reduce:hidden",
        className,
      )}
      style={{
        filter: `blur(${blur}px)`,
        maskImage: computedMask,
        WebkitMaskImage: computedMask,
      }}
    >
      <MeshGradient
        colors={colors}
        speed={speed}
        distortion={0.7}
        swirl={0.4}
        grainMixer={0}
        grainOverlay={0}
        offsetX={offset[0]}
        offsetY={offset[1]}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
