import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day4/input", {
  encoding: "utf-8",
});

const lines: string[] = input.split("\n");
const matrix: string[][] = lines.map(line => line.split(""));

const isMAS = (pattern: string): boolean => {
  return pattern === "MAS" || pattern === "SAM";
};

const isMatrix = (x: number, y: number): boolean => {
  const diagonalDownRight = `${matrix?.[y - 1]?.[x - 1]}${matrix?.[y]?.[x]}${matrix?.[y + 1]?.[x + 1]}`;
  const diagonalUpLeft = `${matrix?.[y + 1]?.[x + 1]}${matrix?.[y]?.[x]}${matrix?.[y - 1]?.[x - 1]}`;

  const diagonalUpRight = `${matrix?.[y + 1]?.[x - 1]}${matrix?.[y]?.[x]}${matrix?.[y - 1]?.[x + 1]}`;
  const diagonalDownLeft = `${matrix?.[y - 1]?.[x + 1]}${matrix?.[y]?.[x]}${matrix?.[y + 1]?.[x - 1]}`;

  return (isMAS(diagonalDownRight) &&
      [diagonalUpRight, diagonalDownLeft].some(isMAS)) ||
    (isMAS(diagonalUpLeft) && [diagonalUpRight, diagonalDownLeft].some(isMAS))
  )
};

(() => {
  let total = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === "A") {
        total += +isMatrix(x, y);
      }
    }
  }

  console.log(total);
})();
