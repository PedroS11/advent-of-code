import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day18/input", {
  encoding: "utf-8",
});

let bytes: number[][] = input.split("\n").map(line => line.split(",").map(Number));

const printMatrix = (maze: string[][]) => {
  for (const line of maze) {
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

const findShortestPath = (map: string[][], distances: number[][], x: number, y: number): number => {
  let queue = [[x, y]];

  while (queue.length > 0) {
    let [x, y] = queue.shift();

    const distance = distances[y][x];
    for (const [deltaX, deltaY] of moves) {
      if (map[y + deltaY]?.[x + deltaX] === ".") {
        const newDistance = distance + 1;
        if (newDistance < distances[y + deltaY][x + deltaX]) {
          distances[y + deltaY][x + deltaX] = distance + 1;
          queue.push([x + deltaX, y + deltaY]);
        }
      }
    }
  }

  return distances[70][70];
};

const part1 = async () => {
  let map: string[][] = Array(71)
    .fill(null)
    .map(() => Array(71).fill("."));

  let [x, y] = [0, 0];

  for (const [ox, oy] of bytes) {
    map[oy][ox] = "#";
  }

  let distances: number[][] = Array(71)
    .fill(null)
    .map(() => Array(71).fill(Infinity));

  distances[y][x] = 0;

  const steps = findShortestPath(map, distances, x, y);

  console.log(steps);
};

(async () => await part1())();
