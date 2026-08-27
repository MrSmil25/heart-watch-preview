type Pose = "wave" | "happy" | "thinking" | "sleepy" | "envelope" | "magnifier" | "sit";

type Props = {
  pose?: Pose;
  className?: string;
  hop?: boolean;
  idle?: boolean;
};

export function Bunny({ pose = "wave", className = "size-28", hop = false, idle = false }: Props) {
  const eyeClass = idle ? "animate-blink" : "";
  return (
    <svg
      viewBox="0 0 120 130"
      className={`${className} ${hop ? "animate-hop" : ""}`}
      role="img"
      aria-label="Maskot kelinci putih Baca Aku"
    >
      {/* telinga */}
      <g transform={pose === "thinking" ? "rotate(-8 60 60)" : undefined}>
        <ellipse cx="45" cy="30" rx="10" ry="26" fill="var(--white-warm)" stroke="var(--border)" strokeWidth="2" />
        <ellipse cx="45" cy="32" rx="4.5" ry="18" fill="var(--peach)" opacity="0.8" />
        <ellipse
          cx="76"
          cy="34"
          rx="10"
          ry="26"
          fill="var(--white-warm)"
          stroke="var(--border)"
          strokeWidth="2"
          transform={pose === "happy" || pose === "envelope" ? "rotate(14 76 34)" : "rotate(8 76 34)"}
        />
        <ellipse
          cx="76"
          cy="36"
          rx="4.5"
          ry="18"
          fill="var(--lavender)"
          opacity="0.85"
          transform={pose === "happy" || pose === "envelope" ? "rotate(14 76 36)" : "rotate(8 76 36)"}
        />
      </g>

      {/* badan */}
      <ellipse cx="60" cy="98" rx="30" ry="26" fill="var(--white-warm)" stroke="var(--border)" strokeWidth="2" />
      {/* kepala */}
      <circle cx="60" cy="70" r="27" fill="var(--white-warm)" stroke="var(--border)" strokeWidth="2" />
      {/* pipi */}
      <circle cx="45" cy="76" r="6" fill="var(--peach)" opacity="0.85" />
      <circle cx="75" cy="76" r="6" fill="var(--peach)" opacity="0.85" />

      {/* mata */}
      {pose === "sleepy" ? (
        <>
          <path d="M44 68 q6 6 12 0" stroke="var(--plum)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M66 68 q6 6 12 0" stroke="var(--plum)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <g className={eyeClass}>
          <circle cx="50" cy="68" r="3.4" fill="var(--plum)" />
          <circle cx="70" cy="68" r="3.4" fill="var(--plum)" />
        </g>
      )}

      {/* hidung + mulut */}
      <path d="M57 76 h6 l-3 3.5 z" fill="var(--rose)" />
      <path d="M60 80 q-4 4 -7 1" stroke="var(--plum)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M60 80 q4 4 7 1" stroke="var(--plum)" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* tangan + properti per pose */}
      {pose === "wave" ? (
        <ellipse cx="92" cy="82" rx="8" ry="11" fill="var(--white-warm)" stroke="var(--border)" strokeWidth="2" transform="rotate(-25 92 82)" />
      ) : pose === "thinking" ? (
        <ellipse cx="86" cy="92" rx="8" ry="10" fill="var(--white-warm)" stroke="var(--border)" strokeWidth="2" />
      ) : pose === "envelope" ? (
        <>
          <ellipse cx="34" cy="94" rx="8" ry="10" fill="var(--white-warm)" stroke="var(--border)" strokeWidth="2" />
          <ellipse cx="86" cy="94" rx="8" ry="10" fill="var(--white-warm)" stroke="var(--border)" strokeWidth="2" />
          {/* amplop kecil yang dipegang */}
          <g>
            <rect x="44" y="96" width="32" height="22" rx="3" fill="var(--cream)" stroke="var(--rose)" strokeWidth="1.8" />
            <path d="M44 99 L60 110 L76 99" fill="none" stroke="var(--rose)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M57 103 h6 l-3 3 z" fill="var(--rose)" opacity="0.9" />
          </g>
        </>
      ) : pose === "magnifier" ? (
        <>
          <ellipse cx="30" cy="92" rx="8" ry="10" fill="var(--white-warm)" stroke="var(--border)" strokeWidth="2" />
          {/* kaca pembesar */}
          <g>
            <circle cx="92" cy="80" r="12" fill="oklch(0.97 0.02 300 / 0.55)" stroke="var(--rose-deep)" strokeWidth="2.5" />
            <line x1="82" y1="89" x2="74" y2="97" stroke="var(--rose-deep)" strokeWidth="3.5" strokeLinecap="round" />
          </g>
          <ellipse cx="80" cy="96" rx="7" ry="9" fill="var(--white-warm)" stroke="var(--border)" strokeWidth="2" />
        </>
      ) : (
        <>
          <ellipse cx="30" cy="92" rx="8" ry="10" fill="var(--white-warm)" stroke="var(--border)" strokeWidth="2" />
          <ellipse cx="90" cy="92" rx="8" ry="10" fill="var(--white-warm)" stroke="var(--border)" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}
