import fs from "fs";

const input: string = fs.readFileSync("./src/day8/input", {
  encoding: "utf-8",
});
const lines = input.split("\n");
const pattern = lines[0];
const nodes = lines.slice(2);

const part1 = () => {
  let points: string[] = [];

  const map: { [point: string]: string[] } = nodes.reduce((acum, node) => {
    const [point, options] = node.split(" = ");
    const matches = options.match(/(\w+), (\w+)/);

    if (point.endsWith("A")) {
      points.push(point);
    }

    acum[point] = [matches[1], matches[2]];

    return acum;
  }, {});

  console.log("points", points);

  let index = 0;

  let steps = 1;

  while (true) {
    const LR = pattern[index % pattern.length];

    points = points.map(point => map[point][LR === "L" ? 0 : 1]);

    if (points.every(point => point.endsWith("Z"))) {
      console.log("FINAL POINTNS", points);
      break;
    }

    steps++;
    index++;
  }

  console.log(steps);
};

part1();
