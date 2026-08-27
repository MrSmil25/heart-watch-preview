import type { Totals } from "./scoring";

export type Persona = {
  id: string;
  name: string;
  priority: number;
  trigger: {
    insightMin?: number;
    insightMax?: number;
    empathyMin?: number;
    empathyMax?: number;
    damageMax?: number;
    isFallback?: boolean;
  };
  unlockText: string;
  fullText: string;
};

export const personas: Persona[] = [
  {
    id: "pembaca-halus",
    name: "PEMBACA HALUS",
    priority: 1,
    trigger: { insightMin: 0.7, empathyMin: 0.7, damageMax: 0.2 },
    unlockText:
      "Nay, ini dia kamu. Dari 20 kartu, kamu udah nunjukin pola langka: kamu jarang salah baca situasi, dan pas ngerespons pun tetep hangat. Kamu tipe yang bikin orang lain ngerasa aman buat jujur — dan itu bakat, bukan teknik.",
    fullText:
      "Nay, kamu Pembaca Halus. Dari 30 momen, kamu bukan cuma bisa nangkep apa yang orang tahan buat ngomong — kamu juga tau caranya bikin mereka merasa dilihat tanpa dipojokin. Yang masih perlu kamu latih: kadang orang butuh kamu ngambil langkah, bukan cuma ngerti. Tapi selebihnya, jaga baik-baik kepekaan ini — nggak banyak orang punya.",
  },
  {
    id: "hati-penuh",
    name: "HATI PENUH",
    priority: 2,
    trigger: { empathyMin: 0.7, insightMax: 0.7, damageMax: 0.3 },
    unlockText:
      "Nay, kamu udah main 20 kartu dan polanya udah kelihatan jelas — yang paling kamu utamain adalah bikin orang lain nggak sakit. Kadang kamu masih miss maksud sebenernya, tapi respons kamu selalu ninggalin ruang yang aman. Nggak semua orang punya reflex kayak gini.",
    fullText:
      "Nay, kamu Hati Penuh. 30 kartu udah jalan, dan aku bisa liat: kamu mungkin nggak selalu nebak tepat apa yang orang mau, tapi kamu selalu ngerespons dengan cara yang bikin mereka pengen kembali. Yang perlu dilatih: kadang kebaikan kamu bisa dieksploit, dan kamu perlu belajar milih siapa yang layak dapet versi terhangat kamu. Tapi jangan pernah ilangin sisi ini.",
  },
  {
    id: "detektif-tenang",
    name: "DETEKTIF TENANG",
    priority: 3,
    trigger: { insightMin: 0.7, empathyMin: 0.4, empathyMax: 0.7, damageMax: 0.3 },
    unlockText:
      "Nay, 20 kartu dan aku udah bisa lihat: kamu jarang keliatan panik ngerespons, tapi bacaan kamu tajem. Kamu tipe yang mikir sebelum bereaksi, dan itu bikin kamu jarang nyakitin orang tanpa sengaja. Yang belum keliatan: seberapa hangat kamu pas jawab. Kita liat 10 kartu lagi.",
    fullText:
      "Nay, kamu Detektif Tenang. Dari 30 momen, kamu bisa nangkep maksud tersembunyi jauh lebih sering dari kebanyakan orang. Yang perlu dilatih: kadang bacaan tepat aja belum cukup — cara nyampeinnya perlu se-lembut isinya. Kamu jarang salah, jadi pas kamu salah, orang nggak siap. Latihannya bukan lebih tajem, tapi lebih pelan.",
  },
  {
    id: "percaya-polos",
    name: "PERCAYA POLOS",
    priority: 4,
    trigger: { empathyMin: 0.5, insightMax: 0.55, damageMax: 0.3 },
    unlockText:
      "Nay, dari 20 kartu, aku notice kamu punya sesuatu yang jarang dipuji: kamu percaya sama omongan orang di permukaan. Yang lain mungkin bilang itu polos, tapi ada bagian yang bagus di sini — kamu nggak paranoid, kamu nggak curiga ke semua orang. Yang perlu diseimbangin: sedikit lebih waspada di situasi tertentu.",
    fullText:
      "Nay, kamu Percaya Polos. 30 kartu udah jalan, dan polanya jelas: kamu default ke asumsi terbaik dari orang lain, dan itu bikin hidup kamu jauh lebih ringan daripada orang yang selalu curiga. Yang perlu dilatih: belajar ngenali pola 'terlalu manis' — orang yang cepet deket, senior yang minta tolong pakai janji vague, temen yang tiba-tiba butuh sesuatu. Jangan ilangin percayamu, cuma tambahin satu detik jeda sebelum ngiyain.",
  },
  {
    id: "pengamat-santai",
    name: "PENGAMAT SANTAI",
    priority: 5,
    trigger: { isFallback: true },
    unlockText:
      "Nay, kamu di titik yang menarik nih. Kamu belum konsisten di satu pola — kadang nebak tepat, kadang miss. Tapi satu hal yang jelas: kamu jarang bikin situasi jadi lebih buruk. Kamu ambil tempat aman, dan itu skill sendiri. Lanjut ke 10 kartu berikutnya, aku bisa kasih gambaran lebih jelas.",
    fullText:
      "Nay, kamu Pengamat Santai. Dari 30 momen, kamu ambil jalan tengah lebih sering dari ekstrim manapun. Nggak selalu jago baca, tapi juga jarang salah fatal. Kamu masih di fase eksplorasi — dan itu OK. Yang kalau mau kamu latih: berani ambil respons yang lebih dalam. Kadang jawaban aman itu lebih pahit daripada jawaban salah — karena kamu ninggalin momen tanpa jejak.",
  },
];

export function matchPersona(totals: Totals, cardsPlayed: number): Persona {
  const max = Math.max(cardsPlayed, 1) * 3;
  const insight = totals.insight / max;
  const empathy = totals.empathy / max;
  const damage = totals.socialDamage / max;

  const sorted = [...personas].sort((a, b) => a.priority - b.priority);
  for (const persona of sorted) {
    const t = persona.trigger;
    if (t.isFallback) continue;
    if (t.insightMin !== undefined && insight < t.insightMin) continue;
    if (t.insightMax !== undefined && insight > t.insightMax) continue;
    if (t.empathyMin !== undefined && empathy < t.empathyMin) continue;
    if (t.empathyMax !== undefined && empathy > t.empathyMax) continue;
    if (t.damageMax !== undefined && damage > t.damageMax) continue;
    return persona;
  }
  return sorted[sorted.length - 1]!;
}

export function personaText(persona: Persona, full: boolean, nickname: string) {
  return (full ? persona.fullText : persona.unlockText).replaceAll("Nay", nickname || "kamu");
}
