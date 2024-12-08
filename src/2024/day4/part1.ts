import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day4/input", {
  encoding: "utf-8",
});

const lines: string[] = input.split("\n");
const matrix: string[][] = lines.map(line => line.split(""));

const isMatrix = (x: number, y: number): number => {
  const horizontalRight = `${matrix?.[y]?.[x]}${matrix?.[y]?.[x + 1]}${matrix?.[y]?.[x + 2]}${matrix?.[y]?.[x + 3]}`;
  const horizontalLeft = `${matrix?.[y]?.[x]}${matrix?.[y]?.[x - 1]}${matrix?.[y]?.[x - 2]}${matrix?.[y]?.[x - 3]}`;

  const verticalDown = `${matrix?.[y]?.[x]}${matrix?.[y + 1]?.[x]}${matrix?.[y + 2]?.[x]}${matrix?.[y + 3]?.[x]}`;
  const verticalUp = `${matrix?.[y]?.[x]}${matrix?.[y - 1]?.[x]}${matrix?.[y - 2]?.[x]}${matrix?.[y - 3]?.[x]}`;

  const diagonalDownRight = `${matrix?.[y]?.[x]}${matrix?.[y + 1]?.[x + 1]}${matrix?.[y + 2]?.[x + 2]}${matrix?.[y + 3]?.[x + 3]}`;
  const diagonalUpRight = `${matrix?.[y]?.[x]}${matrix?.[y - 1]?.[x + 1]}${matrix?.[y - 2]?.[x + 2]}${matrix?.[y - 3]?.[x + 3]}`;

  const diagonalUpLeft = `${matrix?.[y]?.[x]}${matrix?.[y - 1]?.[x - 1]}${matrix?.[y - 2]?.[x - 2]}${matrix?.[y - 3]?.[x - 3]}`;
  const diagonalDownLeft = `${matrix?.[y]?.[x]}${matrix?.[y + 1]?.[x - 1]}${matrix?.[y + 2]?.[x - 2]}${matrix?.[y + 3]?.[x - 3]}`;

  return [
    horizontalRight,
    horizontalLeft,
    verticalDown,
    verticalUp,
    diagonalDownRight,
    diagonalUpRight,
    diagonalUpLeft,
    diagonalDownLeft,
  ]
    .map(pattern => ["XMAS", "SAMX"].includes(pattern))
    .filter(Boolean).length;
};

(() => {
  let total = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === "X") {
        total += +isMatrix(x, y);
      }
    }
  }

  console.log(total);
})();
