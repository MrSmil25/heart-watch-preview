import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CardStage } from "@/components/game/CardStage";
import { HiddenMessageOverlay } from "@/components/game/HiddenMessageOverlay";
import { HomeScreen } from "@/components/game/HomeScreen";
import { Modal } from "@/components/game/Modal";
import { OnboardingScreen } from "@/components/game/OnboardingScreen";
import { ProgressScreen } from "@/components/game/ProgressScreen";
import { ResultScreen } from "@/components/game/ResultScreen";
import { ReviewScreen } from "@/components/game/ReviewScreen";
import { SplashScreen } from "@/components/game/SplashScreen";
import { cards } from "@/data/cards";
import {
  createState,
  loadState,
  nextCardId,
  playedIds,
  recordAnswer,
  saveState,
  type GameState,
} from "@/lib/gameState";
import { matchPersona } from "@/lib/personas";
import type { Totals } from "@/lib/scoring";

const TITLE = "Baca Aku — Latihan Baca Maksud Tersembunyi Orang";
const DESCRIPTION =
  "Card game bahasa Indonesia berisi 40 situasi sosial. Tebak maksud tersembunyi, pilih respons terbaik, dan lihat skor Insight, Empathy, serta Social Damage kamu.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Screen =
  | "splash"
  | "onboarding"
  | "home"
  | "playing"
  | "result"
  | "review"
  | "progress";

