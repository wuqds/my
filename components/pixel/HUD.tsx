"use client";

import { useEffect, useState } from "react";
import { navItems, personalInfo } from "@/data/personal-data";

export default function HUD() {
  const [activeId, setActiveId] = useState<string>("title");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // 计算当前在视口中央的 section
      const sections = navItems.map((n) => document.getElementById(n.id));
      const mid = window.innerHeight / 2;
      let candidate = activeId;
      sections.forEach((sec) => {
        if (!sec) return;
        const r = sec.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          candidate = sec.id;
        }
      });
      setActiveId(candidate);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled ? "backdrop-blur-md bg-[rgba(11,10,24,0.85)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* 左侧 LOGO + 等级 */}
        <button
          onClick={() => scrollTo("title")}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center pixel-panel pixel-panel-gold"
            style={{ animation: "pulse-glow 2.5s ease-in-out infinite" }}
          >
            <span className="font-pixel text-[10px] sm:text-xs text-[var(--color-text-gold)]">
              WJX
            </span>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-pixel text-[10px] text-[var(--color-text-gold)] glow-gold">
              {personalInfo.name}
            </span>
            <span className="font-pixel text-[8px] text-[var(--color-text-muted)] mt-1">
              Lv.{personalInfo.level} · 全栈冒险者
            </span>
          </div>
        </button>

        {/* 中间导航 */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const active = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`pixel-btn !px-2 !py-1.5 sm:!px-3 sm:!py-2 !text-[10px] sm:!text-[11px] whitespace-nowrap ${
                  active ? "!text-[var(--color-text-gold)] !border-[var(--color-border-gold)]" : ""
                }`}
                style={{
                  boxShadow: active
                    ? "inset -2px -2px 0 rgba(0,0,0,0.35), inset 2px 2px 0 rgba(255,215,0,0.25), 0 0 12px rgba(255,215,0,0.35)"
                    : undefined,
                }}
              >
                <span className="mr-1">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </header>
  );
}
