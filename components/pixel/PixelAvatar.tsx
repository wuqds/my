"use client";

import { useEffect, useRef, useState } from "react";

interface PixelAvatarProps {
  src: string;
  size?: number;
  pixelGrid?: number;
  level?: number;
  className?: string;
  raw?: boolean;
}

export default function PixelAvatar({
  src,
  size = 192,
  pixelGrid = 192,
  level = 22,
  className = "",
  raw = false,
}: PixelAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pixelSrc, setPixelSrc] = useState<string>("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = pixelGrid;
      canvas.height = pixelGrid;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const minDim = Math.min(img.width, img.height);
      const sx = (img.width - minDim) / 2;
      const sy = (img.height - minDim) / 2;

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, pixelGrid, pixelGrid);

      const data = ctx.getImageData(0, 0, pixelGrid, pixelGrid);
      for (let i = 0; i < data.data.length; i += 4) {
        const factor = 1.18;
        data.data[i] = Math.min(255, Math.max(0, (data.data[i] - 128) * factor + 132));
        data.data[i + 1] = Math.min(255, Math.max(0, (data.data[i + 1] - 128) * factor + 132));
        data.data[i + 2] = Math.min(255, Math.max(0, (data.data[i + 2] - 128) * factor + 132));
      }
      ctx.putImageData(data, 0, 0);
      setPixelSrc(canvas.toDataURL());
    };
    img.src = src;
  }, [src, pixelGrid]);

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <div
        className={`relative inline-block ${className}`}
        style={{ width: size, height: size }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* 外层光晕 */}
        <div
          className="absolute -inset-3 rounded-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255, 215, 0, 0.3), transparent 65%)",
            animation: "pulse-glow 2.5s ease-in-out infinite",
          }}
        />

        {/* 框 + 像素图 */}
        <div
          className="relative w-full h-full"
          style={{
            animation: hover
              ? "shake 0.4s steps(2) infinite"
              : "float 3s ease-in-out infinite",
          }}
        >
          {pixelSrc ? (
            <img
              src={pixelSrc}
              alt="吴家鑫 像素头像"
              style={{
                width: size,
                height: size,
                imageRendering: "pixelated",
                filter: hover ? "saturate(1.4)" : "saturate(1.1)",
                transition: "filter 0.2s",
              }}
              className="border-4 border-[var(--color-border-gold)] block"
            />
          ) : (
            <div
              className="border-4 border-[var(--color-border-gold)] flex items-center justify-center font-pixel text-xs"
              style={{ width: size, height: size, background: "var(--color-bg-panel)" }}
            >
              LOADING...
            </div>
          )}

          {/* 像素角装饰 */}
          <span className="absolute -top-1 -left-1 w-2 h-2 bg-[var(--color-text-gold)]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-text-gold)]" />
          <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[var(--color-text-gold)]" />
          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[var(--color-text-gold)]" />
        </div>

        {/* 等级徽章 */}
        <div
          className="absolute -top-3 -right-3 font-pixel text-[10px] bg-[var(--color-bg-panel)] border-2 border-[var(--color-border-gold)] px-2 py-1 glow-gold"
          style={{ color: "var(--color-text-gold)", letterSpacing: "0.05em" }}
        >
          Lv.{level}
        </div>

        {/* HP / MP 微型条 */}
        <div className="absolute -bottom-5 left-0 right-0 flex gap-1 px-1">
          <div className="flex-1 h-1.5 bg-black border border-[var(--color-border-outer)]">
            <div
              className="h-full"
              style={{ width: "92%", background: "linear-gradient(to right, #ef4444, #f97316)" }}
            />
          </div>
          <div className="flex-1 h-1.5 bg-black border border-[var(--color-border-outer)]">
            <div
              className="h-full"
              style={{ width: "78%", background: "linear-gradient(to right, #3b82f6, #7df9ff)" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
