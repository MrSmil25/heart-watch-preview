import { Bunny } from "./Bunny";

type Props = {
  nickname: string;
  onContinue: () => void;
};

export function HiddenMessageOverlay({ nickname, onContinue }: Props) {
  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6 text-center">
      <Bunny pose="happy" className="size-40" hop />
      <p className="animate-rise mt-6 text-2xl text-foreground">
        Yey, keren banget {nickname || "kamu"} 🐰
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Setengah jalan nih — 15 kartu udah kamu lewatin.
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="mt-8 w-full max-w-xs rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
      >
        Lanjut
      </button>
    </div>
  );
}
