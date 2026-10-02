/** Top-to-bottom bias with enough jitter for neighboring rows to overlap. */
export function gridRevealDelay(row: number, rows: number, random: number) {
  return (row / Math.max(rows - 1, 1)) * 0.5 + random * 0.3;
}

export function gridRevealOpacity(elapsed: number, delay: number) {
  const progress = Math.min(1, Math.max(0, (elapsed - delay) / 0.2));
  return progress * progress * (3 - 2 * progress);
}
