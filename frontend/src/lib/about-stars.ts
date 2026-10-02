// Keep CSS values at fixed precision so SSR and browser style serialization agree.
const roundCssValue = (value: number) => Number(value.toFixed(2));

// A fixed integer seed gives an irregular field without hydration differences.
let seed = 0x51a7f13d;
const random = () => {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return (seed >>> 0) / 4294967296;
};

export const aboutStars = Array.from({ length: 104 }, (_, index) => {
  return {
    id: index,
    x: roundCssValue(3 + random() * 94),
    y: roundCssValue(3 + random() * 94),
    duration: roundCssValue(3.8 + random() * 3.4),
    delay: roundCssValue(-random() * 9),
  };
});
