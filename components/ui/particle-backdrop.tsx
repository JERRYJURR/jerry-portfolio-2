"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

/**
 * Subtle particle field background. Lazy-loaded (no SSR) so Three.js
 * doesn't block first paint. Renders nothing until the canvas chunk
 * arrives — by design, no static fallback.
 */
const Canvas = dynamic(() => import("./particle-backdrop-canvas"), {
  ssr: false,
  loading: () => null,
});

export function ParticleBackdrop(
  props: ComponentProps<typeof Canvas>,
) {
  return <Canvas {...props} />;
}
