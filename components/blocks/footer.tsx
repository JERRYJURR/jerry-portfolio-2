import Image from "next/image";
import { StripeBand } from "@/components/ui/stripe-band";

export function Footer() {
  return (
    <footer className="flex flex-col">
      {/* Stripe above the profile area is rendered by the page so this footer
          is just the copyright sandwich at the very bottom. */}
      <StripeBand />
      <div>
        <div className="px-6 md:px-12">
          <div className="mx-auto w-full max-w-[1024px] border-x border-rule">
            <div className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
              <div className="font-mono text-[11px] leading-4 tracking-[0.1em] uppercase text-ink-subtle">
                © 2026 Jerry Kou. All rights reserved.
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:gap-8">
                <div className="flex items-center gap-2">
                  <Image
                    src="/paper.png"
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 rounded shadow-[0_2px_3px_#00000033]"
                  />
                  <span className="font-mono text-[11px] leading-4 tracking-[0.1em] uppercase text-ink-subtle">
                    Designed with Paper
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/claude-code.png"
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 rounded shadow-[0_2px_3px_#00000033]"
                  />
                  <span className="font-mono text-[11px] leading-4 tracking-[0.1em] uppercase text-ink-subtle">
                    Built with Claude Code
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StripeBand />
    </footer>
  );
}
