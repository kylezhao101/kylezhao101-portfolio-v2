"use client";

import { useCallback, useState } from "react";
import { aboutStars } from "@/lib/about-stars";

export function useAboutStars() {
  const [stars, setStars] = useState(() => aboutStars.map((star) => ({ ...star, cycle: 0 })));
  const relocate = useCallback((id: number) => {
    setStars((current) => current.map((star) => {
      if (star.id !== id) return star;
      const cycle = star.cycle + 1;
      // Pure seeded updates remain stable if React replays the updater.
      let seed = Math.imul(id + 1, 0x45d9f3b) ^ Math.imul(cycle, 0x27d4eb2d);
      const coordinate = () => {
        seed ^= seed << 13;
        seed ^= seed >>> 17;
        seed ^= seed << 5;
        return Number((3 + (seed >>> 0) / 4294967296 * 94).toFixed(2));
      };
      return { ...star, cycle, x: coordinate(), y: coordinate() };
    }));
  }, []);
  return { stars, relocate };
}
