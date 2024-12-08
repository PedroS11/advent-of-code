import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day7/input", {
  encoding: "utf-8",
});

const lines: string[] = input.split("\n");

const part1 = () => {
  let total = 0;

  for (const line of lines) {
    let combinations = [];

    const [sum, operators] = line.split(": ");
    const numbers = operators.split(" ").map(Number);
    const first = numbers.shift();
    combinations.push(first);

    while (numbers.length) {
      const next = numbers.shift();

      const newCombinations = [];
      while (combinations.length) {
        const combination = combinations.shift();
        newCombinations.push(combination * next);
        newCombinations.push(combination + next);
      }

      combinations = newCombinations;
    }
    if (combinations.some(comb => comb === Number(sum))) {
      total += Number(sum);
    }
  }

  console.log(total);
};

const part11 = () => {
  let total = 0;

  for (const line of lines) {
    let combinations: Set<number> = new Set();

    const [sum, operators] = line.split(": ");
    const numbers = operators.split(" ").map(Number);

    const first = numbers.shift();
    combinations.add(first);

    for (const digit of numbers) {
      const newCombinations: Set<number> = new Set();
      combinations.forEach(combination => {
        newCombinations.add(combination * digit);
        newCombinations.add(combination + digit);
      });

      combinations = newCombinations;
    }

    if (combinations.has(Number(sum))) {
      total += Number(sum);
    }
  }

  console.log(total);
};

part1();
