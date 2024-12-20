import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day14/input", {
  encoding: "utf-8",
});

const lines = input.split("\n");

const getRobots = () =>
  lines.map(line => {
    const [p, v] = line.split(" ");

    const [px, py] = p.substring(2).split(",");
    const [vx, vy] = v.substring(2).split(",");

    return {
      x: Number(px),
      y: Number(py),
      vx: Number(vx),
      vy: Number(vy),
    };
  });

const height = 103,
  width = 101;

const part1 = () => {
  let robots = getRobots();

  let q1 = 0,
    q2 = 0,
    q3 = 0,
    q4 = 0;

  const middleX = Math.floor(width / 2);
  const middleY = Math.floor(height / 2);

  for (let robot of robots) {
    robot.x += robot.vx * 100;
    robot.x %= width;

    robot.y += robot.vy * 100;
    robot.y %= height;

    if (robot.x < 0) {
      robot.x += width;
    }
    if (robot.y < 0) {
      robot.y += height;
    }

    if (robot.x === middleX || robot.y === middleY) continue;

    if (robot.y < middleY && robot.x < middleX) {
      q1++;
    } else if (robot.y < middleY && robot.x > middleX) {
      q2++;
    } else if (robot.y > middleY && robot.x < middleX) {
      q3++;
    } else if (robot.y > middleY && robot.x > middleX) {
      q4++;
    }
  }

  const factor = q1 * q2 * q3 * q4;
  console.log(factor);
};

part1();
