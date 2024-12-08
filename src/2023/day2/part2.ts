import fs from "fs";

const input: string = fs.readFileSync("./src/day2/input", {
  encoding: "utf-8",
});
const games: string[] = input.split("\n");
// 12 red cubes, 13 green cubes, and 14 blue cubes

const RED = 12;
const GREEN = 13;
const BLUE = 14;

const part2 = () => {
  let ids = 0;

  const powerSum = games
    .map(game => {
      const id = Number(game.match(/Game (\d+)/)[1]);

      const sets = game.split(": ")[1].split(";");
      const blues = [],
        reds = [],
        greens = [];

      for (const set of sets) {
        const blue = set.match(/(\d+) blue/)?.[1];
        const green = set.match(/(\d+) green/)?.[1];
        const red = set.match(/(\d+) red/)?.[1];

        if (blue) blues.push(Number(blue));
        if (red) reds.push(Number(red));
        if (green) greens.push(Number(green));
      }

      const maxBlue = Math.max(...blues);
      const maxGreen = Math.max(...greens);
      const maxRed = Math.max(...reds);

      console.log(game, maxBlue, maxGreen, maxRed);
      return maxBlue * maxGreen * maxRed;
    })
    .reduce((acum, power) => (acum += power), 0);
  console.log(powerSum);
};

const part21 = () => {
  let ids = 0;

  const powerSum = games
    .map(game => {
      const id = Number(game.match(/Game (\d+)/)[1]);

      const sets = game.split(": ")[1].split(";");
      let blues = 0,
        reds = 0,
        greens = 0;

      for (const set of sets) {
        const blue = Number(set.match(/(\d+) blue/)?.[1] ?? 0);
        const green = Number(set.match(/(\d+) green/)?.[1] ?? 0);
        const red = Number(set.match(/(\d+) red/)?.[1] ?? 0);

        if (blue > blues) blues = blue;
        if (red > reds) reds = red;
        if (green > greens) greens = green;
      }

      return blues * greens * reds;
    })
    .reduce((acum, power) => (acum += power), 0);
  console.log(powerSum);
};

part21();
