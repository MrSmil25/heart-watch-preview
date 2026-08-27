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

  return (
    <div className="animate-rise surface-card space-y-5 px-5 py-6">
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

      <div className="rounded-2xl bg-cream px-4 py-4">
        <p className="text-[0.92rem] leading-relaxed text-foreground">
          {state.nickname || "kamu"}, kamu udah main{" "}
          <span className="font-display text-lg text-rose">{played}</span> kartu dari {totalCards}.
        </p>
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl bg-cream px-4 py-3.5">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-lavender/70 px-3 py-1 text-xs font-semibold text-lavender-foreground">
              Insight
            </span>
            <span className="font-display text-2xl tabular-nums text-foreground">
              {state.totalScore.insight > 0 ? `+${state.totalScore.insight}` : state.totalScore.insight}
            </span>
          </div>
        </div>
        <div className="rounded-2xl bg-cream px-4 py-3.5">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-sage/70 px-3 py-1 text-xs font-semibold text-sage-foreground">
              Empathy
            </span>
            <span className="font-display text-2xl tabular-nums text-foreground">
              {state.totalScore.empathy > 0 ? `+${state.totalScore.empathy}` : state.totalScore.empathy}
            </span>
          </div>
        </div>
        <div className="rounded-2xl bg-cream px-4 py-3.5">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-peach/80 px-3 py-1 text-xs font-semibold text-peach-foreground">
              Social Damage
            </span>
            <span className="font-display text-2xl tabular-nums text-foreground">
              {state.totalScore.socialDamage > 0 ? `+${state.totalScore.socialDamage}` : state.totalScore.socialDamage}
            </span>
          </div>
        </div>
      </div>

      {top ? (
        <p className="text-sm text-muted-foreground">
          Kategori paling sering kamu mainin:{" "}
          <span className="font-semibold text-foreground">{categoryLabel(top)}</span>
        </p>
      ) : null}

      {personaUnlocked ? (
        <div className="animate-rise space-y-4 rounded-2xl bg-lavender/30 px-5 py-6 text-center">
          <Bunny pose="thinking" className="mx-auto size-24" />
          <h2 className="text-2xl text-rose">{persona.name}</h2>
          <p className="text-[0.92rem] leading-relaxed text-muted-foreground">
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
        <p className="rounded-2xl bg-cream px-4 py-4 text-center text-sm text-muted-foreground">
          Terus main biar aku bisa kenalin kamu lebih dalam ✨
        </p>
      )}
    </div>
  );
}
