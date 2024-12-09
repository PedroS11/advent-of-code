import fs from "fs";

const input: string = fs.readFileSync("./input", {
  encoding: "utf-8",
});

const part11 = () => {
  let mapped = [];

  input
    .split("")
    .map(Number)
    .forEach((char, index) => {
      const charToRepeat = index % 2 === 0 ? index / 2 : ".";

      for (let i = 0; i < char; i++) {
        mapped.push(charToRepeat);
      }
    });

  console.log("N");
  const mappedArray = mapped;

  for (let index = mappedArray.length - 1; index >= 0; index--) {
    const firstFreeSpot = mappedArray.findIndex(char => char === ".");

    if (
      firstFreeSpot >= 0 &&
      firstFreeSpot < index &&
      mappedArray[index] !== "."
    ) {
      mappedArray[firstFreeSpot] = mappedArray[index];
      mappedArray[index] = ".";
    }
  }

  console.log("AA");

  let total = 0;

  mappedArray
    .filter(char => char !== ".")
    .forEach((value, index) => {
      if (value > 0) {
        total += index * value;
      }
    });

  console.log(total);
};

part11();
