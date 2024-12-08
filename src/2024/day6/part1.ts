import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day6/input", {
  encoding: "utf-8",
});

const lines: string[] = input.split("\n");
const matrix: string[][] = lines.map(line => line.split(""));

const findInitialPos = () => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === "^") {
        return { x, y };
      }
    }
  }
};

const printMaze = () => {
  for (const line of matrix) {
    console.log(line.join(""));
  }
  console.log("\n");
};

const part1 = () => {
  let xDir = 0,
    yDir = -1;

  let count = 1;
  let hitWall = false;
  let { y, x } = findInitialPos();

  matrix[y][x] = "X";

  do {
    let wentOverLeftRight = x + xDir < 0 || x + xDir >= matrix[0].length;
    let wentOverTopBottom = y + yDir < 0 || y + yDir >= matrix.length;

    if (wentOverLeftRight || wentOverTopBottom) {
      console.log(count);
      hitWall = true;
      return;
    }

    if (matrix[y + yDir][x + xDir] === "#") {
      if (xDir === 0 && yDir === -1) {
        xDir = 1;
        yDir = 0;
      } else if (xDir === 1 && yDir === 0) {
        xDir = 0;
        yDir = 1;
      } else if (xDir === 0 && yDir === 1) {
        xDir = -1;
        yDir = 0;
      } else {
        xDir = 0;
        yDir = -1;
      }
    }

    if (matrix[y + yDir][x + xDir] === ".") {
      matrix[y + yDir][x + xDir] = "X";
      count++;
    }

    y += yDir;
    x += xDir;
  } while (!hitWall);
};

part1();
