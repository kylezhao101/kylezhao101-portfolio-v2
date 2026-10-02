"use client";

import { useEffect, useRef } from "react";

/** Pixelates a cover image's perimeter without updating React on animation frames. */
export function useEdgeMosaic(source: string) {
  const targetRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!target || !image || !canvas) return;
    const context = canvas.getContext("2d");
    const samples = document.createElement("canvas");
    const sampleContext = samples.getContext("2d");
    if (!context || !sampleContext) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let hovered = false;
    let focused = false;
    let opacity = 0;
    let velocity = 0;
    let phase = 0;
    let lastFrame = 0;
    let lastPointer: { x: number; y: number; time: number } | null = null;
    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;

    function prepare() {
      if (!image || !canvas || !context || !sampleContext) return;
      width = image.clientWidth;
      height = image.clientHeight;
      if (!width || !height || !image.naturalWidth) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.imageSmoothingEnabled = false;
      columns = Math.ceil(width / 24);
      rows = Math.ceil(height / 24);
      samples.width = columns;
      samples.height = rows;
      // Match the image's centered object-cover crop before sampling its colors.
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const cropWidth = width / scale;
      const cropHeight = height / scale;
      sampleContext.drawImage(image,
        (image.naturalWidth - cropWidth) / 2, (image.naturalHeight - cropHeight) / 2,
        cropWidth, cropHeight, 0, 0, columns, rows);
    }

    function tick(now: number) {
      if (!context) return;
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;
      const active = hovered || focused;
      opacity += ((active ? 1 : 0) - opacity) * (1 - Math.exp(-dt * 10));
      velocity *= Math.exp(-dt * 4);
      phase += dt * (1.2 + velocity * 8);
      context.clearRect(0, 0, width, height);
      const cellWidth = width / columns;
      const cellHeight = height / rows;
      const band = Math.min(width, height) * 0.28;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const px = (x + 0.5) * cellWidth;
          const py = (y + 0.5) * cellHeight;
          const edge = Math.min(px, py, width - px, height - py);
          if (edge >= band) continue;
          const seed = x * 12.9898 + y * 78.233;
          const wave = (Math.sin(phase + seed) + 1) / 2;
          const strength = (1 - edge / band) ** 0.4;
          // Shift neighboring color samples so the mosaic changes visibly over time.
          const sampleX = Math.max(0, Math.min(columns - 1,
            x + Math.round(Math.sin(phase + seed) * 2)));
          const sampleY = Math.max(0, Math.min(rows - 1,
            y + Math.round(Math.cos(phase * 0.7 + seed) * 2)));
          context.globalAlpha = opacity * strength * (0.65 + wave * 0.35);
          context.drawImage(samples, sampleX, sampleY, 1, 1,
            x * cellWidth, y * cellHeight, cellWidth + 0.5, cellHeight + 0.5);
        }
      }
      context.globalAlpha = 1;
      if (active || opacity > 0.005) {
        frame = requestAnimationFrame(tick);
      } else {
        context.clearRect(0, 0, width, height);
        frame = 0;
      }
    }

    function start() {
      if (frame || reducedMotion.matches || document.hidden) return;
      prepare();
      lastFrame = performance.now();
      frame = requestAnimationFrame(tick);
    }
    function enter(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      hovered = true;
      lastPointer = null;
      start();
    }
    function leave() {
      hovered = false;
      lastPointer = null;
      velocity = 0;
    }
    function move(event: PointerEvent) {
      if (!hovered) return;
      const now = performance.now();
      if (lastPointer) {
        const elapsed = Math.max(now - lastPointer.time, 8);
        const speed = Math.hypot(event.clientX - lastPointer.x, event.clientY - lastPointer.y) / elapsed;
        velocity = Math.min(1, velocity * 0.5 + speed / 2 * 0.5);
      }
      lastPointer = { x: event.clientX, y: event.clientY, time: now };
    }
    function focus() {
      focused = target?.matches(":focus-visible") ?? false;
      if (focused) start();
    }
    function blur() { focused = false; }
    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      opacity = 0;
      velocity = 0;
      lastPointer = null;
      context?.clearRect(0, 0, width, height);
      if (hovered || focused) start();
    }

    const observer = new ResizeObserver(prepare);
    observer.observe(image);
    image.addEventListener("load", prepare);
    target.addEventListener("pointerenter", enter);
    target.addEventListener("pointerleave", leave);
    target.addEventListener("pointercancel", leave);
    target.addEventListener("pointermove", move);
    target.addEventListener("focus", focus);
    target.addEventListener("blur", blur);
    reducedMotion.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    prepare();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      image.removeEventListener("load", prepare);
      target.removeEventListener("pointerenter", enter);
      target.removeEventListener("pointerleave", leave);
      target.removeEventListener("pointercancel", leave);
      target.removeEventListener("pointermove", move);
      target.removeEventListener("focus", focus);
      target.removeEventListener("blur", blur);
      reducedMotion.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
      context.clearRect(0, 0, width, height);
    };
  }, [source]);

  return { targetRef, imageRef, canvasRef };
}
