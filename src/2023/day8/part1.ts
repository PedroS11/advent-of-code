import fs from "fs";

const input: string = fs.readFileSync("./src/day8/input", {
  encoding: "utf-8",
});
const lines = input.split("\n");
const pattern = lines[0];
const nodes = lines.slice(2);

const part1 = () => {
  const map = nodes.reduce((acum, node) => {
    const [point, options] = node.split(" = ");
    const matches = options.match(/([A-Z]+), ([A-Z]+)/);

    acum[point] = [matches[1], matches[2]];

    return acum;
  }, {});

  let point = "AAA";
  let index = 0;

  let steps = 1;

  console.log(point);
  console.log(map);

  while (true) {
    const LR = pattern[index % pattern.length];
    point = map[point][LR === "L" ? 0 : 1];

    if (point === "ZZZ") {
      break;
    }

    steps++;
    index++;
  }

  console.log(steps);
};

part1();
