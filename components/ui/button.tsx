import { cn } from "@/lib/cn";

type Variant = "filled" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center gap-1 whitespace-nowrap rounded-full font-medium " +
  "outline-1 outline-rule-strong shadow-[var(--shadow-chip)] " +
  "transition-[box-shadow,background-color,color] " +
  "duration-[var(--duration-medium)] ease-[var(--ease-out)] " +
  "hover:shadow-[var(--shadow-chip-hover)] " +
  "active:opacity-90 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
  "disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  filled: "bg-accent text-on-accent hover:bg-accent-hover",
  outline: "bg-bg text-ink hover:bg-[#FAFAFA]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[14px]",
  md: "h-10 px-4 text-[16px]",
  lg: "h-12 px-5 text-[18px] gap-1.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
};

export function Button(
  props:
    | (CommonProps & { href: string; target?: string; rel?: string })
    | (CommonProps &
        React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }),
) {
  const { variant = "filled", size = "md", className, children } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <a href={props.href} target={props.target} rel={props.rel} className={cls}>
        {children}
      </a>
    );
  }
  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

const ICON_TRANSITION =
  "transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]";

/** Adds a hover translate that's triggered by the closest `group/btn` parent. */
function motionClass(motion?: "btn-x" | "btn-y-down" | "btn-y-up") {
  if (motion === "btn-x")
    return `${ICON_TRANSITION} group-hover/btn:translate-x-0.5`;
  if (motion === "btn-y-down")
    return `${ICON_TRANSITION} group-hover/btn:translate-y-0.5`;
  if (motion === "btn-y-up")
    return `${ICON_TRANSITION} group-hover/btn:-translate-y-0.5`;
  return undefined;
}

type IconMotion = "btn-x" | "btn-y-down" | "btn-y-up";

export function ArrowRight({
  className,
  motion,
}: {
  className?: string;
  motion?: IconMotion;
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("flex-shrink-0", motionClass(motion), className)}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ArrowDown({
  className,
  motion,
}: {
  className?: string;
  motion?: IconMotion;
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("flex-shrink-0", motionClass(motion), className)}
    >
      <path d="M12 15V3" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}
