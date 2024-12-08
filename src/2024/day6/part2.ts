import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day6/input", {
  encoding: "utf-8",
});

const findInitialPos = (maze: string[][]) => {
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === "^") {
        return { x, y };
      }
    }
  }
};

const getMaze = () => input.split("\n").map(line => line.split(""));

const printMaze = (maze: string[][]) => {
  for (const line of maze) {
    console.log(line.join(""));
  }
  console.log("\n");
};

const turnRight = d => (d + 1) % 4;

const delta = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

let traversed = new Set();
const getPart1Positions = () => {
  const maze = getMaze();

  let dir = 0;

  let { y, x } = findInitialPos(maze);

  while (true) {
    traversed.add(`${x},${y}`);

    const [xDir, yDir] = delta[dir];

    if (!maze[y + yDir]?.[x + xDir]) {
      break;
    }

    if (maze[y + yDir][x + xDir] === "#") {
      dir = turnRight(dir);
    } else {
      y += yDir;
      x += xDir;
    }
  }
};

const isALoop = (maze: string[][]) => {
  let dir = 0;

  let obstacles: Set<string> = new Set();

  let { y, x } = findInitialPos(maze);

  while (true) {
    if (obstacles.has(`${x}-${y}-${dir}`)) {
      return true;
    }
    obstacles.add(`${x}-${y}-${dir}`);

    const [xDir, yDir] = delta[dir];

    if (!maze[y + yDir]?.[x + xDir]) {
      return false;
    }

    if (["O", "#"].includes(maze[y + yDir][x + xDir])) {
      dir = turnRight(dir);
    } else {
      y += yDir;
      x += xDir;
    }
  }
};

const part2 = () => {
  let count = 0;

  getPart1Positions();

  traversed.forEach((pos: string, index) => {
    const maze = getMaze();

    const [x, y] = pos.split(",").map(Number);
    if (!["#", "^"].includes(maze[y][x])) {
      maze[y][x] = "O";
      const isLoop = isALoop(maze);
      if (isLoop) {
        count++;
      }
      maze[y][x] = ".";
    }
  });

  console.log(count);
};

part2();
