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
        newCombinations.push(Number(combination + next));
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
    let combinations = [];

    const [sum, operators] = line.split(": ");
    const numbers = operators.split(" ").map(Number);
    const first = numbers.shift();
    combinations.push(first);

    let stop = false;
    while (numbers.length && !stop) {
      const next = numbers.shift();

      const newCombinations = [];

      while (combinations.length && !stop) {
        const combination = combinations.shift();

        const mult = combination * next;
        const add = combination + next;
        const or = Number("" + combination + next);

        if ([mult, add, or].includes(Number(sum))) {
          stop = true;
          total += Number(sum);
          break;
        } else {
          newCombinations.push(combination * next);
          newCombinations.push(combination + next);
          newCombinations.push(Number("" + combination + next));
        }
      }

      if (!stop) {
        combinations = newCombinations;
      }
    }
  }

  console.log(total);
};

const part12 = () => {
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
        newCombinations.add(Number("" + combination + digit));
      });

      combinations = newCombinations;
    }

    if (combinations.has(Number(sum))) {
      total += Number(sum);
    }
  }

  console.log(total);
};

part12();
