import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day11/input", {
  encoding: "utf-8",
});

let stones: number[] = input.split(" ").map(Number);

const part2 = () => {
  let occurrences: Map<number, number> = new Map<number, number>();
  for (const stone of stones) {
    occurrences.set(stone, 1);
  }

  for (let i = 1; i <= 75; i++) {
    const tempMap: Map<number, number> = new Map<number, number>();

    occurrences.forEach((count: number, stone: number) => {
      if (stone === 0) {
        tempMap.set(1, (tempMap.get(1) ?? 0) + count);
      } else if (stone.toString().length % 2 === 0) {
        const stoneS = stone.toString();
        const leftPart = Number(stoneS.slice(0, stoneS.length / 2));
        const rightPart = Number(stoneS.slice(stoneS.length / 2));

        tempMap.set(leftPart, (tempMap.get(leftPart) ?? 0) + count);
        tempMap.set(rightPart, (tempMap.get(rightPart) ?? 0) + count);
      } else {
        const key = stone * 2024;
        tempMap.set(key, (tempMap.get(key) ?? 0) + count);
      }
    });

    occurrences = tempMap;
  }

  let total = 0;

  occurrences.forEach((count: number, stone: number) => {
    total += count;
  });

  console.log(total);
};

part2();
