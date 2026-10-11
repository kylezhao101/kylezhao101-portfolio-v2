const smiley = [
  "0000111110000",
  "0011000001100",
  "0100000000010",
  "0100100010010",
  "1000100010001",
  "1000000000001",
  "1000000000001",
  "1001000001001",
  "0100100010010",
  "0100011100010",
  "0011000001100",
  "0000111110000",
];

/** Center the motif on existing grid cells so its pixels share the grid spacing. */
export function isSmileyPixel(column: number, row: number, columns: number, rows: number) {
  const x = column - Math.floor((columns - smiley[0].length) / 2);
  const y = row - Math.floor((rows - smiley.length) / 2);
  return smiley[y]?.[x] === "1";
}
