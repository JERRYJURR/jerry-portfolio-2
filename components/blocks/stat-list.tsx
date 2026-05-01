type Stat = { value: string; label: string };

export function StatList({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex h-fit flex-col self-start rounded-2xl outline outline-1 outline-rule-strong">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={
            "flex flex-col gap-4 p-6" +
            (i < stats.length - 1 ? " border-b border-rule" : "")
          }
        >
          <div className="font-display text-[40px] font-normal tracking-[-0.05em] leading-none text-ink tabular-nums">
            {stat.value}
          </div>
          <div className="font-mono text-[13px] leading-4 tracking-[0.1em] uppercase text-ink-subtle">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
