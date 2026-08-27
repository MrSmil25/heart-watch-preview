import { categoryLabel } from "@/data/cards";
import type { GameState } from "@/lib/gameState";
import { strongestCategory, weakestCategory, topCategory } from "@/lib/gameState";
import { matchPersona, personaText } from "@/lib/personas";
import { Bunny } from "./Bunny";

type Props = {
  state: GameState;
  totalCards: number;
  onBack: () => void;
};

export function ProgressScreen({ state, totalCards, onBack }: Props) {
  const played = state.answeredCards.length;
  const full = played >= totalCards;
  const personaUnlocked = played >= 20;
  const persona = matchPersona(state.totalScore, played);

  const top = topCategory(state);
  const strongest = strongestCategory(state);
  const weakest = weakestCategory(state);

  const rows = [
    { key: "insight" as const, label: "Insight", value: state.totalScore.insight, tone: "bg-lavender/70 text-lavender-foreground", icon: "🧠" },
    { key: "empathy" as const, label: "Empathy", value: state.totalScore.empathy, tone: "bg-sage/70 text-sage-foreground", icon: "❤️" },
    { key: "socialDamage" as const, label: "Social Damage", value: state.totalScore.socialDamage, tone: "bg-peach/80 text-peach-foreground", icon: "" },
  ];

  return (
    <div className="animate-rise surface-card space-y-5 px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-foreground">Progress aku</h1>
        <button
          type="button"
          onClick={onBack}
          className="rounded-full bg-cream px-4 py-2 text-xs font-semibold text-muted-foreground"
        >
          Kembali
        </button>
      </div>

      <div className="rounded-2xl bg-cream px-5 py-4">
        <p className="text-[0.92rem] leading-relaxed text-foreground">
          {state.nickname || "kamu"}, kamu udah main{" "}
          <span className="font-display text-lg text-rose-deep">{played}</span> kartu dari {totalCards}.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {rows.map((row, i) => (
          <span
            key={row.key}
            className={`animate-chip inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold ${row.tone}`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {row.value > 0 ? `+${row.value}` : row.value} {row.label}
            {row.icon ? <span aria-hidden>{row.icon}</span> : null}
          </span>
        ))}
      </div>

      {top ? (
        <p className="text-sm text-muted-foreground">
          Kategori paling sering kamu mainin:{" "}
          <span className="font-semibold text-foreground">{categoryLabel(top)}</span>
        </p>
      ) : null}

      {personaUnlocked ? (
        <div className="animate-rise space-y-4 rounded-[28px] bg-lavender/30 px-5 py-6 text-center">
          <Bunny pose="magnifier" className="mx-auto size-24" />
          <h2 className="font-display text-2xl uppercase tracking-wide text-rose-deep" aria-label={persona.name}>
            {persona.name.split("").map((ch, i) => (
              <span
                key={i}
                aria-hidden
                className="animate-letter inline-block"
                style={{ animationDelay: `${200 + i * 40}ms` }}
              >
                {ch === " " ? " " : ch}
              </span>
            ))}
          </h2>
          <p className="rounded-[28px] bg-white-warm px-5 py-5 text-[0.92rem] leading-[1.75] text-muted-foreground soft-shadow">
            {personaText(persona, full, state.nickname)}
          </p>
          {strongest ? (
            <p className="text-xs text-muted-foreground">
              Paling jago di:{" "}
              <span className="font-semibold text-foreground">{categoryLabel(strongest)}</span>
            </p>
          ) : null}
          {weakest ? (
            <p className="text-xs text-muted-foreground">
              Masih perlu diasah:{" "}
              <span className="font-semibold text-foreground">{categoryLabel(weakest)}</span>
            </p>
          ) : null}
        </div>
      ) : (
        <p className="rounded-2xl bg-cream px-5 py-4 text-center text-sm text-muted-foreground">
          Terus main biar aku bisa kenalin kamu lebih dalam ✨
        </p>
      )}
    </div>
  );
}
