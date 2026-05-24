"use client";

import { useInView } from "@/hooks/useInView";
import { skills } from "@/data/personal-data";
import { SectionHeading } from "./CharacterSection";

export default function StatsSection() {
  const { ref, isVisible } = useInView(0.15);

  return (
    <section id="stats" ref={ref} className="relative py-24 px-4 max-w-5xl mx-auto">
      <SectionHeading subtitle="STATS">技能面板</SectionHeading>

      <div
        className={`pixel-panel p-5 sm:p-8 ${isVisible ? "section-visible" : "opacity-0"}`}
      >
        <div className="font-pixel text-xs text-[var(--color-text-gold)] mb-6 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[var(--color-text-gold)]" />
          SKILL TREE · 技能树
        </div>

        <div className="space-y-5">
          {skills.map((skill, i) => (
            <div key={skill.name} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg">{skill.icon}</span>
                  <span className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-gold)] transition-colors">
                    {skill.name}
                  </span>
                </div>
                <span className="font-pixel text-[10px]" style={{ color: skill.color }}>
                  {skill.level}/10
                </span>
              </div>

              <div className="pixel-progress">
                <div
                  className="pixel-progress-fill"
                  style={{
                    width: isVisible ? `${skill.level * 10}%` : "0%",
                    background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                    transitionDelay: `${i * 0.12}s`,
                  }}
                />
              </div>

              <p className="mt-1 text-xs text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity max-h-0 group-hover:max-h-20 overflow-hidden">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 底部经验条 */}
        <div className="mt-8 pt-4 border-t-2 border-[var(--color-border-outer)]">
          <div className="flex items-center justify-between mb-1">
            <span className="font-pixel text-[10px] text-[var(--color-text-muted)]">
              EXP · 总经验
            </span>
            <span className="font-pixel text-[10px] text-[var(--color-text-gold)]">
              4 年冒险历程
            </span>
          </div>
          <div className="pixel-progress !h-3">
            <div
              className="pixel-progress-fill"
              style={{
                width: isVisible ? "88%" : "0%",
                background: "linear-gradient(90deg, #fbbf24, #ffd700)",
                transitionDelay: "1s",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
