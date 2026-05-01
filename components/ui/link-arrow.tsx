import Link from "next/link";
import { ArrowRight } from "./button";
import { cn } from "@/lib/cn";

export function LinkArrow({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[16px] font-medium text-ink",
        "transition-colors duration-[var(--duration-quick)] ease-[var(--ease-standard)]",
        className,
      )}
    >
      <span
        className={cn(
          "bg-no-repeat bg-left-bottom bg-[length:0%_1px] bg-[linear-gradient(currentColor,currentColor)]",
          "transition-[background-size] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
          "group-hover:bg-[length:100%_1px] pb-px",
        )}
      >
        {children}
      </span>
      <ArrowRight
        className={cn(
          "text-ink-faint transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]",
          "group-hover:translate-x-1 group-hover:text-ink",
        )}
      />
    </Link>
  );
}
