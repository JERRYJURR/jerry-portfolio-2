import Link from "next/link";
import { ArrowRight } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaFrame, type MediaPalette } from "@/components/ui/media-frame";

export type Stat = { value: string; label: string };

export type CaseStudyPalette = MediaPalette & {
  /** Hover ambient fill — low-alpha rgba/hex8 that complements the mesh. */
  ambient?: string;
  ambientActive?: string;
};

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
  const ambient = palette?.ambient ?? "#09090B05";
  const ambientActive = palette?.ambientActive ?? "#09090B08";

  return (
    <Link
      href={href}
      className="group relative block h-full focus-visible:outline-none"
      style={
        {
          ["--ambient" as string]: ambient,
          ["--ambient-active" as string]: ambientActive,
        } as React.CSSProperties
      }
    >
      {/* Ambient hover fill — extends 12px past edge, tinted from palette */}
      <span
        aria-hidden
        className="
          pointer-events-none absolute -inset-3 rounded-[28px] bg-transparent
          transition-colors duration-[var(--duration-medium)] ease-[var(--ease-standard)]
          group-hover:bg-[var(--ambient)]
          group-active:bg-[var(--ambient-active)]
        "
      />
      <div className="relative flex h-full flex-col">
        <MediaFrame
          aspect="16/9"
          padding={16}
          src={imageSrc}
          alt={headline}
          palette={palette}
        />
        <div className="flex flex-1 flex-col gap-8 px-6 pt-6 pb-3">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-2">
                <Eyebrow>{year}</Eyebrow>
                <Eyebrow className="text-ink-faint">·</Eyebrow>
                <Eyebrow>{project}</Eyebrow>
              </div>
              <ArrowRight
                className="
                  mt-px text-ink-faint
                  transition-transform duration-[var(--duration-medium)] ease-[var(--ease-standard)]
                  group-hover:translate-x-1 group-hover:text-ink
                "
              />
            </div>
            <h3 className="font-display text-[20px] leading-[1.45] text-ink">
              <span
                className="
                  bg-no-repeat bg-left-bottom bg-[length:0%_1px] bg-[linear-gradient(currentColor,currentColor)]
                  transition-[background-size] duration-[var(--duration-base)] ease-[var(--ease-standard)]
                  group-hover:bg-[length:100%_1px] pb-px
                "
              >
                {headline}
              </span>
            </h3>
          </div>
          <div className="flex flex-col gap-1.5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-baseline gap-3"
              >
                <div className="font-display text-[15px] font-medium text-ink-muted tabular-nums">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] leading-4 tracking-[0.1em] uppercase text-ink-subtle">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
