import { categoryColor } from "@/data/cards";

type Props = {
  current: number;
  total: number;
  category: string;
  categoryKey?: string;
};

export function ProgressBar({ current, total, category, categoryKey }: Props) {
  const pct = (current / total) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span className={`rounded-full px-3 py-1 ${categoryColor(categoryKey ?? "")}`}>
          {category}
        </span>
        <span>
          Kartu {current} / {total}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-rose transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
