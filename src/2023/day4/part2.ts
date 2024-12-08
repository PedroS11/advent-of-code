import fs from "fs";

const input: string = fs.readFileSync("./src/day4/input", {
  encoding: "utf-8",
});

const getMatchingNumbers = (sets: string[]): number => {
  let winning = new Set(sets[0].trim().split(/\s+/));
  let numb = new Set(sets[1].trim().split(/\s+/));
  const intersection = winning.intersection(numb);

  return intersection.size;
};

const part2 = () => {
  const cards = input.split("\n");
  const copies = Array(cards.length).fill(1);

  for (const card of cards) {
    const splited = card.split(": ");
    const cardNumber = Number(splited[0].replace("Card ", "").trim());

    const sets = splited[1].split(" | ");
    const matchingNumber = getMatchingNumbers(sets);

    for (let i = cardNumber; i < cardNumber + matchingNumber; i++) {
      copies[i] = (copies?.[i] ?? 0) + copies[cardNumber - 1];
    }
  }

  console.log(copies.reduce((a, v) => (a += v)));

  // console.log(copies);
};

part2();
