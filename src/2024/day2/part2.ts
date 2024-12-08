import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day2/input", {
  encoding: "utf-8",
});
const lines = input.split("\n");

const isSafeReport = (report: number[]): boolean => {
  const direction = Math.sign(report[1] - report[0]);

  for (let i = 1; i < report.length; i++) {
    const delta = report[i] - report[i - 1];

    if (Math.abs(delta) < 1 || Math.abs(delta) > 3) {
      return false;
    }

    if (direction * delta <= 0) {
      return false;
    }
  }

  return true;
};

const isFullySafeReport = (levels: number[]): boolean => {
  if (isSafeReport(levels)) {
    return true;
  }

  const tries = levels.map((_, index) => {
    return levels.toSpliced(index, 1);
  });

  return tries.map(isSafeReport).some(value => value);
};

const part2 = () => {
  const count = lines
    .map(line => isFullySafeReport(line.split(/\s+/).map(Number)))
    .filter(Boolean).length;

  console.log(count);
};

part2();
