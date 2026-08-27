import { useEffect, useState } from "react";
import { categoryColor, categoryLabels } from "@/data/cards";
import type { GameState } from "@/lib/gameState";
import { Bunny } from "./Bunny";
import { ProgressCircle } from "./ProgressCircle";

type Props = {
  state: GameState;
  totalCards: number;
  onPlay: () => void;
  onPlayCategory: (category: string) => void;
  onReview: () => void;
  onProgress: () => void;
  onRename: () => void;
  onReset: () => void;
  onOpenMessage: () => void;
};

function greetingFor(hour: number, name: string) {
  if (hour >= 4 && hour < 11) return `Pagi, ${name} ☀️`;
  if (hour >= 11 && hour < 15) return `Siang, ${name}`;
  if (hour >= 15 && hour < 18) return `Sore, ${name}`;
  if (hour >= 18 && hour < 22) return `Malam, ${name} 🌙`;
  return `Belum tidur, ${name}?`;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function HomeScreen({
  state,
  totalCards,
  onPlay,
  onPlayCategory,
  onReview,
  onProgress,
  onRename,
  onReset,
  onOpenMessage,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pickCategory, setPickCategory] = useState(false);
  const played = state.answeredCards.length;
  const hasProgress = played > 0;
  const done = played >= totalCards;
  const name = state.nickname || "kamu";

  const awayLong =
    state.lastPlayedAt !== null && Date.now() - new Date(state.lastPlayedAt).getTime() > DAY_MS;
  const [welcomeBack, setWelcomeBack] = useState(awayLong);

  useEffect(() => {
    if (!welcomeBack) return;
    const t = window.setTimeout(() => setWelcomeBack(false), 4000);
    return () => window.clearTimeout(t);
  }, [welcomeBack]);

  const greeting = welcomeBack
    ? `Selamat datang balik, ${name} 🐰`
    : greetingFor(new Date().getHours(), name);

  return (
    <div className="relative px-2 py-6 text-center">
      {/* gear kecil kiri atas, amplop kanan atas */}
      <div className="absolute left-0 top-0">
        <button
          type="button"
          aria-label="Pengaturan"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex size-11 items-center justify-center rounded-full text-plum-soft/70 transition-colors hover:text-plum-soft"
        >
          <span className="text-lg">⚙</span>
        </button>
      </div>
      {state.milestones.hiddenMessageSeen ? (
        <button
          type="button"
          aria-label="Buka pesan tersembunyi"
          onClick={onOpenMessage}
          className="animate-pulse-soft absolute right-0 top-0 flex size-11 items-center justify-center rounded-full bg-cream text-lg text-rose soft-shadow"
        >
          ✉
        </button>
      ) : null}

      {menuOpen ? (
        <div className="animate-rise absolute left-0 top-12 z-10 w-52 overflow-hidden rounded-2xl bg-card text-left soft-shadow">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onRename();
            }}
            className="block w-full px-4 py-3 text-sm text-foreground transition-colors hover:bg-cream"
          >
            Ganti nama panggilan
          </button>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onReset();
            }}
            className="block w-full px-4 py-3 text-sm text-foreground transition-colors hover:bg-cream"
          >
            Reset progress
          </button>
        </div>
      ) : null}

      <h1 key={greeting} className="animate-fade-in mt-10 font-display text-[28px] leading-snug text-foreground">
        {greeting}
      </h1>

      <div className="mt-8 flex items-center justify-center gap-4">
        <ProgressCircle played={played} total={totalCards} size={140} />
        <Bunny pose="sit" className="size-16 self-end" idle />
      </div>

      <div className="mx-auto mt-8 max-w-xs space-y-3">
        <button
          type="button"
          onClick={onPlay}
          disabled={done}
          className="w-full rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50"
        >
          {done ? "Semua kartu selesai" : hasProgress ? "Lanjut main" : "Mulai main"}
        </button>

        {hasProgress ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onReview}
              className="rounded-2xl bg-cream px-4 py-3.5 text-sm font-semibold text-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
            >
              Baca ulang
            </button>
            <button
              type="button"
              onClick={onProgress}
              className="rounded-2xl bg-cream px-4 py-3.5 text-sm font-semibold text-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
            >
              Progress aku
            </button>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setPickCategory((v) => !v)}
          className="w-full rounded-full px-6 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Main per topik
        </button>
      </div>

      {pickCategory ? (
        <div className="animate-rise mx-auto mt-4 grid max-w-sm grid-cols-2 gap-2">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const cat = state.categoryScore[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => onPlayCategory(key)}
                className={`rounded-2xl px-3 py-3 text-left text-xs font-semibold soft-shadow transition-transform hover:-translate-y-0.5 ${categoryColor(key)}`}
              >
                {label}
                <span className="mt-1 block text-[0.68rem] font-normal opacity-75">
                  {cat?.cardsPlayed ?? 0} kartu dimainkan
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
