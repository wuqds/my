"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { quests, type Quest } from "@/data/personal-data";
import { SectionHeading } from "./CharacterSection";

const RARITY_LABEL: Record<string, string> = {
  legendary: "★ 传说",
  elite: "◆ 精英",
  normal: "● 普通",
};

const RARITY_BORDER: Record<string, string> = {
  legendary: "var(--color-border-gold)",
  elite: "#c084fc",
  normal: "#60a5fa",
};

export default function QuestsSection() {
  const { ref, isVisible } = useInView(0.1);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="quests" ref={ref} className="relative py-24 px-4 max-w-6xl mx-auto">
      <SectionHeading subtitle="QUESTS">任务列表</SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {quests.map((q, i) => (
          <QuestCard
            key={i}
            quest={q}
            index={i}
            visible={isVisible}
            expanded={expanded === i}
            onToggle={() => setExpanded(expanded === i ? null : i)}
          />
        ))}
      </div>

      <div className="mt-8 text-center font-pixel text-[10px] text-[var(--color-text-muted)]">
        已完成 {quests.filter((q) => q.status === "completed").length}/{quests.length} 主线任务
        · 继续冒险中…
      </div>
    </section>
  );
}

function QuestCard({
  quest,
  index,
  visible,
  expanded,
  onToggle,
}: {
  quest: Quest;
  index: number;
  visible: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const borderColor = RARITY_BORDER[quest.rarity];

  return (
    <div
      className={`quest-card pixel-panel p-4 cursor-pointer ${
        visible ? "section-visible" : "opacity-0"
      }`}
      style={{
        animationDelay: `${index * 0.08}s`,
        borderColor,
        boxShadow: expanded
          ? `inset 0 0 0 2px ${borderColor}66, 0 0 24px ${borderColor}33`
          : undefined,
      }}
      onClick={onToggle}
    >
      {/* 头部 */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{quest.icon}</span>
          <span
            className={`font-pixel text-[9px] px-2 py-0.5 rarity-${quest.rarity}`}
            style={{
              border: `1px solid ${borderColor}`,
              letterSpacing: "0.08em",
            }}
          >
            {RARITY_LABEL[quest.rarity]}
          </span>
        </div>
        <span className="font-pixel text-[9px] text-[var(--color-text-muted)]">
          {quest.period}
        </span>
      </div>

      {/* 标题 */}
      <h3
        className="text-sm font-bold mb-2 leading-snug"
        style={{ color: borderColor }}
      >
        {quest.name}
      </h3>

      {/* 展开描述 */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-60 opacity-100 mb-3" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
          {quest.description}
        </p>
      </div>

      {/* 技术栈 */}
      <div className="flex flex-wrap gap-1.5">
        {quest.techStack.map((t) => (
          <span
            key={t}
            className="font-pixel text-[8px] px-2 py-0.5 bg-[var(--color-bg-panel-light)] border border-[var(--color-border-outer)] text-[var(--color-text-muted)]"
          >
            {t}
          </span>
        ))}
      </div>

      {/* 状态 */}
      <div className="mt-3 flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background:
              quest.status === "completed" ? "var(--color-accent-green)" : "var(--color-accent-blue)",
            boxShadow:
              quest.status === "completed"
                ? "0 0 6px var(--color-accent-green)"
                : "0 0 6px var(--color-accent-blue)",
          }}
        />
        <span className="font-pixel text-[9px] text-[var(--color-text-muted)]">
          {quest.status === "completed" ? "CLEARED" : "IN PROGRESS"}
        </span>
      </div>
    </div>
  );
}
