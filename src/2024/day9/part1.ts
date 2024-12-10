import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day9/input", {
  encoding: "utf-8",
});

const generateDisk = () => {
  let disk = [];

  input
    .split("")
    .map(Number)
    .forEach((char, index) => {
      const charToRepeat = index % 2 === 0 ? index / 2 : ".";

      for (let i = 0; i < char; i++) {
        disk.push(charToRepeat);
      }
    });

  return disk;
};

const getChecksum = (disk: any[]): number => {
  let total = 0;

  disk
    .filter(char => char !== ".")
    .forEach((value, index) => {
      if (value > 0) {
        total += index * value;
      }
    });

  return total;
};

const defragmentDisk = (disk: any[]): any[] => {
  let freePos = 0;
  let dataPos = disk.length - 1;

  while (true) {
    while (disk[freePos] !== ".") {
      freePos++;
    }

    while (disk[dataPos] === ".") {
      dataPos--;
    }

    if (dataPos < freePos) {
      break;
    }

    disk[freePos] = disk[dataPos];
    disk[dataPos] = ".";
  }

  return disk;
};

const part1 = () => {
  let disk = generateDisk();

  disk = defragmentDisk(disk);

  const checksum: number = getChecksum(disk);

  console.log(checksum);
};

part1();
