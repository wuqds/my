import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "吴家鑫的冒险者档案 · Pixel RPG Portfolio",
  description: "像素 RPG 风格的个人作品集 — 吴家鑫 · 后端 / 全栈工程师",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <div className="crt-overlay" />
      </body>
    </html>
  );
}
