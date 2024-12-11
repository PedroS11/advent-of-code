import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day11/input", {
  encoding: "utf-8",
});

let stones: string[] = input.split(" ");

const part1 = () => {
  for (let i = 1; i <= 25; i++) {
    let temp: string[] = [];

    for (const stone of stones) {
      if (stone === "0") {
        temp.push("1");
      } else if (stone.length % 2 === 0) {
        const leftPart = Number(stone.slice(0, stone.length / 2)).toString();
        const rightPart = Number(stone.slice(stone.length / 2)).toString();

        temp.push(leftPart);
        temp.push(rightPart);
      } else {
        temp.push((Number(stone) * 2024).toString());
      }
    }

    stones = temp;
  }
  console.log(stones.length);
};



part1();
