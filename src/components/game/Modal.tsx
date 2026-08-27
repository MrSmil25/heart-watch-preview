import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  onClose?: () => void;
  children: ReactNode;
};

export function Modal({ title, description, onClose, children }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/25 px-4 pb-6 pt-20 backdrop-blur-sm sm:items-center sm:pb-0">
      <div className="animate-rise surface-card relative w-full max-w-sm px-5 py-6">
        {onClose ? (
          <button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-cream text-muted-foreground transition-colors hover:text-foreground"
          >
            ✕
          </button>
        ) : null}
        <h2 className="pr-8 text-xl text-foreground">{title}</h2>
        {description ? (
          <p className="mt-2 text-[0.92rem] leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
        <div className="mt-5 space-y-2.5">{children}</div>
      </div>
    </div>
  );
}
