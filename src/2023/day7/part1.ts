import fs from "fs";

const input: string = fs.readFileSync("./src/day7/input", {
  encoding: "utf-8",
});
const lines = input.split("\n");
const hands = lines.map(line => line.split(/\s+/)[0]);
const points = lines.map(line => Number(line.split(/\s+/)[1]));

const dictionary = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const getType = (hand: string): number => {
  const counts: number[] = hand.split("").reduce((acum, letter) => {
    acum[dictionary[letter]] = (acum[dictionary[letter]] ?? 0) + 1;
    return acum;
  }, []);
  return Math.max(...counts.filter(Boolean));
};

const isGreater = (hand1: any[], hand2: any[]): number => {
  if (hand1[1] !== hand2[1]) {
    return hand1[1] - hand2[1];
  }

  const letters: string[] = (hand1[0] as string).split("");

  for (const [index, letter] of letters.entries()) {
    const val = dictionary[letter];
    const val2 = dictionary[hand2[0][index]];

    if (val !== val2) {
      return val - val2;
    }
  }

  return 0;
};
const part1 = () => {
  const mapped = hands.map((hand, index) => [
    hand,
    getType(hand),
    points[index],
  ]);

  // @ts-ignore
  const sorted = mapped.sort(isGreater);

  console.log(sorted);

  fs.writeFileSync("./src/day7/sorted.json", JSON.stringify(sorted));

  console.log(
    sorted.reduce((acum, value, index) => {
      acum = acum + Number(value[2]) * (index + 1);
      return acum;
    }, 0),
  );
};

part1();
