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
      className="flex flex-col items-center px-2 py-10 text-center"
    >
      <Bunny pose="happy" className="animate-rise size-24" />
      <h1 className="animate-rise mt-8 text-3xl text-foreground" style={{ animationDelay: "120ms" }}>
        Kamu mau dipanggil apa?
      </h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value.slice(0, 20))}
        maxLength={20}
        autoFocus
        placeholder="nama panggilan kamu"
        className="animate-rise mt-10 w-full max-w-xs rounded-full border-0 bg-cream px-6 py-4 text-center text-lg text-foreground outline-none soft-shadow transition-shadow placeholder:text-muted-foreground/70 focus:lift-shadow"
        style={{ animationDelay: "220ms" }}
      />
      {trimmed ? (
        <button
          type="submit"
          className="animate-fade-in mt-8 w-full max-w-xs rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
        >
          Mulai
        </button>
      ) : null}
      {onCancel ? (
        <button
          type="button"
          onClick={onCancel}
          className="mt-4 rounded-full px-6 py-2.5 text-sm font-medium text-muted-foreground"
        >
          Batal
        </button>
      ) : null}
    </form>
  );
}
