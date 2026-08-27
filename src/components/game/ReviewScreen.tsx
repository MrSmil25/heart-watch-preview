import { useState } from "react";
import { cards, categoryLabel } from "@/data/cards";
import type { GameState } from "@/lib/gameState";

type Props = {
  state: GameState;
  onBack: () => void;
};

export function ReviewScreen({ state, onBack }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  const answered = state.answeredCards
    .map((a) => ({ answer: a, card: cards.find((c) => c.id === a.cardId) }))
    .filter((row): row is { answer: (typeof state.answeredCards)[number]; card: (typeof cards)[number] } =>
      Boolean(row.card),
    );

  return (
    <div className="animate-rise surface-card space-y-4 px-5 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-foreground">Baca ulang</h1>
        <button
          type="button"
          onClick={onBack}
          className="rounded-full bg-cream px-4 py-2 text-xs font-semibold text-muted-foreground"
        >
          Kembali
        </button>
      </div>

      {answered.length === 0 ? (
        <p className="rounded-2xl bg-cream px-4 py-6 text-center text-sm text-muted-foreground">
          Belum ada kartu yang kamu mainin. Main dulu yuk!
        </p>
      ) : (
        <div className="space-y-2.5">
          {answered.map(({ answer, card }) => {
            const open = openId === card.id;
            const picked = card.interpretations.find((i) => i.id === answer.interpretationChoice);
            const pickedResponse = card.responses.find((r) => r.id === answer.responseChoice);
            const bestResponse = card.responses.find((r) => r.isBest);
            return (
              <div key={card.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : card.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span>
                    <span className="block text-[0.9rem] font-semibold text-foreground">
                      Kartu {card.id}
                    </span>
                    <span className="text-xs text-muted-foreground">{categoryLabel(card.category)}</span>
                  </span>
                  <span className="text-muted-foreground">{open ? "−" : "+"}</span>
                </button>
                {open ? (
                  <div className="animate-rise space-y-3 px-4 pb-4 text-[0.9rem] leading-relaxed">
                    <p className="rounded-2xl bg-cream px-3 py-3 text-foreground">{card.situation}</p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Tafsir kamu: </span>
                      {picked?.text ?? "-"}{" "}
                      {picked?.isMostLikely ? "✿" : ""}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Reasoning: </span>
                      {card.reasoning}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Respons kamu: </span>
                      {pickedResponse?.text ?? "-"}
                    </p>
                    {pickedResponse?.feedback ? (
                      <p className="rounded-2xl bg-cream px-3 py-3 text-muted-foreground">
                        {pickedResponse.feedback}
                      </p>
                    ) : null}
                    <p className="rounded-2xl bg-sage/40 px-3 py-3 text-sage-foreground">
                      <span className="font-semibold">Respons terbaik: </span>
                      {bestResponse?.text ?? "-"}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
