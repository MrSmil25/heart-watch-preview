import { TwistBadge } from "./TwistBadge";

type Props = {
  correct: boolean;
  reasoning: string;
  twist: boolean;
};

export function ReasoningPanel({ correct, reasoning, twist }: Props) {
  return (
    <div className="animate-rise space-y-3 rounded-2xl bg-cream px-4 py-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-foreground">
          {correct ? "Pas banget ✿" : "Belum pas, tapi wajar kok"}
        </span>
        {twist ? <TwistBadge /> : null}
      </div>
      {twist ? (
        <p className="text-xs leading-relaxed text-muted-foreground">
          Kartu twist: jawaban yang bener justru pembacaan paling apa adanya. Nggak semua orang
          punya maksud tersembunyi.
        </p>
      ) : null}
      <p className="text-[0.92rem] leading-relaxed text-muted-foreground">{reasoning}</p>
    </div>
  );
}
