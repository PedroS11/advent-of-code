import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day10/input", {
  encoding: "utf-8",
});

const lines: string[] = input.split("\n");
const matrix: string[][] = lines.map(line => line.split(""));

const moves = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const getTrailheads = (): string[][] => {
  const positions: string[][] = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === "0") {
        positions.push([x.toString(), y.toString()]);
      }
    }
  }

  return positions;
};

const part1 = () => {
  let total = 0;
  const trailheads = getTrailheads();

  for (let [startX, startY] of trailheads) {
    const visited = new Set();

    let toVisit: number[][] = [];
    toVisit.push([Number(startX), Number(startY)]);

    while (toVisit.length) {
      const [x, y] = toVisit.shift();

      if (!visited.has(`${x},${y}`) && Number(matrix[y][x]) === 9) {
        total++;
        visited.add(`${x},${y}`);
        continue;
      }

      for (const [moveX, moveY] of moves) {
        if (
          Number(matrix[y][x]) + 1 ===
          Number(matrix[y + moveY]?.[x + moveX])
        ) {
          toVisit.push([x + moveX, y + moveY]);
        }
      }

      // if (Number(matrix[y][x]) + 1 === Number(matrix[y + 1]?.[x])) {
      //   toVisit.push([x, y + 1]);
      // }
      // if (Number(matrix[y][x]) + 1 === Number(matrix[y - 1]?.[x])) {
      //   toVisit.push([x, y - 1]);
      // }
      // if (Number(matrix[y][x]) + 1 === Number(matrix[y]?.[x + 1])) {
      //   toVisit.push([x + 1, y]);
      // }
      // if (Number(matrix[y][x]) + 1 === Number(matrix[y]?.[x - 1])) {
      //   toVisit.push([x - 1, y]);
      // }
    }
  }

  console.log(total);
};

const hike = (x: number, y: number, visited: Set<string>): number => {
  if (visited.has(`${x},${y}`)) {
    return 0;
  }

  let acum = 0;

  if (matrix[y][x] === "9") {
    visited.add(`${x},${y}`);
    acum++;
  }

  for (const [moveX, moveY] of moves) {
    if (Number(matrix[y][x]) + 1 === Number(matrix[y + moveY]?.[x + moveX])) {
      acum += hike(x + moveX, y + moveY, visited);
    }
  }

  return acum;
};

const hike2 = (x: number, y: number, visited: Set<string>): number => {
  if (!visited.has(`${x},${y}`) && matrix[y][x] === "9") {
    visited.add(`${x},${y}`);
    return 1;
  }

  let acum = 0;

  for (const [moveX, moveY] of moves) {
    if (Number(matrix[y][x]) + 1 === Number(matrix[y + moveY]?.[x + moveX])) {
      acum += hike2(x + moveX, y + moveY, visited);
    }
  }

  return acum;
};

const part11 = () => {
  let total = 0;
  const trailheads = getTrailheads();

  for (let [startX, startY] of trailheads) {
    const visited: Set<string> = new Set();

    total += hike2(Number(startX), Number(startY), visited);
  }

  console.log(total);
};

part11();
