import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day12/input", {
  encoding: "utf-8",
});
const lines = input.split("\n");
const matrix = lines.map(line => line.split(""));
const printMatrix = (matrix: any[][]) => {
  for (const line of matrix) {
    console.log(line.join(""));
  }
  console.log("\n");
};

const moves = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const getSurroundings = (
  char: string,
  x: number,
  y: number,
  visited: boolean[][],
  regionPoints: Set<number[]>,
): Set<number[]> => {
  if (char !== matrix[y]?.[x] || visited[y][x]) {
    return new Set();
  }

  regionPoints.add([x, y]);
  visited[y][x] = true;

  for (const [deltaX, deltaY] of moves) {
    regionPoints.union(getSurroundings(char, x + deltaX, y + deltaY, visited, regionPoints));
  }

  return regionPoints;
};

const part1 = () => {
  const visited: boolean[][] = [...Array(matrix.length)].map(() => [...Array(matrix.length)].map(() => false));

  let regions: Set<number[]>[] = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (visited[y][x]) {
        continue;
      }

      const char = matrix[y][x];
      const result: Set<number[]> = getSurroundings(char, x, y, visited, new Set());
      regions.push(result);
    }
  }

  console.log(regions);

  let total = 0;

  // for (const region of regions) {
  //   const area = region.size;
  //   const perimeter = region.size;
  //
  //   total += area * perimeter;
  // }
};

part1();
