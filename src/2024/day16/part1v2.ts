import fs from "fs";

const input: string = fs.readFileSync("./input", {
  encoding: "utf-8",
});

type Position = { x: number; y: number };

type Cell = {
  char: string;
  distance: number;
  position: Position;
  direction: number[];
  previous?: Cell;
  steps: number;
};

const lines = input.split("\n");

const map: Cell[][] = lines.map((line: string, y: number) =>
  line.split("").map(
    (row: string, x) =>
      ({
        char: row,
        distance: 999999,
        steps: 9999,
        position: {
          x,
          y,
        },
      }) as Cell,
  ),
);

const moves = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const findPosition = (map: Cell[][], char: string): Cell => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].char === char) {
        return map[y][x];
      }
    }
  }
};

const djikstra = (start: Cell, end: Cell): Cell => {
  const queue = [start];

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const cell = queue.shift();
    const { distance, position, direction, steps } = cell;
    const { x, y } = position;

    for (const move of moves) {
      const [deltaX, deltaY] = move;
      const newX = x + deltaX;
      const newY = y + deltaY;

      if (["S", "E", "."].includes(map[newY]?.[newX]?.char)) {
        let newDistance = distance;
        let newDirection = direction;
        let newSteps = steps;

        if (move.toString() === direction.toString()) {
          newDistance++;
        } else {
          newDistance += 1001;
          newDirection = move;
        }

        newSteps++;

        if (map[newY][newX].distance > newDistance) {
          map[newY][newX].distance = newDistance;
          map[newY][newX].direction = newDirection;
          map[newY][newX].previous = cell;
          map[newY][newX].steps = newSteps;
          queue.push(map[newY][newX]);
        }
      }
    }
  }

  return map[end.position.y][end.position.x];
};

const getArrow = (direction: string): string => {
  switch (direction) {
    case [0, 1].toString():
      return "v";
    case [0, -1].toString():
      return "^";
    case [1, 0].toString():
      return ">";
    case [-1, 0].toString():
      return "<";
  }
};

const printMap = () => {
  console.log("-".padStart(map[0].length));
  for (let y = 0; y < map.length; y++) {
    let line = "";
    for (let x = 0; x < map[y].length; x++) {
      line += map[y][x].char;
      // line += `|${map[y][x].distance.toString().padStart(6, "0")}`;
    }
    console.log(line);
  }
  console.log();
};

const part1 = async () => {
  const start: Cell = findPosition(map, "S");
  start.distance = 0;
  start.direction = [1, 0];
  start.steps = 0;

  const end: Cell = findPosition(map, "E");

  const found: Cell = djikstra(start, end);

  const queue = [found];
  const path: Cell[] = [];

  while (queue.length) {
    const cell = queue.shift();
    path.push(cell);
    if (cell.previous) {
      queue.push(cell.previous);
    }
  }

  console.log(path.reverse());
  for (const cell of path) {
    map[cell.position.y][cell.position.x].char = getArrow(
      map[cell.position.y][cell.position.x].direction.toString(),
    );
  }

  console.log(path.length);

  printMap();
};

(async () => await part1())();
