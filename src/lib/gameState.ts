import { cards, categoryLabels } from "@/data/cards";
import type { Totals } from "./scoring";

export const STORAGE_KEY = "bacaaku_state";

export type AnsweredCard = {
  cardId: string;
  interpretationChoice: string;
  responseChoice: string;
  answeredAt: string;
};

export type CategoryScore = Totals & { cardsPlayed: number };

export type GameState = {
  nickname: string;
  answeredCards: AnsweredCard[];
  totalScore: Totals;
  categoryScore: Record<string, CategoryScore>;
  milestones: {
    hiddenMessageSeen: boolean;
    firstPersonaUnlocked: boolean;
    fullPersonaUnlocked: boolean;
  };
  currentPersonaId: string | null;
  lastPlayedAt: string | null;
  createdAt: string;
};

function emptyCategoryScore(): Record<string, CategoryScore> {
  const out: Record<string, CategoryScore> = {};
  for (const key of Object.keys(categoryLabels)) {
    out[key] = { insight: 0, empathy: 0, socialDamage: 0, cardsPlayed: 0 };
  }
  return out;
}

export function createState(nickname = ""): GameState {
  return {
    nickname,
    answeredCards: [],
    totalScore: { insight: 0, empathy: 0, socialDamage: 0 },
    categoryScore: emptyCategoryScore(),
    milestones: {
      hiddenMessageSeen: false,
      firstPersonaUnlocked: false,
      fullPersonaUnlocked: false,
    },
    currentPersonaId: null,
    lastPlayedAt: null,
    createdAt: new Date().toISOString(),
  };
}

export function loadState(): GameState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    if (!parsed || typeof parsed !== "object") return null;
    return {
      ...createState(parsed.nickname ?? ""),
      ...parsed,
      categoryScore: { ...emptyCategoryScore(), ...(parsed.categoryScore ?? {}) },
      milestones: { ...createState().milestones, ...(parsed.milestones ?? {}) },
    };
  } catch {
    return null;
  }
}

export function saveState(state: GameState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* abaikan */
  }
}

export function recordAnswer(
  state: GameState,
  cardId: string,
  category: string,
  interpretationChoice: string,
  responseChoice: string,
  delta: Totals,
): GameState {
  if (state.answeredCards.some((a) => a.cardId === cardId)) return state;
  const cat = state.categoryScore[category] ?? {
    insight: 0,
    empathy: 0,
    socialDamage: 0,
    cardsPlayed: 0,
  };
  return {
    ...state,
    answeredCards: [
      ...state.answeredCards,
      { cardId, interpretationChoice, responseChoice, answeredAt: new Date().toISOString() },
    ],
    totalScore: {
      insight: state.totalScore.insight + delta.insight,
      empathy: state.totalScore.empathy + delta.empathy,
      socialDamage: state.totalScore.socialDamage + delta.socialDamage,
    },
    categoryScore: {
      ...state.categoryScore,
      [category]: {
        insight: cat.insight + delta.insight,
        empathy: cat.empathy + delta.empathy,
        socialDamage: cat.socialDamage + delta.socialDamage,
        cardsPlayed: cat.cardsPlayed + 1,
      },
    },
    lastPlayedAt: new Date().toISOString(),
  };
}

export function playedIds(state: GameState) {
  return new Set(state.answeredCards.map((a) => a.cardId));
}

export function nextCardId(state: GameState, category?: string) {
  const played = playedIds(state);
  const pool = category ? cards.filter((c) => c.category === category) : cards;
  return pool.find((c) => !played.has(c.id))?.id ?? null;
}

export function topCategory(state: GameState) {
  let best: string | null = null;
  let bestPlayed = 0;
  for (const [key, value] of Object.entries(state.categoryScore)) {
    if (value.cardsPlayed > bestPlayed) {
      bestPlayed = value.cardsPlayed;
      best = key;
    }
  }
  return best;
}

function avgScore(value: CategoryScore) {
  if (value.cardsPlayed === 0) return null;
  return (value.insight + value.empathy - value.socialDamage) / (value.cardsPlayed * 6);
}

export function strongestCategory(state: GameState) {
  let best: string | null = null;
  let bestAvg = -Infinity;
  for (const [key, value] of Object.entries(state.categoryScore)) {
    const avg = avgScore(value);
    if (avg !== null && avg > bestAvg) {
      bestAvg = avg;
      best = key;
    }
  }
  return best;
}

export function weakestCategory(state: GameState) {
  let worst: string | null = null;
  let worstAvg = Infinity;
  for (const [key, value] of Object.entries(state.categoryScore)) {
    const avg = avgScore(value);
    if (avg !== null && avg < worstAvg) {
      worstAvg = avg;
      worst = key;
    }
  }
  return worst;
}
