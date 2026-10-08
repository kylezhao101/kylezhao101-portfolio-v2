"use client";

import { useEffect, useRef } from "react";

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

/** Render a static ordered-dither texture; CSS handles slide crossfades. */
export function useDitherTexture(source: string) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const image = new Image();
    let disposed = false;
    let frame = 0;
    let loaded = false;

    function draw() {
      if (disposed || !canvas || !context || !image.naturalWidth) return;
      const width = Math.ceil(canvas.clientWidth / 3);
      const height = Math.ceil(canvas.clientHeight / 3);
      if (!width || !height) return;
      canvas.width = width;
      canvas.height = height;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const cropWidth = width / scale;
      const cropHeight = height / scale;
      context.drawImage(image,
        (image.naturalWidth - cropWidth) / 2, (image.naturalHeight - cropHeight) / 2,
        cropWidth, cropHeight, 0, 0, width, height);
      const pixels = context.getImageData(0, 0, width, height);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const luminance = (pixels.data[i] * 0.2126 + pixels.data[i + 1] * 0.7152 + pixels.data[i + 2] * 0.0722) / 255;
          const threshold = (BAYER[(y % 4) * 4 + x % 4] + 0.5) / 16;
          pixels.data[i] = 8;
          pixels.data[i + 1] = 145;
          pixels.data[i + 2] = 178;
          // Invert brightness so highlights produce denser dots than shadows.
          pixels.data[i + 3] = (1 - luminance) < threshold ? 255 : 0;
        }
      }
      context.putImageData(pixels, 0, 0);
    }

    function schedule() {
      if (!loaded) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    }
    image.onload = () => {
      loaded = true;
      schedule();
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      image.src = source;
      if (image.complete && image.naturalWidth) {
        loaded = true;
        schedule();
      }
      visibilityObserver.disconnect();
    }, { rootMargin: "200px" });
    visibilityObserver.observe(canvas);
    const observer = new ResizeObserver(schedule);
    observer.observe(canvas);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibilityObserver.disconnect();
      image.onload = null;
    };
  }, [source]);

  return canvasRef;
}
