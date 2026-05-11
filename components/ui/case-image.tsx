"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  className,
  zoomable = true,
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
  /** Extra classes merged into the outer wrapper. */
  className?: string;
  /** Mobile tap-to-zoom (button + lightbox). Set false to opt out. */
  zoomable?: boolean;
}) {
  const colors = palette?.colors ?? FALLBACK_COLORS;
  const [offsetX = 0, offsetY = 0] = palette?.offset ?? [];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const canZoom = zoomable && !!src;

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
  //
  // `minHeight: 0` is REQUIRED whenever we set `aspect-ratio`. Without it, the
  // box's default `min-height: auto` lets the image's intrinsic height push
  // the inner div larger than the aspect-ratio's computed height, which kills
  // the bleed entirely (the container just hugs the image bottom).
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
        innerStyle = {
          aspectRatio: `${innerWidthMax} / ${visible}`,
          minHeight: 0,
        };
      }
    }
  }

  return (
    <>
    <div
      className={cn("relative", mobilePaddingClass, className, canZoom && "cursor-zoom-in")}
      style={{
        borderRadius: 24,
        overflow: "clip",
        transform: "translateZ(0)",
        ...(outerPadding ? { padding: outerPadding } : {}),
        ...(src ? {} : { aspectRatio: aspect }),
      }}
      onClick={canZoom ? () => setLightboxOpen(true) : undefined}
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
              "w-full h-auto align-top",
              hoverScale &&
                "transition-transform duration-[var(--duration-medium)] ease-[var(--ease-standard)] group-hover:scale-[1.015]",
            )}
            style={{ filter: IMAGE_SHADOW }}
          />
        </div>
      )}

      {/* Mobile-only fullscreen affordance — sits above the mesh + image */}
      {canZoom && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          aria-label="Open image fullscreen"
          className="
            absolute top-3 right-3 z-10
            flex h-9 w-9 items-center justify-center
            rounded-full bg-bg outline-1 outline-rule-strong
            shadow-[var(--shadow-chip)]
            transition-[box-shadow] duration-[var(--duration-medium)] ease-[var(--ease-out)]
            hover:shadow-[var(--shadow-chip-hover)]
            md:hidden
          "
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" x2="14" y1="3" y2="10" />
            <line x1="3" x2="10" y1="21" y2="14" />
          </svg>
        </button>
      )}
    </div>
    {canZoom && lightboxOpen && (
      <Lightbox src={src!} alt={alt} onClose={() => setLightboxOpen(false)} />
    )}
    </>
  );
}

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: StaticImageData;
  alt: string;
  onClose: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  // Pinch/pan state lives in a ref so transient updates don't re-render.
  // Pointer Events unify mouse + touch; touch-action: none on the container
  // stops the browser from grabbing the gesture as page zoom / pull-to-refresh.
  const stateRef = useRef({
    scale: 1,
    tx: 0,
    ty: 0,
    pointers: new Map<number, { x: number; y: number }>(),
    startScale: 1,
    startTx: 0,
    startTy: 0,
    startDist: 0,
    startCx: 0,
    startCy: 0,
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const s = stateRef.current;

    const apply = () => {
      img.style.transform = `translate(${s.tx}px, ${s.ty}px) scale(${s.scale})`;
    };

    const onPointerDown = (e: PointerEvent) => {
      img.setPointerCapture(e.pointerId);
      s.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (s.pointers.size === 2) {
        const [p1, p2] = Array.from(s.pointers.values());
        s.startDist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        s.startScale = s.scale;
      } else if (s.pointers.size === 1) {
        s.startCx = e.clientX;
        s.startCy = e.clientY;
        s.startTx = s.tx;
        s.startTy = s.ty;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!s.pointers.has(e.pointerId)) return;
      s.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (s.pointers.size === 2) {
        const [p1, p2] = Array.from(s.pointers.values());
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        if (s.startDist > 0) {
          s.scale = Math.max(1, Math.min(4, s.startScale * (dist / s.startDist)));
          apply();
        }
      } else if (s.pointers.size === 1 && s.scale > 1) {
        const p = s.pointers.values().next().value!;
        s.tx = s.startTx + (p.x - s.startCx);
        s.ty = s.startTy + (p.y - s.startCy);
        apply();
      }
    };

    const onPointerEnd = (e: PointerEvent) => {
      s.pointers.delete(e.pointerId);
      // Pinch -> pan: re-anchor the remaining finger so the next drag isn't a jump.
      if (s.pointers.size === 1) {
        const p = s.pointers.values().next().value!;
        s.startCx = p.x;
        s.startCy = p.y;
        s.startTx = s.tx;
        s.startTy = s.ty;
      } else if (s.pointers.size === 0 && s.scale <= 1) {
        s.scale = 1;
        s.tx = 0;
        s.ty = 0;
        apply();
      }
    };

    img.addEventListener("pointerdown", onPointerDown);
    img.addEventListener("pointermove", onPointerMove);
    img.addEventListener("pointerup", onPointerEnd);
    img.addEventListener("pointercancel", onPointerEnd);
    return () => {
      img.removeEventListener("pointerdown", onPointerDown);
      img.removeEventListener("pointermove", onPointerMove);
      img.removeEventListener("pointerup", onPointerEnd);
      img.removeEventListener("pointercancel", onPointerEnd);
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      style={{ touchAction: "none", overscrollBehavior: "contain" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src.src}
        alt={alt}
        width={src.width}
        height={src.height}
        draggable={false}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full w-auto h-auto select-none"
        style={{
          touchAction: "none",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close fullscreen"
        className="
          fixed top-4 right-4
          flex h-10 w-10 items-center justify-center
          rounded-full bg-bg outline-1 outline-rule-strong
          shadow-[var(--shadow-chip)]
        "
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink"
        >
          <line x1="18" x2="6" y1="6" y2="18" />
          <line x1="6" x2="18" y1="6" y2="18" />
        </svg>
      </button>
    </div>,
    document.body,
  );
}
