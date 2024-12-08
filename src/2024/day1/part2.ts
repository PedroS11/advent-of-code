import fs from "fs";

const input: string = fs.readFileSync("./input", {
  encoding: "utf-8",
});

const part2 = () => {
  const lines = input.split("\n");
  const left = [],
    right = [];

  for (const line of lines) {
    const [x, y] = line.split(/\s+/);
    left.push(x);
    right.push(y);
  }

  const result = left.reduce((acum, id) => {
    const counter = right.filter(rId => rId === id).length;
    acum += id * counter;
    return acum;
  }, 0);

  console.log(result);
};
const part21 = () => {
  const lines = input.split("\n");

  const left = [];
  const counter = {};

  for (const line of lines) {
    const [x, y] = line.split(/\s+/).map(Number);
    left.push(x);
    counter[y] = (counter[y] ?? 0) + 1;
  }

  let result = 0;
  left.forEach(id => {
    result += id * (counter[id] ?? 0);
  });

  console.log(result);
};

part21();
