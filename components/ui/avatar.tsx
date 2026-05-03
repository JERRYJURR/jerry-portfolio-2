import { cn } from "@/lib/cn";

const sizes = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-30 w-30",
} as const;

export function Avatar({
  src,
  alt,
  size = "sm",
  className,
}: {
  src?: string;
  alt?: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      style={src ? { backgroundImage: `url(${src})` } : undefined}
      className={cn(
        "rounded-full bg-cover bg-center shrink-0",
        "shadow-[var(--shadow-avatar)]",
        // Subtle gradient fallback when no src
        !src && "bg-[linear-gradient(135deg,#D4D4D8,#71717A)]",
        sizes[size],
        className,
      )}
    />
  );
}
