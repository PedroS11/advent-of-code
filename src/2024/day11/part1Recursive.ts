import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day11/input", {
  encoding: "utf-8",
});

let stones: number[] = input.split(" ").map(Number);

const processNumber = (stones: number[]): number[] => {
  if (stones.length === 0) {
    return [];
  }

  let result: number[] = [];
  const stone = stones.shift();

  if (stone === 0) {
    result.push(1);
  } else if (stone.toString().length % 2 === 0) {
    const stoneS = stone.toString();
    const leftPart = Number(stoneS.slice(0, stoneS.length / 2));
    const rightPart = Number(stoneS.slice(stoneS.length / 2));

    result.push(leftPart);
    result.push(rightPart);
  } else {
    result.push(stone * 2024);
  }
  result.push(...processNumber(stones));
  return result;
};

const part1 = () => {
  for (let i = 1; i <= 75; i++) {
    stones = processNumber(stones);
  }
  console.log(stones.length);
};

part1();
