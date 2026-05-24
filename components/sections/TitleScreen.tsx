"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/data/personal-data";

export default function TitleScreen() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const text = personalInfo.motto;
    let i = 0;
    const id = setInterval(() => {
      if (i <= text.length) {
        setTyped(text.slice(0, i));
        i++;
      } else {
        clearInterval(id);
      }
    }, 70);
    return () => clearInterval(id);
  }, []);

  const handleStart = () => {
    document.getElementById("character")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="title"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* 背景剪影山脉 */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 sm:h-64 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(43, 27, 78, 0.85), transparent), repeating-linear-gradient(90deg, transparent 0, transparent 19px, rgba(124, 108, 142, 0.15) 19px, rgba(124, 108, 142, 0.15) 20px)",
          maskImage:
            "linear-gradient(to top, black 60%, transparent), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 50' preserveAspectRatio='none'><polygon points='0,50 0,32 8,28 14,22 22,18 30,24 38,15 46,20 54,12 62,18 70,10 78,16 86,14 94,20 100,18 100,50'/></svg>\")",
          WebkitMaskImage:
            "linear-gradient(to top, black 60%, transparent), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 50' preserveAspectRatio='none'><polygon points='0,50 0,32 8,28 14,22 22,18 30,24 38,15 46,20 54,12 62,18 70,10 78,16 86,14 94,20 100,18 100,50'/></svg>\")",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div
        className="relative z-10 text-center max-w-3xl section-visible"
      >
        {/* 副标题 */}
        <div className="font-pixel text-[10px] sm:text-xs text-[var(--color-accent-purple)] mb-3 tracking-widest">
          ▼ PIXEL · RPG · PORTFOLIO ▼
        </div>

        {/* 主标题 */}
        <h1
          className="font-pixel text-3xl sm:text-5xl md:text-6xl text-[var(--color-text-gold)] glow-gold leading-relaxed"
          style={{
            textShadow:
              "4px 4px 0 #1a0e00, 0 0 16px rgba(255, 215, 0, 0.6), 0 0 32px rgba(255, 215, 0, 0.3)",
          }}
        >
          冒险者档案
        </h1>

        {/* 中文姓名 */}
        <h2 className="mt-6 text-2xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
          {personalInfo.name}
          <span className="ml-3 text-base sm:text-xl text-[var(--color-text-muted)] font-normal">
            {personalInfo.nameEn}
          </span>
        </h2>

        <p className="mt-2 font-pixel text-[10px] sm:text-xs text-[var(--color-text-highlight)] glow-cyan">
          {personalInfo.title} · LV.{personalInfo.level}
        </p>

        {/* 打字机 motto */}
        <div className="mt-8 min-h-[60px] flex items-center justify-center">
          <p className="font-mono text-sm sm:text-lg text-[var(--color-text-primary)] px-4">
            &ldquo; {typed}
            <span
              className="inline-block w-[2px] h-[1em] bg-[var(--color-text-gold)] ml-1 align-middle"
              style={{ animation: "cursor-blink 1s steps(2) infinite" }}
            />
            {typed.length >= personalInfo.motto.length && " ”"}
          </p>
        </div>

        {/* PRESS START */}
        <button
          onClick={handleStart}
          className="mt-10 pixel-btn pixel-btn-gold !px-6 !py-3 sm:!px-10 sm:!py-4 !text-xs sm:!text-sm"
          style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
        >
          ▶ PRESS START · 进入档案
        </button>

        <div className="mt-3 font-pixel text-[9px] text-[var(--color-text-muted)] blink-slow">
          [ 按下 START 开始冒险 ]
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="font-pixel text-[9px] text-[var(--color-border-inner)] mb-2">
          SCROLL DOWN
        </div>
        <div
          className="w-1 h-8 bg-[var(--color-border-inner)]"
          style={{ animation: "blink 1.4s steps(2) infinite" }}
        />
        <div
          className="text-[var(--color-border-inner)] text-xl mt-1"
          style={{ animation: "scroll-hint 1.4s ease-in-out infinite" }}
        >
          ▼
        </div>
      </div>
    </section>
  );
}
