import { Bunny } from "./Bunny";

export function SplashScreen() {
  return (
    <div className="animate-rise flex flex-col items-center py-16 text-center">
      <Bunny pose="wave" className="size-40" hop />
      <h1 className="mt-6 text-5xl text-foreground">Baca Aku</h1>
      <p className="mt-3 text-[0.95rem] text-muted-foreground">Belajar baca yang tersembunyi ✨</p>
    </div>
  );
}
