"use client";

import PixelAvatar from "@/components/pixel/PixelAvatar";
import { useInView } from "@/hooks/useInView";
import { personalInfo, timeline } from "@/data/personal-data";

const STATS = [
  { label: "出生地", value: "安徽 · 马鞍山", icon: "📍" },
  { label: "种族", value: "Homo · Sapiens", icon: "🧬" },
  { label: "职业", value: "全栈冒险者", icon: "⚔️" },
  { label: "学院", value: "马鞍山学院 · 计算机科学与技术", icon: "🎓" },
  { label: "学籍编号", value: personalInfo.studentId, icon: "🪪" },
  { label: "服役期", value: personalInfo.period, icon: "⏳" },
];

export default function CharacterSection() {
  const { ref, isVisible } = useInView(0.15);

  return (
    <section
      id="character"
      ref={ref}
      className="relative py-24 px-4 max-w-6xl mx-auto"
    >
      <SectionHeading subtitle="CHARACTER">人物档案</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-10 items-start">
        {/* 左：像素头像 + 基础信息 */}
        <div
          className={`flex flex-col items-center ${
            isVisible ? "section-visible-left" : "opacity-0"
          }`}
        >
          <PixelAvatar
            src={personalInfo.avatar}
            size={224}
            level={personalInfo.level}
            raw
          />
          <div className="mt-10 font-pixel text-[10px] text-[var(--color-text-gold)] text-center">
            {personalInfo.nameEn.toUpperCase()}
          </div>
          <div className="mt-2 text-sm text-[var(--color-text-muted)] text-center">
            {personalInfo.classText}
          </div>
        </div>

        {/* 右：信息表格 + 自述 */}
        <div
          className={`pixel-panel pixel-panel-gold p-5 sm:p-8 ${
            isVisible ? "section-visible-right" : "opacity-0"
          }`}
        >
          <div className="font-pixel text-xs text-[var(--color-text-gold)] mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-[var(--color-text-gold)]" />
            BASIC INFO
          </div>

          <ul className="space-y-2.5 text-sm">
            {STATS.map((s) => (
              <li key={s.label} className="flex items-start gap-3">
                <span className="text-base">{s.icon}</span>
                <span className="font-pixel text-[10px] text-[var(--color-text-muted)] mt-1 min-w-[60px] sm:min-w-[80px]">
                  {s.label}
                </span>
                <span className="text-[var(--color-text-primary)]">{s.value}</span>
              </li>
            ))}
          </ul>

          <div
            className="my-5 h-1"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--color-border-gold) 0, var(--color-border-gold) 8px, transparent 8px, transparent 16px)",
            }}
          />

          <div className="font-pixel text-xs text-[var(--color-text-gold)] mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-[var(--color-text-gold)]" />
            CHARACTER LORE
          </div>
          <p className="text-sm leading-7 text-[var(--color-text-primary)]">
            {personalInfo.bio}
          </p>
        </div>
      </div>

      {/* 时间线 */}
      <div className={`mt-16 ${isVisible ? "section-visible" : "opacity-0"}`}>
        <div className="font-pixel text-xs text-[var(--color-text-gold)] mb-6 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[var(--color-text-gold)]" />
          TIMELINE · 冒险时间线
        </div>

        <ol className="relative border-l-4 border-[var(--color-border-outer)] pl-6 space-y-6">
          {timeline.map((t, i) => (
            <li key={i} className="relative">
              <span
                className="absolute -left-[34px] top-1 w-6 h-6 flex items-center justify-center bg-[var(--color-bg-panel)] border-2 border-[var(--color-border-gold)] text-sm"
                style={{ animation: "pulse-glow 2.5s ease-in-out infinite" }}
              >
                {t.icon}
              </span>
              <div className="font-pixel text-[10px] text-[var(--color-text-highlight)]">
                {t.year}
              </div>
              <div className="mt-1 text-base font-bold text-[var(--color-text-gold)]">
                {t.title}
              </div>
              <div className="mt-1 text-sm text-[var(--color-text-muted)]">
                {t.desc}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function SectionHeading({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle: string;
}) {
  return (
    <div className="mb-12 text-center">
      <div className="font-pixel text-[10px] text-[var(--color-accent-purple)] tracking-widest mb-2">
        ▼ {subtitle} ▼
      </div>
      <h2
        className="font-pixel text-2xl sm:text-3xl md:text-4xl text-[var(--color-text-gold)] glow-gold"
        style={{ textShadow: "3px 3px 0 #1a0e00, 0 0 18px rgba(255, 215, 0, 0.4)" }}
      >
        {children}
      </h2>
      <div
        className="mx-auto mt-4 w-32 h-1"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--color-border-gold) 0, var(--color-border-gold) 6px, transparent 6px, transparent 12px)",
        }}
      />
    </div>
  );
}
