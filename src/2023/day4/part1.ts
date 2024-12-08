import fs from "fs";

const input: string = fs.readFileSync("./src/day4/input", {
  encoding: "utf-8",
});

const part1 = () => {
  const cards = input.split("\n");
  const result = cards
    .map(card => {
      const sets = card.split(": ")[1].split(" | ");
      let winning = new Set(sets[0].trim().split(/\s+/));
      let numb = new Set(sets[1].trim().split(/\s+/));
      const intersection = winning.intersection(numb);

      if (intersection.size) {
        return Math.pow(2, intersection.size - 1);
      }
      return 0;
    })
    .reduce((acum, value) => (acum += value), 0);

  console.log(result);
};

part1();
