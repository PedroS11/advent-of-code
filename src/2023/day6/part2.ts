import fs from "fs";

const input: string = fs.readFileSync("./src/day6/input", {
  encoding: "utf-8",
});
const [time, distance] = input.split("\n");
const timeParsed = Number(time.split("Time:")[1].trim().split(/\s+/).join(""));
const distanceParsed = Number(
  distance.split("Distance:")[1].trim().split(/\s+/).join(""),
);

const part2 = () => {
  console.log(distanceParsed, timeParsed);
  let localResult = 0;
  for (let i = 0; i < timeParsed; i++) {
    const attemptedDistance: number = i * (timeParsed - i);
    if (attemptedDistance > distanceParsed) {
      localResult++;
    }
  }
  console.log(localResult);
};

part2();
