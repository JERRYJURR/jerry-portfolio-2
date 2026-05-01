import { CountUp } from "@/components/ui/count-up";
import { StripeBand } from "@/components/ui/stripe-band";

type Stat = { value: string; label: string };

export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <section aria-label="Stats" className="flex flex-col">
      <StripeBand />
      <div>
        <div className="px-6 md:px-12">
          <div className="mx-auto grid w-full max-w-[1024px] grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  "flex flex-col gap-6 p-6 border-r border-rule" +
                  (i % 2 === 0 ? " border-l" : "") +
                  (i < 2 ? " border-b md:border-b-0 border-rule" : "") +
                  (i === 0 ? " md:border-l" : "")
                }
              >
                <div className="font-display text-[32px] font-normal tracking-[-0.05em] leading-none text-ink tabular-nums">
                  <CountUp value={stat.value} />
                </div>
                <div className="font-mono text-[13px] leading-4 tracking-[0.1em] uppercase text-ink-subtle">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <StripeBand />
    </section>
  );
}
