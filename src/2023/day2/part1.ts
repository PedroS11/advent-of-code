import fs from "fs";

const input: string = fs.readFileSync("./src/day2/input", {
  encoding: "utf-8",
});
const games: string[] = input.split("\n");
// 12 red cubes, 13 green cubes, and 14 blue cubes

const RED = 12;
const GREEN = 13;
const BLUE = 14;

const part1 = () => {
  let ids = 0;

  games.map(game => {
    const id = Number(game.match(/Game (\d+)/)[1]);

    const sets = game.split(": ")[1].split(";");

    const valid = sets.every(set => {
      const blue = Number(set.match(/(\d+) blue/)?.[1] ?? 0);
      const green = Number(set.match(/(\d+) green/)?.[1] ?? 0);
      const red = Number(set.match(/(\d+) red/)?.[1] ?? 0);

      return blue <= BLUE && red <= RED && green <= GREEN;
    });

    console.log(game, valid);

    if (valid) {
      ids += id;
    }
  });

  console.log(ids);
};

part1();
