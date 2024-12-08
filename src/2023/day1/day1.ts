import fs from "fs";

const puzzle: string = fs.readFileSync("./puzzle", { encoding: "utf-8" });
const lines = puzzle.split("\n");

const calibrationValueV1 = () => {
  let total = 0;

  for (const word of lines) {
    const numbers = word.split("").filter(x => Number.isFinite(+x));
    total += Number.parseInt(numbers[0] + numbers[numbers.length - 1]);
  }

  console.log(total);
};

const calibrationValueV11 = () => {
  const result = lines
    .map(line => line.match(/[0-9]/g))
    .map(numbers => Number(numbers![0] + numbers![numbers?.length - 1]))
    .reduce((acum, value) => (acum += value), 0);

  console.log(result);
};

const dictionary = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const calibrationValueV2 = () => {
  let total = 0;

  for (const line of lines) {
    const matches = [
      ...line.matchAll(
        /(?=([1-9]|one|two|three|four|five|six|seven|eight|nine))/g,
      ),
    ].map(x => dictionary[x[1]]);
    total += Number(matches[0] + matches[matches.length - 1]);
  }

  console.log(total);
};

calibrationValueV2();
