import fs from "fs";

const input: string = fs.readFileSync("./input", {
  encoding: "utf-8",
});

const [map, commandsLine] = input.split(/\s+\n/);

const parseMap = (map: string): string[][] => {
  const lines: string[] = map.split("\n");
  return lines.map(line => line.split(""));
};

function wait(time) {
  return new Promise(res => setTimeout(res, time));
}

const printMatrix = (matrix: string[][]) => {
  const result = [];
  for (const line of matrix) {
    result.push(line.join(""));
  }
  return result.join("\n");
};

const getRobot = (matrix: string[][]): number[] => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "@") {
        return [j, i];
      }
    }
  }
};

const moves = {
  ">": [1, 0],
  "^": [0, -1],
  "<": [-1, 0],
  v: [0, 1],
};

const processLine = (matrix: string[][], x: number, y: number, deltaX: number, deltaY: number) => {
  const tile = matrix[y][x];
  if (tile === "#") {
    return false;
  }
  if (tile === ".") {
    matrix[y][x] = matrix[y - deltaY][x - deltaX];
    matrix[y - deltaY][x - deltaX] = ".";
    return true;
  }

  const shouldMove = processLine(matrix, x + deltaX, y + deltaY, deltaX, deltaY);

  if (shouldMove) {
    matrix[y][x] = matrix[y - deltaY][x - deltaX];
    matrix[y - deltaY][x - deltaX] = ".";
  }
  return shouldMove;
};

const part1 = async () => {
  const matrix: string[][] = parseMap(map);
  const commands = commandsLine.split("\n").join("").split("");

  let [x, y]: number[] = getRobot(matrix);

  for (const command of commands) {
    console.log(`\u001b[1;1H\u001b[0J\n${printMatrix(matrix)}`);
    await wait(400);

    const [deltaX, deltaY] = moves[command];

    const nextPos: number[] = [x + deltaX, y + deltaY];
    const tile: string = matrix[nextPos[1]][nextPos[0]];

    if (tile === "#") {
      continue;
    }

    let shouldMove = false;
    if (tile === "O") {
      shouldMove = processLine(matrix, x + deltaX, y + deltaY, deltaX, deltaY);
    }
    if (shouldMove || tile === ".") {
      matrix[y + deltaY][x + deltaX] = "@";
      matrix[y][x] = ".";
      [x, y] = nextPos;
    }
  }

  let total = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === "O") {
        total += y * 100 + x;
      }
    }
  }
  console.log(total);
};

(async () => await part1())();
