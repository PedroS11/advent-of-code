import fs from "fs";

const input: string = fs.readFileSync("./src/day3/input", {
  encoding: "utf-8",
});

const VALID_NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const INVALID_CHARS = [
  undefined,
  ".",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

const SPECIAL_CHARS = [];

const partFound = (row, colum, matrix) => {
  const positions = [
    matrix?.[row]?.[colum + 1],
    matrix?.[row]?.[colum - 1],
    matrix?.[row + 1]?.[colum],
    matrix?.[row - 1]?.[colum],

    matrix?.[row + 1]?.[colum + 1],
    matrix?.[row + 1]?.[colum - 1],
    matrix?.[row - 1]?.[colum + 1],
    matrix?.[row - 1]?.[colum - 1],
  ];
  return positions.some(position => SPECIAL_CHARS.includes(position));
};

const part1 = () => {
  const matrix = input.split("\n");
  const numbers: Set<number> = new Set();

  for (let row = 0; row < matrix.length; row++) {
    let numberProcessing = "";
    let isPart = false;

    for (let column = 0; column < matrix[row].length; column++) {
      const char = matrix[row][column];
      const lastElementOfRow = column + 1 === matrix[row].length;
      if (/[0-9]/.test(char)) {
        numberProcessing += char;
        if (partFound(row, column, matrix)) {
          isPart = true;
        }
        if (lastElementOfRow) {
          if (numberProcessing !== "" && isPart) {
            numbers.add(Number(numberProcessing));
          }
          isPart = false;
          numberProcessing = "";
        }
        // Finished processing a number
      } else {
        if (numberProcessing !== "" && isPart) {
          numbers.add(Number(numberProcessing));
        }
        isPart = false;
        numberProcessing = "";
      }
    }
  }
  console.log(numbers);
  const total = Array.from(numbers).reduce(
    (acum: number, value: number) => (acum += value),
    0,
  );
  console.log(total);
};

const part11 = () => {
  const matrix = input.split("\n");
  const numbers: Set<number> = new Set();
  let totalParts = 0;

  for (let x of matrix) {
    for (let y of x) {
      if (Number.isNaN(+y) && y != "." && !SPECIAL_CHARS.includes(y)) {
        SPECIAL_CHARS.push(y);
      }
    }
  }

  for (let row = 0; row < matrix.length; row++) {
    let numberProcessing = "";
    let isPart = false;

    for (let column = 0; column < matrix[row].length; column++) {
      const char = matrix[row][column];
      if (/[0-9]/.test(char)) {
        numberProcessing += char;
        if (partFound(row, column, matrix)) {
          isPart = true;
        }
      }

      if (!/[0-9]/.test(char) && numberProcessing !== "") {
        if (isPart) {
          totalParts += Number(numberProcessing);
        }

        numberProcessing = "";
        isPart = false;
      }
    }
  }

  console.log(totalParts);
};

//RUN FROM adventofcode.com/2023
let txt = input;
let inputs = txt.trim().split("\n");
let answer = 0;
let answer_p2 = 0;
let pc_part2 = {};
let special_chars = [];

//PART 1
function part111() {
  //list of special characters
  for (let x of inputs) {
    for (let y of x) {
      if (isNaN(+y) && y != "." && !special_chars.includes(y)) {
        special_chars.push(y);
      }
    }
  }

  //find numbers in a row
  for (var y = 0; y < inputs.length; y++) {
    let temp = "";
    let eligible = false;

    //iterate over each character
    for (var x = 0; x <= inputs[y].length; x++) {
      if (!isNaN(Number(inputs[y][x]))) {
        //build the number string
        temp += inputs[y][x];

        //check right away if a special char is near, only if not yet true
        if (!eligible) {
          //top-left
          if (y != 0 && x != 0 && special_chars.includes(inputs[y - 1][x - 1]))
            eligible = true;
          //left
          if (x != 0 && special_chars.includes(inputs[y][x - 1]))
            eligible = true;
          //bottom-left
          if (
            y != 139 &&
            x != 0 &&
            special_chars.includes(inputs[y + 1][x - 1])
          )
            eligible = true;
          //top
          if (y != 0 && special_chars.includes(inputs[y - 1][x]))
            eligible = true;
          //bottom
          if (y != 139 && special_chars.includes(inputs[y + 1][x]))
            eligible = true;
          //top-right
          if (
            y != 0 &&
            x != 139 &&
            special_chars.includes(inputs[y - 1][x + 1])
          )
            eligible = true;
          //right
          if (x != 139 && special_chars.includes(inputs[y][x + 1]))
            eligible = true;
          //bottom-right
          if (
            y != 139 &&
            x != 139 &&
            special_chars.includes(inputs[y + 1][x + 1])
          )
            eligible = true;
        }
      }
      //if we're done building a number...
      if (isNaN(Number(inputs[y][x])) && temp != "") {
        //add number to answer if eligible
        if (eligible) {
          answer += Number(temp);
          //build an object of potential candidates for part2, by position of each char within the number
          for (var i = 1; i <= temp.length; i++)
            pc_part2[y + "_" + (x - i)] = Number(temp);
        }
        //wipe number and reset eligible
        temp = "";
        eligible = false;
      }
    }
  }
  console.log(answer);
  return answer;
}
part111();
