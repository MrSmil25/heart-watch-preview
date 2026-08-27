type Props = {
  played: number;
  total: number;
  size?: number;
};

export function ProgressCircle({ played, total, size = 120 }: Props) {
  const steps = Math.min(Math.floor(played / 10), 3);
  const fraction = steps / 3;
  const stroke = size >= 90 ? 10 : 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const complete = played >= total;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--lavender)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--rose)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - fraction)}
          style={{ transition: "stroke-dashoffset 800ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <span
        className="absolute font-display tabular-nums text-foreground"
        style={{ fontSize: size >= 90 ? "1.35rem" : "0.7rem" }}
      >
        {played}/{total}
      </span>
      {complete ? (
        <span
          aria-hidden
          className="animate-twinkle absolute -right-1 -top-1 text-lg text-rose"
          style={{ fontSize: size >= 90 ? "1.25rem" : "0.8rem" }}
        >
          ✦
        </span>
      ) : null}
    </div>
  );
}
