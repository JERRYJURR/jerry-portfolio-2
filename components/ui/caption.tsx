import { cn } from "@/lib/cn";

export function Caption({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-display text-[14px] md:text-[16px] leading-6 text-center text-ink-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
