type Pose = "wave" | "happy" | "thinking" | "sleepy";

type Props = {
  pose?: Pose;
  className?: string;
  hop?: boolean;
};

export function Bunny({ pose = "wave", className = "size-28", hop = false }: Props) {
  return (
    <svg
      viewBox="0 0 120 130"
      className={`${className} ${hop ? "animate-hop" : ""}`}
      role="img"
      aria-label="Maskot kelinci putih Baca Aku"
    >
      {/* telinga */}
      <g transform={pose === "thinking" ? "rotate(-8 60 60)" : undefined}>
        <ellipse cx="45" cy="30" rx="10" ry="26" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
        <ellipse cx="45" cy="32" rx="4.5" ry="18" fill="var(--peach)" opacity="0.8" />
        <ellipse
          cx="76"
          cy="34"
          rx="10"
          ry="26"
          fill="var(--card)"
          stroke="var(--border)"
          strokeWidth="2"
          transform={pose === "happy" ? "rotate(14 76 34)" : "rotate(8 76 34)"}
        />
        <ellipse
          cx="76"
          cy="36"
          rx="4.5"
          ry="18"
          fill="var(--lavender)"
          opacity="0.85"
          transform={pose === "happy" ? "rotate(14 76 36)" : "rotate(8 76 36)"}
        />
      </g>

      {/* badan */}
      <ellipse cx="60" cy="98" rx="30" ry="26" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      {/* kepala */}
      <circle cx="60" cy="70" r="27" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      {/* pipi */}
      <circle cx="45" cy="76" r="6" fill="var(--peach)" opacity="0.85" />
      <circle cx="75" cy="76" r="6" fill="var(--peach)" opacity="0.85" />

      {/* mata */}
      {pose === "sleepy" ? (
        <>
          <path d="M44 68 q6 6 12 0" stroke="var(--foreground)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M66 68 q6 6 12 0" stroke="var(--foreground)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="50" cy="68" r="3.4" fill="var(--foreground)" />
          <circle cx="70" cy="68" r="3.4" fill="var(--foreground)" />
        </>
      )}

      {/* hidung + mulut */}
      <path d="M57 76 h6 l-3 3.5 z" fill="var(--rose)" />
      <path d="M60 80 q-4 4 -7 1" stroke="var(--foreground)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M60 80 q4 4 7 1" stroke="var(--foreground)" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* tangan */}
      {pose === "wave" ? (
        <ellipse cx="92" cy="82" rx="8" ry="11" fill="var(--card)" stroke="var(--border)" strokeWidth="2" transform="rotate(-25 92 82)" />
      ) : pose === "thinking" ? (
        <ellipse cx="86" cy="92" rx="8" ry="10" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      ) : (
        <>
          <ellipse cx="30" cy="92" rx="8" ry="10" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
          <ellipse cx="90" cy="92" rx="8" ry="10" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}
