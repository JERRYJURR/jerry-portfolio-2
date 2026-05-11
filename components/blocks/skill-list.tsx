import {
  Lightbulb,
  Smile,
  Zap,
  Sparkles,
  Code2,
  LayoutGrid,
  Search,
  PieChart,
  LineChart,
} from "lucide-react";

const skills = [
  { icon: Lightbulb, label: "Rapid prototyping" },
  { icon: Smile, label: "User experience design" },
  { icon: Zap, label: "Interaction + motion design" },
  { icon: Sparkles, label: "AI concepting + prototyping" },
  { icon: Code2, label: "Frontend development" },
  { icon: LayoutGrid, label: "Design systems" },
  { icon: Search, label: "User research + testing" },
  { icon: PieChart, label: "Product strategy" },
  { icon: LineChart, label: "Data visualization" },
];

export function SkillList() {
  return (
    <div className="flex flex-col rounded-2xl outline outline-1 outline-rule-strong">
      {skills.map((skill, i) => {
        const Icon = skill.icon;
        return (
          <div
            key={skill.label}
            className={
              "flex items-center gap-4 px-4 py-3 md:px-6 md:py-6" +
              (i < skills.length - 1 ? " border-b border-rule" : "")
            }
          >
            <Icon
              className="shrink-0 text-ink-faint"
              size={24}
              strokeWidth={2}
            />
            <span className="font-display text-[14px] md:text-[20px] leading-none text-ink">
              {skill.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
