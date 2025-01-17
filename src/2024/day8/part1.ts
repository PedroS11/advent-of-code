import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day8/input", {
  encoding: "utf-8",
});

const lines: string[] = input.split("\n");
const matrix: string[][] = lines.map(line => line.split(""));

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

const part1 = () => {
  const antinodes: Set<string> = new Set<string>();
  const charLocations: { [char: string]: string[] } = getCharLocations();

  const arrayOfLocations = Object.values(charLocations);

  const basicMaze: string[][] = matrix; //replaceNonChars(Object.keys(charLocations)[0]);

  for (const locations of arrayOfLocations) {
    locations.forEach((location, index) => {
      let startingIndex = 0;

      locations.forEach(newLocation => {
        if (index !== startingIndex) {
          const [sX, sY] = location.split(",").map(Number);
          const [lX, lY] = newLocation.split(",").map(Number);

          const deltaX = lX - sX;
          const deltaY = lY - sY;

          if (basicMaze[lY + deltaY]?.[lX + deltaX]) {
            antinodes.add(`${lX + deltaX},${lY + deltaY}`);
          }
        }
        startingIndex++;
      });
    });
  }
  console.log(antinodes.size);
};

part1();
