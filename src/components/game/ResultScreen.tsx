import { categoryLabel } from "@/data/cards";
import type { GameState } from "@/lib/gameState";
import { strongestCategory, weakestCategory } from "@/lib/gameState";
import { matchPersona, personaText } from "@/lib/personas";
import { Bunny } from "./Bunny";

type Props = {
  state: GameState;
  totalCards: number;
  onRestart: () => void;
};

export function ResultScreen({ state, totalCards, onRestart }: Props) {
  const played = state.answeredCards.length;
  const persona = matchPersona(state.totalScore, played);
  const strongest = strongestCategory(state);
  const weakest = weakestCategory(state);

  const rows = [
    { key: "insight" as const, label: "Insight", value: state.totalScore.insight, tone: "bg-lavender/70 text-lavender-foreground" },
    { key: "empathy" as const, label: "Empathy", value: state.totalScore.empathy, tone: "bg-sage/70 text-sage-foreground" },
    {
      key: "socialDamage" as const,
      label: "Social Damage",
      value: state.totalScore.socialDamage,
      tone: "bg-peach/80 text-peach-foreground",
    },
  ];

  return (
    <div className="animate-rise surface-card space-y-6 px-6 py-8">
      <div className="text-center">
        <Bunny pose="happy" className="mx-auto size-28" hop />
        <span className="mt-4 inline-flex rounded-full bg-lavender/70 px-3 py-1 text-xs font-semibold text-lavender-foreground">
          {played} kartu selesai
        </span>
        <p className="mt-3 text-[0.92rem] leading-relaxed text-muted-foreground">
          {state.nickname || "Kamu"}, kamu udah selesai {totalCards} kartu. Ini gambaran lengkap
          tentang kamu ✨
        </p>
        <h1 className="mt-4 text-3xl text-rose">{persona.name}</h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
          {personaText(persona, true, state.nickname)}
        </p>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.key} className="rounded-2xl bg-cream px-4 py-3.5">
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${row.tone}`}>
                {row.label}
              </span>
              <span className="font-display text-2xl tabular-nums text-foreground">
                {row.value > 0 ? `+${row.value}` : row.value}
              </span>
            </div>
          </div>
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

      <p className="text-center text-xs text-muted-foreground">
        Mau main ulang? Kartu bakal diacak lagi biar tetep menantang.
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="w-full rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
      >
        Main lagi dari awal
      </button>
    </div>
  );
}
