import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day8/input", {
  encoding: "utf-8",
});

const lines: string[] = input.split("\n");
const matrix: string[][] = lines.map(line => line.split(""));

const printMatrix = (maze: string[][]) => {
  for (const line of maze) {
    console.log(line.join(""));
  }
  console.log("\n");
};
const printAntiNodes = (antinodes: Set<string>, matrix: string[][]) => {
  const solvedMatrix = JSON.parse(JSON.stringify(matrix));

  antinodes.forEach(location => {
    const [x, y] = location.split(",");
    solvedMatrix[y][x] = "#";
  });

  printMatrix(solvedMatrix);
};

const getCharLocations = (): { [char: string]: string[] } => {
  const charLocations: { [char: string]: string[] } = {};

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (/[\dA-z]/.test(matrix[y][x])) {
        const char: string = matrix[y][x];

        if (!charLocations[char]) {
          charLocations[char] = [];
        }
        charLocations[char].push(`${x},${y}`);
      }
    }
  }

  return charLocations;
};

const drawLine = (
  matrix: string[][],
  sX: number,
  sY: number,
  deltaX: number,
  deltaY: number,
) => {
  const antinodes: Set<string> = new Set<string>();
  let mult = 1;

  while (true) {
    if (matrix[sX + mult * deltaX]?.[sY + mult * deltaY]) {
      antinodes.add(`${sX + mult * deltaX},${sY + mult * deltaY}`);
    } else {
      break;
    }
    mult++;
  }

  return antinodes;
};

const part1 = () => {
  let antinodes: Set<string> = new Set<string>();
  const charLocations: { [char: string]: string[] } = getCharLocations();

  const arrayOfLocations = Object.values(charLocations);

  for (const locations of arrayOfLocations) {
    locations.forEach((location, index) => {
      let startingIndex = 0;
      const [sX, sY] = location.split(",").map(Number);

      locations.forEach(newLocation => {
        if (index !== startingIndex) {
          const [lX, lY] = newLocation.split(",").map(Number);

          const deltaX = lX - sX;
          const deltaY = lY - sY;

          const nodes = drawLine(matrix, sX, sY, deltaX, deltaY);
          antinodes = antinodes.union(nodes);
        }
        startingIndex++;
      });
    });
  }
  console.log(antinodes.size);
};

part1();
