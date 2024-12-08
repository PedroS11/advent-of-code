import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day3/input", {
  encoding: "utf-8",
});

const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;

const part1 = () => {
  let total = 0;
  let enabled = true;
  const matches = input.matchAll(/(mul\(\d{1,3},\d{1,3}\)|do(n't)?\(\))/gm);
  for (const match of Array.from(matches)) {
    console.log(match);
  }

  console.log(total);
};

function day3chal2() {
  return input
    .split("do()")
    .map(it => it.split("don't()")[0])
    .flatMap(it => [...it.matchAll(regex)])
    .map(([, a, b]) => +a * +b)
    .reduce((a, b) => a + b);
}

console.log(day3chal2());

/**
 * const part1answer = _(inputLines)
 *     .map(s => [...s.matchAll(/mul\((\d+),(\d+)\)/g)])
 *     .flatMap()
 *     .map(m => m[1] * m[2])
 *     .sum()
 *
 * const part2answer = _(unifiedInput)
 *     .split('do()')
 *     .map(track => track.split('don\'t()')[0])
 *     .map(s => [...s.matchAll(/mul\((\d+),(\d+)\)/g)])
 *     .flatMap()
 *     .map(m => m[1] * m[2])
 *     .sum()
 */
