"use client";

type Star = {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
};

type Sprite = {
  x: number;
  y: number;
  delay: number;
  duration: number;
  emoji: string;
  size: number;
};

const COLORS = ["#ffd700", "#7df9ff", "#c084fc", "#f472b6", "#4ade80", "#ffffff"];
const SPRITES = ["✦", "✧", "✺", "✹", "❉", "❋"];

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 97.13 + salt * 31.7) * 10000;
  return value - Math.floor(value);
}

const stars: Star[] = Array.from({ length: 60 }).map((_, i) => ({
  x: seeded(i, 1) * 100,
  y: seeded(i, 2) * 100,
  size: 2 + Math.floor(seeded(i, 3) * 3),
  delay: seeded(i, 4) * 4,
  duration: 2 + seeded(i, 5) * 4,
  color: COLORS[Math.floor(seeded(i, 6) * COLORS.length)],
}));

const sprites: Sprite[] = Array.from({ length: 12 }).map((_, i) => ({
  x: seeded(i, 7) * 100,
  y: seeded(i, 8) * 100,
  delay: seeded(i, 9) * 6,
  duration: 6 + seeded(i, 10) * 6,
  emoji: SPRITES[Math.floor(seeded(i, 11) * SPRITES.length)],
  size: 10 + Math.floor(seeded(i, 12) * 10),
}));

export default function StarField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={`s-${i}`}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            opacity: 0,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      {sprites.map((sp, i) => (
        <span
          key={`sp-${i}`}
          style={{
            position: "absolute",
            left: `${sp.x}%`,
            top: `${sp.y}%`,
            fontSize: sp.size,
            color: COLORS[i % COLORS.length],
            opacity: 0.3,
            animation: `drift ${sp.duration}s ease-in-out ${sp.delay}s infinite`,
            filter: "drop-shadow(0 0 4px currentColor)",
          }}
        >
          {sp.emoji}
        </span>
      ))}
    </div>
  );
}
