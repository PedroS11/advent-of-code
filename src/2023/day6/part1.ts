import fs from "fs";

const input: string = fs.readFileSync("./src/day6/input", {
  encoding: "utf-8",
});
const [time, distance] = input.split("\n");
const times = time.split("Time:")[1].trim().split(/\s+/).map(Number);
const distances = distance
  .split("Distance:")[1]
  .trim()
  .split(/\s+/)
  .map(Number);

const part1 = () => {
  let result = 1;

  times.forEach((time, index) => {
    const recordDistance: number = distances[index];
    let localResult = 0;
    for (let i = 0; i < time; i++) {
      const attemptedDistance: number = i * (time - i);
      if (attemptedDistance > recordDistance) {
        localResult++;
      }
    }
    if (localResult > 0) {
      result *= localResult;
    }
  });

  console.log(result);
};

part1();
