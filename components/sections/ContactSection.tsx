"use client";

import { useInView } from "@/hooks/useInView";
import { contact, personalInfo } from "@/data/personal-data";
import { SectionHeading } from "./CharacterSection";

const LINKS = [
  {
    icon: "📧",
    label: "邮箱",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: "📱",
    label: "电话",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/-/g, "")}`,
  },
  {
    icon: "📍",
    label: "所在地",
    value: contact.location,
    href: undefined,
  },
];

export default function ContactSection() {
  const { ref, isVisible } = useInView(0.2);

  return (
    <section id="contact" ref={ref} className="relative py-24 px-4 max-w-4xl mx-auto">
      <SectionHeading subtitle="CONTACT">联络驿站</SectionHeading>

      <div
        className={`pixel-panel pixel-panel-gold p-6 sm:p-10 text-center ${
          isVisible ? "section-visible" : "opacity-0"
        }`}
      >
        <div className="text-4xl mb-4" style={{ animation: "float 3s ease-in-out infinite" }}>
          📬
        </div>

        <p className="font-pixel text-xs text-[var(--color-text-gold)] mb-2">
          MESSAGE IN A BOTTLE
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
          如果你对我的冒险经历感兴趣，或者有任何合作机会，欢迎通过以下方式联系我。
          每一封来信都会被认真阅读！
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {LINKS.map((link) => {
            const Tag = link.href ? "a" : "div";
            return (
              <Tag
                key={link.label}
                {...(link.href
                  ? { href: link.href, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="pixel-panel p-4 flex flex-col items-center gap-2 tilt-hover"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="font-pixel text-[10px] text-[var(--color-text-gold)]">
                  {link.label}
                </span>
                <span className="text-xs text-[var(--color-text-primary)] break-all">
                  {link.value}
                </span>
              </Tag>
            );
          })}
        </div>

        {/* ASCII art */}
        <div className="font-pixel text-[9px] sm:text-[10px] text-[var(--color-border-inner)] leading-relaxed whitespace-pre select-none">
{`    ╔══════════════════════╗
    ║   感谢你的阅读！   ║
    ║  THANK YOU FOR      ║
    ║  VISITING MY WORLD  ║
    ╚══════════════════════╝`}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center space-y-2">
        <p className="font-pixel text-[9px] text-[var(--color-text-muted)]">
          {personalInfo.name} · PIXEL RPG PORTFOLIO · 2024-2026
        </p>
        <p className="font-pixel text-[8px] text-[var(--color-border-inner)]">
          POWERED BY NEXT.JS · TAILWIND · ❤️
        </p>
        <div className="flex items-center justify-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="inline-block w-1.5 h-1.5 bg-[var(--color-border-inner)]"
              style={{
                animation: `blink 1.4s steps(2) ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </footer>
    </section>
  );
}
