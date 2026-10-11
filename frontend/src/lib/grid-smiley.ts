const smiley = [
  "000000000",
  "001000100",
  "001000100",
  "000000000",
  "010000010",
  "001000100",
  "000111000",
];

/** Center the motif on existing grid cells so its pixels share the grid spacing. */
export function isSmileyPixel(column: number, row: number, columns: number, rows: number) {
  const x = column - Math.floor((columns - smiley[0].length) / 2);
  const y = row - Math.floor((rows - smiley.length) / 2);
  return smiley[y]?.[x] === "1";
}
