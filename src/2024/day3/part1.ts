import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day3/input", {
  encoding: "utf-8",
});

const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;

const part1 = () => {
  let total = 0;
  const matches = input.matchAll(/mul\((\d+),(\d+)\)/gm);
  for (const match of Array.from(matches)) {
    total += Number(match[1]) * Number(match[2]);
  }

  console.log(total);
};

const part11 = () => {
  const result = [...input.matchAll(regex)]
    .map(([, v1, v2]) => +v1 * +v2)
    .reduce((a, b) => a + b);

  console.log(result);
};

part11();
