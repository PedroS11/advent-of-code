import fs from "fs";

const input: string = fs.readFileSync("./input", {
  encoding: "utf-8",
});

const part1 = () => {
  const lines = input.split("\n");
  const left = [],
    right = [];

  for (const line of lines) {
    const [x, y] = line.split(/\s+/);
    left.push(x);
    right.push(y);
  }

  console.log(left, right);
  left.sort();
  right.sort();

  const distances = left.map((x, index) => Math.abs(x - right[index]));

  const result = distances.reduce((acum, value) => {
    acum += value;
    return acum;
  }, 0);

  console.log(result);
};

part1();
