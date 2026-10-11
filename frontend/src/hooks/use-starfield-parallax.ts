"use client";

import { useEffect, useRef } from "react";

export function useStarfieldParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const section = layer?.closest("section");
    if (!layer || !section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let mouseX = 0;
    let mouseY = 0;

    const update = () => {
      frame = 0;
      if (preference.matches) {
        layer.style.transform = "none";
        return;
      }
      const bounds = section.getBoundingClientRect();
      const distance = window.innerHeight / 2 - (bounds.top + bounds.height / 2);
      const offset = Math.max(-20, Math.min(20, distance * 0.04));
      layer.style.transform = `translate(${mouseX.toFixed(2)}px, ${(offset + mouseY).toFixed(2)}px)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || preference.matches) return;
      const bounds = section.getBoundingClientRect();
      mouseX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
      mouseY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
      schedule();
    };
    const leave = () => {
      mouseX = 0;
      mouseY = 0;
      schedule();
    };
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(section);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      observer.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  return ref;
}
