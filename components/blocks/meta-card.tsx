type Row = { label: string; value: string };

export function MetaCard({ rows }: { rows: Row[] }) {
  return (
    <div className="flex h-fit flex-col self-start rounded-2xl outline outline-1 outline-rule-strong">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={
            "flex items-center gap-4 px-4 py-3" +
            (i < rows.length - 1 ? " border-b border-rule" : "")
          }
        >
          <span className="flex-1 font-mono text-[11px] md:text-[12px] leading-4 tracking-[0.1em] uppercase text-ink-subtle">
            {row.label}
          </span>
          <span className="text-[14px] md:text-[16px] leading-[1.5] text-ink">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
