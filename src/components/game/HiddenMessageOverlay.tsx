import { useEffect, useMemo, useState } from "react";
import { Bunny } from "./Bunny";

type Props = {
  nickname: string;
  onContinue: () => void;
  replay?: boolean;
};

const PARTICLE_COUNT = 16;
const SHAPES = ["♥", "✦"];

export function HiddenMessageOverlay({ nickname, onContinue, replay = false }: Props) {
  // urutan: redup → kelinci + amplop → flap terbuka → baris teks → tombol
  const [flapOpen, setFlapOpen] = useState(replay);
  const [linesShown, setLinesShown] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const base = replay ? 200 : 1600;
    const timers: number[] = [];
    if (!replay) {
      timers.push(window.setTimeout(() => setFlapOpen(true), base));
    }
    const lineGap = replay ? 350 : 600;
    const firstLine = replay ? 500 : base + 600;
    for (let i = 1; i <= 3; i++) {
      timers.push(window.setTimeout(() => setLinesShown(i), firstLine + (i - 1) * lineGap));
    }
    timers.push(window.setTimeout(() => setShowButton(true), firstLine + 3 * lineGap + (replay ? 400 : 2000)));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [replay]);

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        left: (i * 61) % 100,
        delay: (i * 0.9) % 7,
        duration: 9 + ((i * 1.7) % 6),
        shape: SHAPES[i % SHAPES.length],
        size: 10 + ((i * 5) % 10),
        color: i % 2 === 0 ? "var(--apricot)" : "var(--rose)",
        opacity: 0.35 + ((i * 13) % 25) / 100,
      })),
    [],
  );

  const lineClass = (n: number) =>
    linesShown >= n ? "animate-rise" : "opacity-0";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* veil hangat pekat supaya kartu di belakang nggak ganggu */}
      <div
        className="absolute inset-0 bg-background"
        style={{ animation: replay ? "fadeIn 300ms ease-out both" : "fadeIn 1s ease-out both" }}
      />

      {/* partikel lembut jatuh — salju hangat */}
      {particles.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className="animate-fall absolute top-0"
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

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <Bunny pose="envelope" className="size-30 drop-shadow-sm" hop={!replay} />

        {/* amplop besar dengan flap yang terbuka */}
        <div className="mt-6" style={{ perspective: "600px" }}>
          <div className="relative h-20 w-28">
            <div className="absolute inset-0 rounded-lg bg-cream soft-shadow ring-1 ring-rose/40" />
            <div
              className="absolute inset-x-0 top-0 h-10 origin-top rounded-t-lg bg-apricot ring-1 ring-rose/40 transition-transform duration-700 ease-out"
              style={{
                transform: flapOpen ? "rotateX(160deg)" : "rotateX(0deg)",
                transformOrigin: "top",
                backfaceVisibility: "visible",
              }}
            />
            <div className="absolute inset-x-0 bottom-2 flex justify-center">
              <span className="text-rose" aria-hidden>
                ♥
              </span>
            </div>
          </div>
        </div>

        <h2 className={`mt-8 font-display text-3xl leading-tight text-rose-deep ${lineClass(1)}`}>
          HAPPY BIRTHDAY NAYAAA
        </h2>
        <p className={`mt-4 text-[0.98rem] italic leading-relaxed text-foreground ${lineClass(2)}`}>
          I hope you are always happy, lucky and safe
        </p>
        <p className={`mt-3 text-sm text-muted-foreground ${lineClass(3)}`}>— from Syamil</p>

        {showButton ? (
          <button
            type="button"
            onClick={onContinue}
            className="animate-fade-in mt-10 w-full max-w-xs rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
          >
            {nickname ? `Lanjut, ${nickname}` : "Lanjut"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
