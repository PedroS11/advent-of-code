import fs from "fs";

const input: string = fs.readFileSync("./input", {
  encoding: "utf-8",
});
const lines = input.split("\n");

const isSafeReport = (levels: number[]): boolean => {
  let previousLevel = levels.shift();
  let direction = 0;

  for (const level of levels) {
    const delta = previousLevel - level;
    if (Math.abs(delta) > 3 || Math.abs(delta) < 1) {
      return false;
    }

    if (direction === 0) {
      direction = delta;
    }

    if ((direction > 0 && delta < 0) || (direction < 0 && delta > 0)) {
      return false;
    }
    previousLevel = level;
  }

  return true;
};

const part1 = () => {
  const count = lines
    .map(line => isSafeReport(line.split(/\s+/).map(Number)))
    .filter(Boolean).length;

  console.log(count);
};

part1();
