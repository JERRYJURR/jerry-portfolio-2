import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-mono text-[12px] leading-4 tracking-[0.1em] uppercase text-ink-subtle",
        className,
      )}
    >
      {children}
    </div>
  );
}
