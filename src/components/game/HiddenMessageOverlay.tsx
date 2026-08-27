import { Bunny } from "./Bunny";

type Props = {
  nickname: string;
  onContinue: () => void;
};

export function HiddenMessageOverlay({ nickname, onContinue }: Props) {
  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="animate-rise">
        <Bunny pose="happy" className="size-40 drop-shadow-sm" hop />
      </div>
      <h2 className="animate-rise mt-6 font-display text-3xl leading-tight text-rose">
        HAPPY BIRTHDAY NAYAAA
      </h2>
      <p className="animate-rise mt-3 text-[0.95rem] leading-relaxed text-foreground">
        I hope you are always happy, lucky and safe
      </p>
      <p className="animate-rise mt-2 text-sm italic text-muted-foreground">- from Syamil</p>
      <span aria-hidden className="animate-twinkle mt-4 text-2xl text-rose">
        ✦
      </span>
      <button
        type="button"
        onClick={onContinue}
        className="mt-8 w-full max-w-xs rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
      >
        {nickname ? `Lanjut, ${nickname}` : "Lanjut"}
      </button>
    </div>
  );
}
