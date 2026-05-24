"use client";

import { useEffect, useRef, useState } from "react";

type PixelCertificateImageProps = {
  src: string;
  alt: string;
  detail?: boolean;
  className?: string;
};

export default function PixelCertificateImage({
  src,
  alt,
  detail = false,
  className = "",
}: PixelCertificateImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pixelSrc, setPixelSrc] = useState("");

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const targetWidth = detail ? 240 : 92;
      const targetHeight = Math.max(60, Math.round(targetWidth * (img.height / img.width)));
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const frame = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const data = frame.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const avg = (r + g + b) / 3;
        const contrast = avg > 180 ? 1.08 : 1.24;
        data[i] = Math.min(255, Math.round(((r - 128) * contrast + 142) / 32) * 32);
        data[i + 1] = Math.min(255, Math.round(((g - 128) * contrast + 138) / 32) * 32);
        data[i + 2] = Math.min(255, Math.round(((b - 128) * contrast + 132) / 32) * 32);
      }
      ctx.putImageData(frame, 0, 0);

      ctx.strokeStyle = "rgba(30, 35, 48, 0.85)";
      ctx.lineWidth = detail ? 2 : 1;
      ctx.strokeRect(1, 1, targetWidth - 2, targetHeight - 2);

      if (!cancelled) setPixelSrc(canvas.toDataURL("image/png"));
    };

    img.onerror = () => {
      if (!cancelled) setPixelSrc(src);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [detail, src]);

  return (
    <div className={`pixel-cert-frame ${className}`}>
      <canvas ref={canvasRef} className="hidden" />
      {pixelSrc ? (
        <img src={pixelSrc} alt={alt} className="pixel-cert-img" />
      ) : (
        <div className="pixel-cert-loading">...</div>
      )}
    </div>
  );
}
