import { useState } from "react";
import { Bunny } from "./Bunny";

type Props = {
  initialName?: string;
  onSubmit: (nickname: string) => void;
  onCancel?: () => void;
};

export function OnboardingScreen({ initialName = "", onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initialName);
  const trimmed = name.trim();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (trimmed) onSubmit(trimmed);
      }}
      className="animate-rise surface-card px-6 py-8 text-center"
    >
      <Bunny pose="happy" className="mx-auto size-24" />
      <h1 className="mt-4 text-3xl text-foreground">Kamu mau dipanggil apa?</h1>
      <p className="mt-2 text-sm text-muted-foreground">Biar aku bisa nyapa kamu dengan bener.</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value.slice(0, 20))}
        maxLength={20}
        autoFocus
        placeholder="Nama panggilan"
        className="mt-6 w-full rounded-2xl border border-border bg-cream px-4 py-3.5 text-center text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-rose"
      />
      <p className="mt-2 text-xs text-muted-foreground">{name.length}/20 karakter</p>
      <button
        type="submit"
        disabled={!trimmed}
        className="mt-6 w-full rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Mulai
      </button>
      {onCancel ? (
        <button
          type="button"
          onClick={onCancel}
          className="mt-3 w-full rounded-2xl px-6 py-2.5 text-sm font-medium text-muted-foreground"
        >
          Batal
        </button>
      ) : null}
    </form>
  );
}
