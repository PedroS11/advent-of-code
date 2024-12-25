import fs from "fs";

const input: string = fs.readFileSync("./input", {
  encoding: "utf-8",
});

const patterns = input.split(/\s+\n/);

/**
 * #####
 * .####
 * .####
 * .####
 * .#.#.
 * .#...
 * .....
 */
const processLock = (lock: string[][]): number[] => {
  const counts: number[] = [];
  for (let x = 0; x < 5; x++) {
    let hashes: number = 0;
    for (let y = 1; y < 6; y++) {
      if (lock[y][x] === "#") {
        hashes++;
      }
    }
    counts.push(hashes);
  }

  return counts;
};

const processKey = (key: string[][]): number[] => {
  const counts: number[] = [];
  for (let x = 0; x < 5; x++) {
    let dots: number = 0;
    for (let y = 1; y < 6; y++) {
      if (key[y][x] === "#") {
        dots++;
      }
    }
    counts.push(dots);
  }

  return counts;
};

const part1 = async () => {
  const locks: number[][] = [];
  const keys: number[][] = [];

  for (const pattern of patterns) {
    const map: string[][] = pattern.split("\n").map(line => line.split(""));
    if (map[0][0] === "#") {
      locks.push(processLock(map));
    } else {
      keys.push(processKey(map));
    }
  }

  let uniques: Set<string> = new Set<string>();

  for (const key of keys) {
    for (const lock of locks) {
      const unique = lock.every((lockValue, index) => lockValue + key[index] <= 5);
      if (unique) {
        uniques.add(key.join("") + lock.join(""));
      }
    }
  }

  console.log(uniques.size);
};

(async () => await part1())();
