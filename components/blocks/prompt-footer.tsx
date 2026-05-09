"use client";

import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import paperIcon from "@/public/paper.png";
import claudeCodeIcon from "@/public/claude-code.png";
import { ArrowRight, Button } from "@/components/ui/button";
import { StripeBand } from "@/components/ui/stripe-band";
import { LINKS } from "@/lib/links";

const swapBase =
  "transition-[opacity,color] duration-[320ms] ease-[var(--ease-in-out)]";

/**
 * "Want to collaborate?" + Book a call / Copy email + copyright stripes.
 * Used at the bottom of case study pages.
 */
export function PromptFooter() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Best-effort; do nothing if clipboard unavailable.
    }
  };

  return (
    <footer className="flex flex-col">
      <StripeBand />
      <div className="px-4 md:px-12">
        <div className="mx-auto w-full max-w-[1024px] border-x border-rule">
          <div className="flex flex-col items-center gap-4 py-12">
            <p className="font-display text-[20px] leading-[1.5] text-ink-muted text-center">
              Want to collaborate?
              <br />
              Let&rsquo;s connect.
            </p>
            <div className="flex gap-2">
            <Button
              variant="filled"
              size="md"
              href={LINKS.calendar}
              target="_blank"
              rel="noopener"
            >
              Book a call
              <ArrowRight motion="btn-x" />
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={onCopy}
              className="transition-transform"
              style={{
                transform: copied ? "scale(1.04)" : undefined,
              }}
              aria-label="Copy email address"
            >
              <span className="relative grid">
                <span
                  className={`${swapBase} col-start-1 row-start-1 text-ink ${copied ? "opacity-0" : "opacity-100"}`}
                >
                  Copy email
                </span>
                <span
                  className={`${swapBase} col-start-1 row-start-1 text-success ${copied ? "opacity-100" : "opacity-0"}`}
                >
                  Copied
                </span>
              </span>
              <span className="relative grid h-4 w-4 shrink-0">
                <Copy
                  className={`${swapBase} col-start-1 row-start-1 h-4 w-4 text-ink-faint transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:text-ink ${copied ? "opacity-0" : "opacity-100"}`}
                  strokeWidth={2}
                />
                <Check
                  className={`${swapBase} col-start-1 row-start-1 h-4 w-4 text-success ${copied ? "opacity-100" : "opacity-0"}`}
                  strokeWidth={2.5}
                />
              </span>
            </Button>
          </div>
          </div>
        </div>
      </div>
      <StripeBand />
      <div className="px-4 md:px-12">
        <div className="mx-auto w-full max-w-[1024px] border-x border-rule">
          <div className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
            <div className="font-mono text-[11px] leading-4 tracking-[0.1em] uppercase text-ink-subtle">
              © 2026 Jerry Kou. All rights reserved.
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-8">
              <div className="flex items-center gap-2">
                <Image
                  src={paperIcon}
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 rounded-[4px]"
                />
                <span className="font-mono text-[11px] leading-4 tracking-[0.1em] uppercase text-ink-subtle translate-y-px">
                  Designed with Paper
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={claudeCodeIcon}
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 rounded-[4px]"
                />
                <span className="font-mono text-[11px] leading-4 tracking-[0.1em] uppercase text-ink-subtle translate-y-px">
                  Built with Claude Code
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StripeBand />
    </footer>
  );
}
