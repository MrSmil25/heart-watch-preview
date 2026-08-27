import { useState } from "react";
import { categoryLabels } from "@/data/cards";
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

  return (
    <div className="animate-rise surface-card relative px-6 py-8 text-center">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        {state.milestones.hiddenMessageSeen ? (
          <button
            type="button"
            aria-label="Buka pesan tersembunyi"
            onClick={onOpenMessage}
            className="flex size-9 items-center justify-center rounded-full bg-peach text-peach-foreground"
          >
            ✉
          </button>
        ) : null}
        <button
          type="button"
          aria-label="Pengaturan"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-full bg-cream text-muted-foreground"
        >
          ⚙
        </button>
      </div>

      {menuOpen ? (
        <div className="absolute right-4 top-16 z-10 w-52 overflow-hidden rounded-2xl border border-border bg-card text-left soft-shadow">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onRename();
            }}
            className="block w-full px-4 py-3 text-sm text-foreground hover:bg-cream"
          >
            Ganti nama panggilan
          </button>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onReset();
            }}
            className="block w-full px-4 py-3 text-sm text-foreground hover:bg-cream"
          >
            Reset progress
          </button>
        </div>
      ) : null}

      <Bunny pose="wave" className="mx-auto size-24" />
      <h1 className="mt-3 text-3xl text-foreground">Halo {state.nickname || "kamu"}!</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {hasProgress ? "Sampai mana kita tadi? ✨" : "Siap main? ✨"}
      </p>

      <div className="mt-6 flex justify-center">
        <ProgressCircle played={played} total={totalCards} size={132} />
      </div>

      <div className="mt-7 space-y-2.5">
        <button
          type="button"
          onClick={onPlay}
          disabled={done}
          className="w-full rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50"
        >
          {done ? "Semua kartu selesai ✿" : hasProgress ? "Lanjut main" : "Mulai main"}
        </button>

        {hasProgress ? (
          <>
            <button
              type="button"
              onClick={onReview}
              className="w-full rounded-2xl bg-lavender px-6 py-3.5 font-semibold text-lavender-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Baca ulang
            </button>
            <button
              type="button"
              onClick={onProgress}
              className="w-full rounded-2xl bg-sage px-6 py-3.5 font-semibold text-sage-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Progress aku
            </button>
          </>
        ) : null}

        <button
          type="button"
          onClick={() => setPickCategory((v) => !v)}
          className="w-full rounded-2xl bg-cream px-6 py-3 text-sm font-semibold text-muted-foreground"
        >
          Main per topik
        </button>
      </div>

      {pickCategory ? (
        <div className="animate-rise mt-3 grid grid-cols-2 gap-2">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const cat = state.categoryScore[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => onPlayCategory(key)}
                className="rounded-2xl border border-border bg-card px-3 py-3 text-left text-xs font-semibold text-foreground transition-transform hover:-translate-y-0.5"
              >
                {label}
                <span className="mt-1 block text-[0.68rem] font-normal text-muted-foreground">
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
