import { useMemo, useState } from "react";
import type { Card } from "@/data/cards";
import { categoryLabel } from "@/data/cards";
import type { Totals } from "@/lib/scoring";
import { LETTERS, shuffle } from "@/lib/shuffle";
import { OptionButton } from "./OptionButton";
import { ProgressBar } from "./ProgressBar";
import { ProgressCircle } from "./ProgressCircle";
import { ReasoningPanel } from "./ReasoningPanel";
import { ScoreDeltaRow } from "./ScoreDeltaRow";
import { SituationBlock } from "./SituationBlock";

type Props = {
  card: Card;
  index: number;
  total: number;
  played: number;
  isLast: boolean;
  nickname: string;
  hasMessage?: boolean;
  onOpenMessage?: () => void;
  onNext: (delta: Totals, interpretationChoice: string, responseChoice: string) => void;
  onStop: () => void;
};

export function CardStage({
  card,
  index,
  total,
  played,
  isLast,
  nickname,
  hasMessage = false,
  onOpenMessage,
  onNext,
  onStop,
}: Props) {
  const [pickedInterpretation, setPickedInterpretation] = useState<string | null>(null);
  const [pickedResponse, setPickedResponse] = useState<string | null>(null);
  const [showStop, setShowStop] = useState(false);

  const shuffledInterpretations = useMemo(() => shuffle(card.interpretations), [card]);
  const shuffledResponses = useMemo(() => shuffle(card.responses), [card]);

  const chosenInterpretation = card.interpretations.find((i) => i.id === pickedInterpretation);
  const chosenResponse = card.responses.find((r) => r.id === pickedResponse);

  return (
    <div className="surface-card space-y-6 px-5 py-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <ProgressBar
            current={Math.min(played + 1, total)}
            total={total}
            category={categoryLabel(card.category)}
          />
        </div>
        <div className="flex items-center gap-2">
          <ProgressCircle played={played} total={total} size={40} />
          {hasMessage && onOpenMessage ? (
            <button
              type="button"
              aria-label="Buka pesan tersembunyi"
              onClick={onOpenMessage}
              className="flex size-8 items-center justify-center rounded-full bg-peach text-peach-foreground"
            >
              ✉
            </button>
          ) : null}
          <button
            type="button"
            aria-label="Berhenti"
            onClick={() => setShowStop(true)}
            className="flex size-8 items-center justify-center rounded-full bg-cream text-muted-foreground transition-colors hover:text-foreground"
          >
            ✕
          </button>
        </div>
      </div>

      <SituationBlock situation={card.situation} question={card.question} />


      <div className="space-y-2.5">
        {shuffledInterpretations.map((option, i) => {
          const revealed = pickedInterpretation !== null;
          const isPicked = option.id === pickedInterpretation;
          let state: "idle" | "correct" | "wrong" = "idle";
          if (revealed && option.isMostLikely) state = "correct";
          else if (revealed && isPicked) state = "wrong";
          return (
            <OptionButton
              key={option.id}
              letter={LETTERS[i] ?? option.id}
              text={option.text}
              disabled={revealed}
              selected={isPicked}
              state={state}
              hint={revealed && option.isMostLikely ? "Salah satu tafsir paling mungkin" : undefined}
              onClick={() => setPickedInterpretation(option.id)}
            />
          );
        })}
      </div>

      {chosenInterpretation ? (
        <ReasoningPanel
          correct={chosenInterpretation.isMostLikely}
          reasoning={card.reasoning}
          twist={card.twist}
        />
      ) : null}

      {chosenInterpretation ? (
        <div className="animate-rise space-y-4">
          <h3 className="text-lg text-foreground">Terus kamu jawab apa?</h3>
          <div className="space-y-2.5">
            {shuffledResponses.map((option, i) => {
              const revealed = pickedResponse !== null;
              const isPicked = option.id === pickedResponse;
              let state: "idle" | "correct" | "wrong" | "best" = "idle";
              if (revealed && isPicked) state = option.isBest ? "correct" : "wrong";
              else if (revealed && option.isBest) state = "best";
              return (
                <OptionButton
                  key={option.id}
                  letter={LETTERS[i] ?? option.id}
                  text={option.text}
                  disabled={revealed}
                  selected={isPicked}
                  state={state}
                  hint={revealed && option.isBest ? "✿ respons paling pas" : undefined}
                  onClick={() => setPickedResponse(option.id)}
                />
              );
            })}
          </div>
        </div>
      ) : null}

      {chosenResponse ? (
        <div className="animate-rise space-y-3 rounded-2xl bg-cream px-4 py-4">
          <ScoreDeltaRow
            insight={chosenResponse.insight}
            empathy={chosenResponse.empathy}
            socialDamage={chosenResponse.socialDamage}
          />
          {chosenResponse.feedback ? (
            <p className="text-[0.92rem] leading-relaxed text-muted-foreground">
              {chosenResponse.feedback}
            </p>
          ) : null}
        </div>
      ) : null}

      {chosenResponse ? (
        <button
          type="button"
          onClick={() =>
            onNext(
              {
                insight: chosenResponse.insight,
                empathy: chosenResponse.empathy,
                socialDamage: chosenResponse.socialDamage,
              },
              pickedInterpretation ?? "",
              pickedResponse ?? "",
            )
          }
          className="animate-rise w-full rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
        >
          {isLast ? "Lihat hasilku" : "Kartu berikutnya"}
        </button>
      ) : null}

      {showStop ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/25 px-4 pb-6 pt-20 backdrop-blur-sm sm:items-center sm:pb-0">
          <div className="animate-rise surface-card relative w-full max-w-sm px-5 py-6 text-center">
            <button
              type="button"
              aria-label="Tutup"
              onClick={() => setShowStop(false)}
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-cream text-muted-foreground transition-colors hover:text-foreground"
            >
              ✕
            </button>
            <h2 className="pr-8 text-xl text-foreground">Berhenti dulu, {nickname || "kamu"}?</h2>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-muted-foreground">
              Progress kamu tersimpan kok.
            </p>
            <div className="mt-5 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowStop(false);
                  onStop();
                }}
                className="w-full rounded-2xl bg-sage px-6 py-3.5 font-semibold text-sage-foreground transition-transform duration-200 hover:-translate-y-0.5"
              >
                Lihat progress
              </button>
              <button
                type="button"
                onClick={() => setShowStop(false)}
                className="w-full rounded-2xl bg-cream px-6 py-3.5 font-semibold text-muted-foreground transition-transform duration-200 hover:-translate-y-0.5"
              >
                Lanjut main
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
