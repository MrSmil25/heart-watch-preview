import { useMemo } from "react";
import { categoryLabel } from "@/data/cards";
import type { GameState } from "@/lib/gameState";
import { strongestCategory, weakestCategory } from "@/lib/gameState";
import { matchPersona, personaText } from "@/lib/personas";
import { Bunny } from "./Bunny";

type Props = {
  state: GameState;
  totalCards: number;
  onRestart: () => void;
  onDone: () => void;
};

const SHAPES = ["♥", "✦"];

function StaggeredName({ name }: { name: string }) {
  return (
    <h1 className="mt-4 font-display text-3xl uppercase tracking-wide text-rose-deep" aria-label={name}>
      {name.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="animate-letter inline-block"
          style={{ animationDelay: `${200 + i * 40}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </h1>
  );
}

export function ResultScreen({ state, totalCards, onRestart, onDone }: Props) {
  const played = state.answeredCards.length;
  const persona = matchPersona(state.totalScore, played);
  const strongest = strongestCategory(state);
  const weakest = weakestCategory(state);

  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        left: (i * 67) % 100,
        delay: (i * 1.1) % 6,
        duration: 10 + ((i * 1.3) % 5),
        shape: SHAPES[i % SHAPES.length],
        size: 9 + ((i * 4) % 8),
        color: i % 2 === 0 ? "var(--apricot)" : "var(--rose)",
        opacity: 0.3 + ((i * 11) % 20) / 100,
      })),
    [],
  );

  const rows = [
    { key: "insight" as const, label: "Insight", value: state.totalScore.insight, tone: "bg-lavender/70 text-lavender-foreground", icon: "🧠" },
    { key: "empathy" as const, label: "Empathy", value: state.totalScore.empathy, tone: "bg-sage/70 text-sage-foreground", icon: "❤️" },
    { key: "socialDamage" as const, label: "Social Damage", value: state.totalScore.socialDamage, tone: "bg-peach/80 text-peach-foreground", icon: "" },
  ];

  return (
    <div className="relative overflow-hidden rounded-[28px]">
      {particles.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className="animate-fall pointer-events-none absolute top-0 z-0"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: p.size,
            color: p.color,
            ["--fall-opacity" as string]: p.opacity,
          }}
        >
          {p.shape}
        </span>
      ))}

      <div className="animate-rise surface-card relative space-y-6 px-6 py-8">
        <div className="text-center">
          <Bunny pose="wave" className="mx-auto size-28" hop />
          <span className="mt-4 inline-flex rounded-full bg-lavender/70 px-3 py-1 text-xs font-semibold text-lavender-foreground">
            {played} kartu selesai
          </span>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-muted-foreground">
            {state.nickname || "Kamu"}, kamu udah selesai {totalCards} kartu. Ini gambaran lengkap
            tentang kamu ✨
          </p>
          <StaggeredName name={persona.name} />
          <p className="mt-3 rounded-[28px] bg-white-warm px-5 py-5 text-[0.95rem] leading-[1.75] text-muted-foreground soft-shadow">
            {personaText(persona, true, state.nickname)}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {rows.map((row, i) => (
            <span
              key={row.key}
              className={`animate-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${row.tone}`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {row.value > 0 ? `+${row.value}` : row.value} {row.label}
              {row.icon ? <span aria-hidden>{row.icon}</span> : null}
            </span>
          ))}
        </div>

        {strongest ? (
          <p className="text-center text-xs text-muted-foreground">
            Paling jago di:{" "}
            <span className="font-semibold text-foreground">{categoryLabel(strongest)}</span>
          </p>
        ) : null}
        {weakest ? (
          <p className="text-center text-xs text-muted-foreground">
            Masih perlu diasah:{" "}
            <span className="font-semibold text-foreground">{categoryLabel(weakest)}</span>
          </p>
        ) : null}

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onRestart}
            className="w-full rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
          >
            Main lagi dari awal
          </button>
          <button
            type="button"
            onClick={onDone}
            className="w-full rounded-2xl bg-cream px-6 py-3.5 font-semibold text-muted-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
