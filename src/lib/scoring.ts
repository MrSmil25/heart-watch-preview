export type Totals = {
  insight: number;
  empathy: number;
  socialDamage: number;
};

export const emptyTotals: Totals = { insight: 0, empathy: 0, socialDamage: 0 };

export type Persona = {
  title: string;
  description: string;
};

export function getPersona(totals: Totals, cardsPlayed: number): Persona {
  const n = Math.max(cardsPlayed, 1);
  const ins = totals.insight / n;
  const emp = totals.empathy / n;
  const dmg = totals.socialDamage / n;

  if (dmg >= 1) {
    return {
      title: "Si Jujur yang Suka Kelewat Batas",
      description:
        "Kamu berani ngomong apa adanya, dan itu langka. Tapi beberapa kalimatmu mendarat lebih keras dari yang kamu kira. Coba tahan setengah detik sebelum kirim — niat baik butuh bungkus yang pas.",
    };
  }
  if (ins >= 1.6 && emp >= 1.6) {
    return {
      title: "Si Pendengar yang Tenang",
      description:
        "Kamu nangkep yang nggak diucapin, dan responsmu bikin orang ngerasa aman. Jangan lupa: kamu juga boleh jadi orang yang dibaca, bukan cuma yang membaca.",
    };
  }
  if (ins >= 1.4 && emp < 1.2) {
    return {
      title: "Si Pembaca Situasi",
      description:
        "Analisamu tajam, kamu jarang salah nebak maksud orang. Cuma kadang kamu buru-buru ke solusi, padahal yang dia butuh cuma ditemenin dulu.",
    };
  }
  if (emp >= 1.4 && ins < 1.2) {
    return {
      title: "Si Hangat yang Kadang Ketebak",
      description:
        "Hatimu selalu di tempat yang benar dan orang nyaman sama kamu. Tinggal latih satu hal: berhenti sebentar sebelum percaya kalimat pertama yang mereka lempar.",
    };
  }
  if (ins >= 0.8 || emp >= 0.8) {
    return {
      title: "Si Peka yang Suka Overthinking",
      description:
        "Kamu punya kepekaan tinggi tapi cenderung kebanyakan mikir sebelum ngomong, jadi kadang momennya keburu lewat. Percaya sama tebakan pertamamu lebih sering ya.",
    };
  }
  return {
    title: "Si Apa Adanya",
    description:
      "Kamu baca orang secara harfiah, dan jujur — nggak semua orang punya maksud tersembunyi. Sisanya cuma soal jam terbang: makin sering dengerin, makin kebaca polanya.",
  };
}

export function dimensionNote(key: keyof Totals, value: number, cardsPlayed: number) {
  const avg = value / Math.max(cardsPlayed, 1);
  if (key === "socialDamage") {
    if (avg <= 0.15) return "Nyaris nggak ada yang kesenggol.";
    if (avg <= 0.5) return "Sesekali kelepasan, masih wajar.";
    return "Beberapa kalimatmu ninggalin bekas.";
  }
  if (key === "insight") {
    if (avg >= 1.8) return "Kamu jarang ketipu kalimat manis.";
    if (avg >= 1) return "Tebakanmu sering kena.";
    return "Masih sering percaya versi permukaan.";
  }
  if (avg >= 1.8) return "Orang gampang ngerasa aman sama kamu.";
  if (avg >= 1) return "Responsmu umumnya nenangin.";
  return "Kadang jawabanmu terlalu cepat, kurang hangat.";
}
