type Props = {
  situation: string;
  question: string;
};

export function SituationBlock({ situation, question }: Props) {
  return (
    <div className="animate-rise space-y-4">
      <p className="rounded-2xl bg-cream px-4 py-4 text-[0.98rem] leading-relaxed text-foreground">
        {situation}
      </p>
      <h2 className="text-xl text-foreground">{question}</h2>
    </div>
  );
}
