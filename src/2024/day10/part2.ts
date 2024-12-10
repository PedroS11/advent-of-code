import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day10/input", {
  encoding: "utf-8",
});

const lines: string[] = input.split("\n");
const matrix: string[][] = lines.map(line => line.split(""));

const getTrailheads = (): string[][] => {
  const trailheads: string[][] = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === "0") {
        trailheads.push([x.toString(), y.toString()]);
      }
    }
  }

  return trailheads;
};

const part2 = () => {
  let total = 0;
  const trailheads = getTrailheads();

  for (let [startX, startY] of trailheads) {
    let toVisit: number[][] = [];
    toVisit.push([Number(startX), Number(startY)]);

    while (toVisit.length) {
      const [x, y] = toVisit.shift();

      if (Number(matrix[y][x]) === 9) {
        total++;
        continue;
      }

      if (Number(matrix[y][x]) + 1 === Number(matrix[y + 1]?.[x])) {
        toVisit.push([x, y + 1]);
      }
      if (Number(matrix[y][x]) + 1 === Number(matrix[y - 1]?.[x])) {
        toVisit.push([x, y - 1]);
      }
      if (Number(matrix[y][x]) + 1 === Number(matrix[y]?.[x + 1])) {
        toVisit.push([x + 1, y]);
      }
      if (Number(matrix[y][x]) + 1 === Number(matrix[y]?.[x - 1])) {
        toVisit.push([x - 1, y]);
      }
    }
  }

  console.log(total);
};

part2();
