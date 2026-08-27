import { useEffect } from "react";
import { Bunny } from "./Bunny";

type Props = {
  onDone: () => void;
};

const TITLE = "Baca Aku";

export function SplashScreen({ onDone }: Props) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 2200);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <button
      type="button"
      onClick={onDone}
      aria-label="Lanjut"
      className="flex w-full cursor-pointer flex-col items-center py-16 text-center"
    >
      <Bunny pose="wave" className="size-30" hop />
      <h1 className="mt-6 text-5xl text-foreground" aria-label={TITLE}>
        {TITLE.split("").map((ch, i) => (
          <span
            key={i}
            aria-hidden
            className="animate-letter inline-block"
            style={{ animationDelay: `${300 + i * 40}ms` }}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </h1>
      <p
        className="animate-fade-in mt-3 text-[0.95rem] text-muted-foreground"
        style={{ animationDelay: "800ms" }}
      >
        Belajar baca yang tersembunyi
      </p>
    </button>
  );
}
