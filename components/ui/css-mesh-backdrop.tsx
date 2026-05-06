"use client";

import { cn } from "@/lib/cn";
import type { MeshBackdropProps } from "./mesh-backdrop";

export type { MeshBackdropProps };

const BLOBS = [
  { anim: "mesh-float-1", base: 25, delay: "0s",    top: "-20%", left: "-10%", size: "70%" },
  { anim: "mesh-float-2", base: 30, delay: "-8s",   top: "30%",  left: "50%",  size: "65%" },
  { anim: "mesh-float-3", base: 22, delay: "-15s",  top: "55%",  left: "10%",  size: "75%" },
  { anim: "mesh-float-4", base: 28, delay: "-5s",   top: "-10%", left: "58%",  size: "60%" },
  { anim: "mesh-float-5", base: 35, delay: "-20s",  top: "40%",  left: "28%",  size: "65%" },
] as const;

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

  // Scale animation durations inversely with speed (speed=0.1 → ~25s base)
  const speedScale = 0.1 / Math.max(speed, 0.01);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden motion-reduce:hidden",
        className,
      )}
      style={{
        filter: `blur(${blur}px)`,
        maskImage: computedMask,
        WebkitMaskImage: computedMask,
        transform:
          offset[0] || offset[1]
            ? `translate(${offset[0] * 30}%, ${offset[1] * 30}%)`
            : undefined,
      }}
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: blob.top,
            left: blob.left,
            width: blob.size,
            aspectRatio: "1",
            borderRadius: "50%",
            backgroundColor: colors[i % colors.length],
            animation: `${blob.anim} ${(blob.base * speedScale).toFixed(1)}s ${blob.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
