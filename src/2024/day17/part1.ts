import fs from "fs";

const input: string = fs.readFileSync("./input", {
  encoding: "utf-8",
});

const [registers, programString] = input.split(/\s+\n/);

const [reg1, reg2, reg3] = registers.split("\n");
const program = programString.split(": ")[1];

const registerAIdx = 4;
const registerBIdx = 5;
const registerCIdx = 6;

const OPERANDS_MAPPER = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: Number(reg1.split(": ")[1]),
  5: Number(reg2.split(": ")[1]),
  6: Number(reg3.split(": ")[1]),
  7: 7,
};

const adv = (operand: number) => {
  OPERANDS_MAPPER[registerAIdx] = Math.floor(
    OPERANDS_MAPPER[registerAIdx] / Math.pow(2, OPERANDS_MAPPER[operand]),
  );
};

const bxl = (operand: number) => {
  OPERANDS_MAPPER[registerBIdx] = operand ^ OPERANDS_MAPPER[registerBIdx];
};

const bst = (operand: number) => {
  OPERANDS_MAPPER[registerBIdx] = OPERANDS_MAPPER[operand] % 8;
};

const jnz = (operand: number) => {
  if (OPERANDS_MAPPER[registerAIdx] !== 0) {
    return operand;
  }
};

const bxc = () => {
  OPERANDS_MAPPER[registerBIdx] = OPERANDS_MAPPER[registerBIdx] ^ OPERANDS_MAPPER[registerCIdx];
};

const out = (operand: number) => OPERANDS_MAPPER[operand] % 8;

const bdv = (operand: number) => {
  OPERANDS_MAPPER[registerBIdx] = Math.floor(
    Number(OPERANDS_MAPPER[registerAIdx]) / Math.pow(2, OPERANDS_MAPPER[operand]),
  );
};

const cdv = (operand: number) => {
  OPERANDS_MAPPER[registerCIdx] = Math.floor(
    Number(OPERANDS_MAPPER[registerAIdx]) / Math.pow(2, OPERANDS_MAPPER[operand]),
  );
};

const part1 = async () => {
  const programOps = program.split(",").map(Number);

  let pointer = 0;
  const output: number[] = [];

  while (pointer < programOps.length) {
    const opcode = programOps[pointer];
    const operand = programOps[pointer + 1];
    let jumpDelta = 0;

    switch (opcode) {
      case 0:
        adv(operand);
        break;
      case 1:
        bxl(operand);
        break;
      case 2:
        bst(operand);
        break;
      case 3:
        jumpDelta = jnz(operand);
        break;
      case 4:
        bxc();
        break;
      case 5:
        output.push(out(operand));
        break;
      case 6:
        bdv(operand);
        break;
      case 7:
        cdv(operand);
        break;
    }

    if (opcode === 3 && OPERANDS_MAPPER[registerAIdx] !== 0) {
      pointer = jumpDelta;
    } else {
      pointer += 2;
    }
  }

  console.log("out", output.join(","));
  console.log("rA", OPERANDS_MAPPER[registerAIdx]);
  console.log("rB", OPERANDS_MAPPER[registerBIdx]);
  console.log("rC", OPERANDS_MAPPER[registerCIdx]);
};

(async () => await part1())();
