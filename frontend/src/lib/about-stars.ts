// Keep CSS values at fixed precision so SSR and browser style serialization agree.
const roundCssValue = (value: number) => Number(value.toFixed(2));

// Deterministic positions keep server and client rendering identical.
export const aboutStars = Array.from({ length: 104 }, (_, index) => {
  const column = index % 13;
  const row = Math.floor(index / 13);
  const jitterX = Math.sin(index * 17.3 + 2) * 2;
  const jitterY = Math.cos(index * 11.7 + 1) * 3;
  return {
    id: index,
    x: roundCssValue(5 + column * 7.5 + jitterX),
    y: roundCssValue(6 + row * 12.5 + jitterY),
    duration: roundCssValue(4.5 + (index % 7) * 0.65),
    delay: roundCssValue(-(index * 1.37 % 9)),
  };
});
