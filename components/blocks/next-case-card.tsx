import Link from "next/link";
import { ArrowRight } from "@/components/ui/button";
import { MediaFrame, type MediaPalette } from "@/components/ui/media-frame";

export function NextCaseCard({
  href,
  headline,
  imageSrc,
  palette,
}: {
  href: string;
  headline: string;
  imageSrc?: string;
  palette?: MediaPalette;
}) {
  return (
    <Link
      href={href}
      className="group relative block focus-visible:outline-none"
    >
      <div
        className="
          relative flex gap-16 rounded-3xl p-4 overflow-clip
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
        <div className="relative flex flex-1 flex-col justify-between gap-4 p-6">
          <h3 className="font-display text-[32px] font-normal tracking-[-0.05em] leading-none text-ink">
            Next
          </h3>
          <p className="text-[20px] leading-[1.5] text-ink-muted">
            {headline}
          </p>
          <div className="flex items-center gap-1">
            <span className="font-display text-[16px] font-medium text-ink">
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
        <div className="relative flex-1">
          <MediaFrame
            aspect="4/3"
            padding={16}
            src={imageSrc}
            alt={headline}
            palette={palette}
            className="!rounded-2xl h-full"
          />
        </div>
      </div>
    </Link>
  );
}
