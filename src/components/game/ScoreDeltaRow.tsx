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
    { label: "Insight", value: insight, tone: "lavender" as const },
    { label: "Empathy", value: empathy, tone: "sage" as const },
    { label: "Social Damage", value: socialDamage, tone: "peach" as const },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item.label}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
            item.tone === "lavender" && "bg-lavender/70 text-lavender-foreground",
            item.tone === "sage" && "bg-sage/70 text-sage-foreground",
            item.tone === "peach" && "bg-peach/80 text-peach-foreground",
          )}
        >
          {item.label}
          <span className="rounded-full bg-card/70 px-1.5 py-0.5 tabular-nums">
            {fmt(item.value)}
          </span>
        </span>
      ))}
    </div>
  );
}
