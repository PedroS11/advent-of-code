import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day13/input", {
  encoding: "utf-8",
});

const prizeBlocks = input.split(/\s+\n/);
const prizes = prizeBlocks.map(block => {
  const lines = block.split("\n");

  const buttonA = lines[0].match(/X\+(\d+), Y\+(\d+)/);
  const buttonB = lines[1].match(/X\+(\d+), Y\+(\d+)/);
  const prize = lines[2].match(/X=(\d+), Y=(\d+)/);

  return {
    A: [Number(buttonA[1]), Number(buttonA[2])],
    B: [Number(buttonB[1]), Number(buttonB[2])],
    prize: [Number(prize[1]), Number(prize[2])],
  };
});

const getPrizeValue = (
  valueAX: number,
  valueAY: number,
  valueBX: number,
  valueBY: number,
  prizeX: number,
  prizeY: number,
) => {
  let bestTotal = Infinity;

  const memo = new Map<string, number>();

  const backtrack = (acumX: number, acumY: number, nA: number, nB: number): number => {
    const cost = nA * 3 + nB * 1; // Cost for A and B presses

    if (acumX === prizeX && acumY === prizeY && cost < bestTotal) {
      return cost;
    }

    if (acumX > prizeX || acumY > prizeY || cost >= bestTotal) {
      return Infinity;
    }

    const memoKey = `${acumX},${acumY},${nA},${nB}`;
    if (memo.has(memoKey)) {
      return memo.get(memoKey)!;
    }

    const costWithA = backtrack(acumX + valueAX, acumY + valueAY, nA + 1, nB);
    const costWithB = backtrack(acumX + valueBX, acumY + valueBY, nA, nB + 1);

    const result = Math.min(costWithA, costWithB);

    memo.set(memoKey, result);

    if (result < bestTotal) {
      bestTotal = result;
    }

    return result;
  };

  backtrack(0, 0, 0, 0);

  return bestTotal;
};

const part1 = () => {
  console.log(
    prizes
      .map(({ A, B, prize }) => getPrizeValue(A[0], A[1], B[0], B[1], prize[0], prize[1]))
      .filter(total => total !== Infinity)
      .reduce((acum, value) => acum + value, 0),
  );
};

part1();
