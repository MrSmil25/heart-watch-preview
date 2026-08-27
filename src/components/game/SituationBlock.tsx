type Props = {
  situation: string;
  question: string;
};

export function SituationBlock({ situation, question }: Props) {
  return (
    <div className="animate-rise space-y-4">
      <p className="rounded-[28px] bg-white-warm px-6 py-6 text-[17px] leading-[1.75] text-foreground soft-shadow">
        {situation}
      </p>
      <h2 className="text-xl text-foreground">{question}</h2>
    </div>
  );
}
