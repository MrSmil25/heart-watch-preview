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
