"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { certificates, type Certificate } from "@/data/personal-data";
import { SectionHeading } from "./CharacterSection";

const RARITY_COLORS: Record<string, { bg: string; glow: string }> = {
  S: { bg: "linear-gradient(135deg, #fbbf24, #f59e0b)", glow: "rgba(255,215,0,0.5)" },
  A: { bg: "linear-gradient(135deg, #c084fc, #8b5cf6)", glow: "rgba(192,132,252,0.5)" },
  B: { bg: "linear-gradient(135deg, #60a5fa, #3b82f6)", glow: "rgba(96,165,250,0.5)" },
};

export default function TreasureSection() {
  const { ref, isVisible } = useInView(0.1);
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="treasure" ref={ref} className="relative py-24 px-4 max-w-6xl mx-auto">
      <SectionHeading subtitle="TREASURE">荣誉宝库</SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((cert, i) => {
          const r = RARITY_COLORS[cert.rarity];
          return (
            <button
              key={cert.id}
              onClick={() => setSelected(cert)}
              className={`pixel-panel p-4 text-left tilt-hover ${
                isVisible ? "section-visible" : "opacity-0"
              }`}
              style={{
                animationDelay: `${i * 0.1}s`,
                animation: isVisible
                  ? `fadeInUp 0.8s ease-out ${i * 0.1}s both, chest-glow 3s ease-in-out ${i * 0.5}s infinite`
                  : undefined,
              }}
            >
              {/* 稀有度徽章 */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`font-pixel text-[10px] px-2 py-0.5 rarity-${cert.rarity}`}
                  style={{ borderRadius: 0 }}
                >
                  {cert.rarity} RANK
                </span>
                <span className="text-xl" style={{ animation: "coin-spin 2s ease-in-out infinite" }}>
                  🏆
                </span>
              </div>

              {/* 缩略图 */}
              <div className="relative w-full aspect-[4/3] bg-black border-2 border-[var(--color-border-outer)] overflow-hidden mb-3">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-cover"
                  style={{ imageRendering: "auto" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 3px)",
                  }}
                />
              </div>

              {/* 名称 */}
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-1 leading-snug">
                {cert.name}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                {cert.desc}
              </p>

              <div className="mt-3 font-pixel text-[9px] text-[var(--color-text-highlight)]">
                [ 点击查看详情 ]
              </div>
            </button>
          );
        })}
      </div>

      {/* 模态弹窗 */}
      {selected && (
        <div
          className="pixel-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div className="pixel-modal p-6 sm:p-8 max-w-3xl w-full">
            <button
              className="pixel-modal-close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span
                className={`font-pixel text-[10px] px-2 py-0.5 rarity-${selected.rarity}`}
              >
                {selected.rarity} RANK
              </span>
              <h3 className="font-pixel text-sm text-[var(--color-text-gold)] glow-gold">
                {selected.name}
              </h3>
            </div>

            <div className="border-2 border-[var(--color-border-gold)] bg-black">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-auto"
                style={{ imageRendering: "auto" }}
              />
            </div>

            <p className="mt-4 text-sm text-[var(--color-text-muted)]">{selected.desc}</p>

            <div className="mt-4 text-center">
              <button
                onClick={() => setSelected(null)}
                className="pixel-btn pixel-btn-gold !text-[11px]"
              >
                ✕ 关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
