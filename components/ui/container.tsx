import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="w-full px-6 md:px-12">
      <div className={cn("w-full max-w-[1024px] mx-auto", className)}>
        {children}
      </div>
    </div>
  );
}