function Index() {
  const [state, setState] = useState<GameState | null>(null);
  const [screen, setScreen] = useState<Screen>("splash");
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [messageReplay, setMessageReplay] = useState(false);

  useEffect(() => {
    const loaded = loadState();
    if (loaded) {
      setState(loaded);
      setScreen("home");
    }
  }, []);

  useEffect(() => {
    if (state) saveState(state);
  }, [state]);

  const played = state?.answeredCards.length ?? 0;
  const allDone = played >= cards.length;

  const startPlaying = (category?: string) => {
    if (!state) return;
    const cardId = nextCardId(state, category);
    if (cardId) {
      setCurrentCardId(cardId);
      setScreen("playing");
    }
  };

  const handleNext = (
    delta: Totals,
    interpretationChoice: string,
    responseChoice: string,
  ) => {
    if (!state || !currentCardId) return;
    const card = cards.find((c) => c.id === currentCardId);
    if (!card) return;

    const wasPlayed = playedIds(state).has(currentCardId);
    const newState = recordAnswer(
      state,
      currentCardId,
      card.category,
      interpretationChoice,
      responseChoice,
      delta,
    );

    const newPlayed = newState.answeredCards.length;

    let nextState = newState;
    if (newPlayed >= 20 && !nextState.milestones.firstPersonaUnlocked) {
      nextState = {
        ...nextState,
        milestones: { ...nextState.milestones, firstPersonaUnlocked: true },
      };
    }
    if (newPlayed >= cards.length && !nextState.milestones.fullPersonaUnlocked) {
      nextState = {
        ...nextState,
        milestones: { ...nextState.milestones, fullPersonaUnlocked: true },
      };
    }
    if (newPlayed >= 20) {
      nextState = {
        ...nextState,
        currentPersonaId: matchPersona(nextState.totalScore, newPlayed).id,
      };
    }

    setState(nextState);


    if (!wasPlayed && newPlayed === 5 && !nextState.milestones.hiddenMessageSeen) {
      setShowHiddenMessage(true);
      return;
    }

    if (newPlayed >= cards.length) {
      setScreen("result");
    } else {
      const nextId = nextCardId(nextState);
      if (nextId) {
        setCurrentCardId(nextId);
      } else {
        setScreen("result");
      }
    }

    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHiddenMessageContinue = () => {
    setShowHiddenMessage(false);
    if (!state) return;
    const updated = {
      ...state,
      milestones: { ...state.milestones, hiddenMessageSeen: true },
    };
    setState(updated);
    const nextId = nextCardId(updated);
    if (nextId) {
      setCurrentCardId(nextId);
      setScreen("playing");
    } else {
      setScreen("result");
    }
  };

  const handleReset = () => {
    const fresh = createState("");
    setState(fresh);
    setShowReset(false);
    setScreen("onboarding");
  };

  const handleRename = (nickname: string) => {
    if (!state) return;
    setState({ ...state, nickname });
    setShowRename(false);
  };

  const handleRestart = () => {
    if (!state) return;
    const fresh = createState(state.nickname);
    fresh.milestones = state.milestones;
    setState(fresh);
    setCurrentCardId(null);
    setScreen("home");
  };

  const currentCard = currentCardId ? cards.find((c) => c.id === currentCardId) : null;
  const currentIndex = currentCard ? cards.indexOf(currentCard) : 0;

  // Splash screen
  if (screen === "splash") {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
        <SplashScreen />
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setScreen("onboarding")}
            className="w-full rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
          >
            Mulai
          </button>
          <p className="mt-4 text-xs text-muted-foreground">
            Dibikin buat latihan peka, bukan buat nge-judge siapa-siapa.
          </p>
        </div>
      </main>
    );
  }

  // Onboarding
  if (screen === "onboarding") {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
        <OnboardingScreen
          initialName={state?.nickname ?? ""}
          onSubmit={(nickname) => {
            const fresh = createState(nickname);
            setState(fresh);
            setScreen("home");
          }}
        />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Dibikin buat latihan peka, bukan buat nge-judge siapa-siapa.
        </p>
      </main>
    );
  }

  // Home
  if (screen === "home" && state) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
        <HomeScreen
          state={state}
          totalCards={cards.length}
          onPlay={() => startPlaying()}
          onPlayCategory={(cat) => startPlaying(cat)}
          onReview={() => setScreen("review")}
          onProgress={() => setScreen("progress")}
          onRename={() => setShowRename(true)}
          onReset={() => setShowReset(true)}
          onOpenMessage={() => setShowHiddenMessage(true)}
        />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Dibikin buat latihan peka, bukan buat nge-judge siapa-siapa.
        </p>
        {showHiddenMessage ? (
          <HiddenMessageOverlay
            nickname={state.nickname}
            onContinue={() => setShowHiddenMessage(false)}
          />
        ) : null}
        {showReset ? (
          <Modal
            title="Yakin mau mulai dari nol?"
            description="Semua progress bakal hilang."
            onClose={() => setShowReset(false)}
          >
            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Ya, reset
            </button>
            <button
              type="button"
              onClick={() => setShowReset(false)}
              className="w-full rounded-2xl bg-cream px-6 py-3.5 font-semibold text-muted-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Batal
            </button>
          </Modal>
        ) : null}
        {showRename ? (
          <Modal title="Ganti nama panggilan" onClose={() => setShowRename(false)}>
            <RenameForm
              initial={state.nickname}
              onSubmit={handleRename}
              onCancel={() => setShowRename(false)}
            />
          </Modal>
        ) : null}
      </main>
    );
  }

  // Playing
  if (screen === "playing" && currentCard && state) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
        <CardStage
          key={currentCard.id}
          card={currentCard}
          index={currentIndex}
          total={cards.length}
          played={played}
          isLast={played >= cards.length - 1}
          nickname={state.nickname}
          hasMessage={state.milestones.hiddenMessageSeen}
          onOpenMessage={() => {
            setMessageReplay(true);
            setShowHiddenMessage(true);
          }}
          onNext={handleNext}
          onStop={() => setScreen("progress")}
        />
        {showHiddenMessage ? (
          <HiddenMessageOverlay
            nickname={state.nickname}
            onContinue={
              messageReplay
                ? () => {
                    setShowHiddenMessage(false);
                    setMessageReplay(false);
                  }
                : handleHiddenMessageContinue
            }
          />
        ) : null}
      </main>
    );
  }

  // Result
  if (screen === "result" && state) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
        <ResultScreen
          state={state}
          totalCards={cards.length}
          onRestart={handleRestart}
        />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Dibikin buat latihan peka, bukan buat nge-judge siapa-siapa.
        </p>
      </main>
    );
  }

  // Review
  if (screen === "review" && state) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
        <ReviewScreen state={state} onBack={() => setScreen("home")} />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Dibikin buat latihan peka, bukan buat nge-judge siapa-siapa.
        </p>
      </main>
    );
  }

  // Progress
  if (screen === "progress" && state) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
        <ProgressScreen
          state={state}
          totalCards={cards.length}
          onBack={() => setScreen(allDone ? "result" : "home")}
        />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Dibikin buat latihan peka, bukan buat nge-judge siapa-siapa.
        </p>
      </main>
    );
  }

  // Fallback
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
      <SplashScreen />
    </main>
  );
}

function RenameForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial);
  const trimmed = name.trim();
  return (
    <>
      <input
        value={name}
        onChange={(e) => setName(e.target.value.slice(0, 20))}
        maxLength={20}
        autoFocus
        placeholder="Nama panggilan"
        className="w-full rounded-2xl border border-border bg-cream px-4 py-3.5 text-center text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-rose"
      />
      <button
        type="button"
        onClick={() => {
          if (trimmed) onSubmit(trimmed);
        }}
        disabled={!trimmed}
        className="w-full rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Simpan
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="w-full rounded-2xl bg-cream px-6 py-3.5 font-semibold text-muted-foreground transition-transform duration-200 hover:-translate-y-0.5"
      >
        Batal
      </button>
    </>
  );
}
