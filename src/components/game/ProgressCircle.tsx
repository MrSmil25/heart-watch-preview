import { useId } from "react";

type Props = {
  played: number;
  total: number;
  size?: number;
};

const MILESTONES = [0.25, 0.5, 0.75, 1];

export function ProgressCircle({ played, total, size = 140 }: Props) {
  const gradientId = useId();
  const fraction = total > 0 ? Math.min(played / total, 1) : 0;
  const stroke = size >= 90 ? 10 : 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const complete = played >= total;
  const big = size >= 90;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--apricot)" />
            <stop offset="100%" stopColor="var(--rose)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--peach)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - fraction)}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        />
        {/* titik milestone 10/20/30/40 (svg sudah -rotate-90) */}
        {MILESTONES.map((m) => {
          const angle = m * 2 * Math.PI;
          const cx = size / 2 + r * Math.cos(angle);
          const cy = size / 2 + r * Math.sin(angle);
          const reached = fraction >= m - 1e-9;
          const dotR = big ? 4 : 2;
          return (
            <circle
              key={m}
              cx={cx}
              cy={cy}
              r={dotR}
              fill={reached ? "var(--rose)" : "var(--white-warm)"}
              stroke={reached ? "var(--rose)" : "var(--border)"}
              strokeWidth={1.5}
              style={
                reached
                  ? { filter: "drop-shadow(0 0 4px rgba(224, 160, 144, 0.9))", transition: "fill 400ms ease" }
                  : { transition: "fill 400ms ease" }
              }
            />
          );
        })}
      </svg>
      {big ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display tabular-nums text-foreground" style={{ fontSize: "2.1rem", lineHeight: 1 }}>
            {played}
          </span>
          <span className="mt-1 text-[0.7rem] font-medium text-muted-foreground">dari {total}</span>
        </div>
      ) : (
        <span className="absolute font-display tabular-nums text-foreground" style={{ fontSize: "0.7rem" }}>
          {played}
        </span>
      )}
      {complete && big ? (
        <span aria-hidden className="animate-twinkle absolute -right-1 -top-1 text-xl text-rose">
          ✦
        </span>
      ) : null}
    </div>
  );
}
