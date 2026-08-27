import data from "./cards.json";

export type Interpretation = {
  id: string;
  text: string;
  isMostLikely: boolean;
};

export type ResponseOption = {
  id: string;
  text: string;
  insight: number;
  empathy: number;
  socialDamage: number;
  isBest: boolean;
  feedback?: string;
};

export type Card = {
  id: string;
  category: string;
  twist: boolean;
  situation: string;
  question: string;
  interpretations: Interpretation[];
  reasoning: string;
  responses: ResponseOption[];
};

export const cards = data.cards as Card[];

export const categoryLabels: Record<string, string> = data.meta.categories;

export function categoryLabel(key: string) {
  return categoryLabels[key] ?? key;
}

const categoryColors: Record<string, string> = {
  hidden_feelings: "bg-lavender/70 text-lavender-foreground",
  social_code: "bg-sage/70 text-sage-foreground",
  sarcasm: "bg-peach/80 text-peach-foreground",
  manipulation: "bg-rose/25 text-foreground",
  motive_detection: "bg-cream text-muted-foreground",
  boundary_setting: "bg-sage/50 text-sage-foreground",
  hidden_agenda: "bg-sky/70 text-sky-foreground",
};

export function categoryColor(key: string) {
  return categoryColors[key] ?? "bg-lavender/70 text-lavender-foreground";
}
