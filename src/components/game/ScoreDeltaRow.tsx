import { cn } from "@/lib/utils";

type Props = {
  insight: number;
  empathy: number;
  socialDamage: number;
};

function fmt(n: number) {
  return n > 0 ? `+${n}` : `${n}`;
}

export function ScoreDeltaRow({ insight, empathy, socialDamage }: Props) {
  const items = [
    { label: "Insight", value: insight, tone: "lavender" as const, icon: "🧠" },
    { label: "Empathy", value: empathy, tone: "sage" as const, icon: "❤️" },
    { label: "Social Damage", value: socialDamage, tone: "peach" as const, icon: "" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={item.label}
          className={cn(
            "animate-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
            item.tone === "lavender" && "bg-lavender/70 text-lavender-foreground",
            item.tone === "sage" && "bg-sage/70 text-sage-foreground",
            item.tone === "peach" && "bg-peach/80 text-peach-foreground",
          )}
          style={{ animationDelay: `${i * 120}ms` }}
        >
          {fmt(item.value)} {item.label}
          {item.icon ? <span aria-hidden>{item.icon}</span> : null}
        </span>
      ))}
    </div>
  );
}
