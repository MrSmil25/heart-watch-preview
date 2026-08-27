import { cn } from "@/lib/utils";

type Props = {
  letter: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  state?: "idle" | "correct" | "wrong" | "best";
  hint?: string | undefined;
};

export function OptionButton({
  letter,
  text,
  onClick,
  disabled,
  selected,
  state = "idle",
  hint,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full rounded-2xl px-[18px] py-[18px] text-left transition-all duration-300",
        "bg-cream soft-shadow",
        !disabled && "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:bg-peach",
        disabled && "cursor-default",
        state === "correct" && "bg-sage/40 ring-2 ring-sage",
        state === "best" && "bg-sage/25 ring-2 ring-sage/70",
        state === "wrong" && "bg-apricot/40 ring-2 ring-apricot",
        selected && state === "idle" && "bg-lavender/40 ring-2 ring-lavender",
        !selected && state === "idle" && disabled && "opacity-60",
      )}
    >
      <div className="flex gap-3">
        <span
          className={cn(
            "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            "bg-peach text-peach-foreground",
            state === "correct" && "bg-sage text-sage-foreground",
            state === "best" && "bg-sage text-sage-foreground",
            state === "wrong" && "bg-apricot text-apricot-foreground",
          )}
        >
          {state === "correct" ? (
            <span className="animate-chip">✓</span>
          ) : state === "wrong" ? (
            <span className="animate-chip inline-block size-2 rounded-full bg-current" aria-label="kurang tepat" />
          ) : (
            letter
          )}
        </span>
        <span className="flex-1">
          <span className="block text-[0.95rem] leading-relaxed text-foreground">{text}</span>
          {hint ? (
            <span className="mt-1.5 block text-xs font-medium text-muted-foreground">{hint}</span>
          ) : null}
        </span>
      </div>
    </button>
  );
}
