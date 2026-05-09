import Link from "next/link";
import type { StaticImageData } from "next/image";
import { ArrowRight } from "@/components/ui/button";
import { CaseImage } from "@/components/ui/case-image";
import type { MediaPalette } from "@/components/ui/media-frame";

// Thumb height. Picked so the container aspect-ratio is >= the widest case
// study thumb (xai-thumb, aspect 1.83). That way object-cover always crops
// vertically (top stays, bottom clips) — never sideways.
//   desktop inner_w ≈ 416 → max-aspect-allowed h ≈ 227 → 220 leaves headroom
//   mobile  inner_w ≈ 296 → max-aspect-allowed h ≈ 162 → 160 leaves headroom
const THUMB_HEIGHT_DESKTOP = 220;
const THUMB_HEIGHT_MOBILE = 160;

export function NextCaseCard({
  href,
  headline,
  imageSrc,
  palette,
}: {
  href: string;
  headline: string;
  imageSrc?: StaticImageData;
  palette?: MediaPalette;
}) {
  return (
    <Link
      href={href}
      className="group relative block focus-visible:outline-none"
    >
      <div
        className="
          relative flex flex-col md:flex-row gap-4 md:gap-16 rounded-3xl overflow-clip
          bg-[linear-gradient(in_oklab_180deg,oklab(80.2%_0_0_/_5%)_0%,oklab(80.2%_0_0_/_10%)_100%)]
        "
      >
        <span
          aria-hidden
          className="
            pointer-events-none absolute inset-0 bg-[#09090B]
            opacity-0 transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-standard)]
            group-hover:opacity-[0.03]
            group-active:opacity-[0.05]
          "
        />
        <div className="relative flex flex-1 flex-col justify-between gap-3 md:gap-4 p-4 md:p-6 order-2 md:order-1">
          <h3 className="font-display text-[24px] md:text-[32px] font-normal tracking-[-0.05em] leading-none text-ink">
            Next
          </h3>
          <p className="text-[16px] md:text-[20px] leading-[1.5] text-ink-muted">
            {headline}
          </p>
          <div className="flex items-center gap-1">
            <span className="font-display text-[15px] md:text-[16px] font-medium text-ink">
              <span
                className="
                  bg-no-repeat bg-left-bottom bg-[length:0%_1px] bg-[linear-gradient(currentColor,currentColor)]
                  transition-[background-size] duration-[var(--duration-base)] ease-[var(--ease-standard)]
                  group-hover:bg-[length:100%_1px] pb-px
                "
              >
                Read case study
              </span>
            </span>
            <ArrowRight
              className="
                text-ink-faint
                transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]
                group-hover:translate-x-1 group-hover:text-ink
              "
            />
          </div>
        </div>
        <div className="relative flex-1 order-1 md:order-2">
          <CaseImage
            src={imageSrc}
            alt={headline}
            palette={palette}
            aspect="4/3"
            padding={32}
            hoverScale
            bleed
            bleedHeight={`clamp(${THUMB_HEIGHT_MOBILE}px, 28.6vw, ${THUMB_HEIGHT_DESKTOP}px)`}
            sizes="(max-width: 768px) 100vw, 512px"
          />
        </div>
      </div>
    </Link>
  );
}
