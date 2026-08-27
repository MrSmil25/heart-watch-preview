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
        "w-full rounded-2xl border px-4 py-3.5 text-left transition-all duration-200",
        "bg-card border-border soft-shadow",
        !disabled && "hover:-translate-y-0.5 hover:border-rose/50 active:translate-y-0",
        disabled && "cursor-default",
        state === "correct" && "border-sage bg-sage/40",
        state === "best" && "border-sage/70 bg-sage/25",
        state === "wrong" && "border-rose/60 bg-rose/12",
        selected && state === "idle" && "border-lavender bg-lavender/40",
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
            state === "wrong" && "bg-rose text-rose-foreground",
          )}
        >
          {letter}
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
