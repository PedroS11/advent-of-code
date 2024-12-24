import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day18/input", {
  encoding: "utf-8",
});

type Cell = {
  char: string;
  distance: number;
};

let bytes: number[][] = input.split("\n").map(line => line.split(",").map(Number));

const moves = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const findShortestPath = (map: Cell[][], x: number, y: number): void => {
  let queue = [[x, y]];

  while (queue.length > 0) {
    let [x, y] = queue.shift();
    const { distance } = map[y][x];

    for (const [deltaX, deltaY] of moves) {
      const newPosition = map[y + deltaY]?.[x + deltaX];
      if (newPosition?.char === ".") {
        const newDistance = distance + 1;

        if (newDistance < newPosition.distance) {
          map[y + deltaY][x + deltaX].distance = distance + 1;
          queue.push([x + deltaX, y + deltaY]);
        }
      }
    }
  }
};

const HEIGHT = 71;
const WIDTH = 71;

const createMap = (width: number, height: number): Cell[][] => {
  let map: Cell[][] = [];
  for (let y = 0; y < height; y++) {
    let row: Cell[] = [];

    for (let x = 0; x < width; x++) {
      row.push({ char: ".", distance: Infinity });
    }

    map[y] = row;
  }

  map[0][0].distance = 0;

  return map;
};

const resetMap = (map: Cell[][]): void => {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      map[y][x].distance = Infinity;
    }
  }

  map[0][0].distance = 0;
};

const part2 = async () => {
  let map: Cell[][] = createMap(WIDTH, HEIGHT);

  let [x, y] = [0, 0];
  let [endX, endY] = [WIDTH - 1, HEIGHT - 1];

  for (const [ox, oy] of bytes) {
    map[oy][ox].char = "#";
    findShortestPath(map, x, y);

    const distance = map[endX][endY].distance;
    if (distance === Infinity) {
      console.log(ox, oy);
      break;
    }
    resetMap(map);
  }
};

(async () => await part2())();
