import fs from "fs";

const input: string = fs.readFileSync("./input", {
  encoding: "utf-8",
});

const [wiresStr, connStr] = input.split(/\s+\n/);
const wiresArr: string[] = wiresStr.split("\n");
const conn = connStr.split("\n");

type Connection = {
  left: string;
  op: string;
  right: string;
  result: string;
};

const part1 = async () => {
  const wires: Map<string, number> = new Map<string, number>();

  for (const wireStr of wiresArr) {
    const [wire, value] = wireStr.split(":");
    wires.set(wire, Number(value));
  }

  const connectionsToParse: Connection[] = conn.map(line => {
    const groups = line.match(/(\w+) (\w+) (\w+) -> (\w+)/);
    return {
      left: groups[1],
      op: groups[2],
      right: groups[3],
      result: groups[4],
    };
  });

  while (connectionsToParse.length) {
    const connection = connectionsToParse.shift();
    const { left, op, right, result } = connection;

    if (wires.has(left) && wires.has(right) && wires.has(result)) {
      continue;
    }

    if (wires.has(left) && wires.has(right) && !wires.has(result)) {
      if (op === "AND") {
        wires.set(result, wires.get(left) & wires.get(right));
      } else if (op === "OR") {
        wires.set(result, wires.get(left) | wires.get(right));
      } else if (op === "XOR") {
        wires.set(result, wires.get(left) ^ wires.get(right));
      }
      continue;
    }

    connectionsToParse.push(connection);
  }

  const reversedWires = [...wires.keys()]
    .sort((a, b) => (a > b ? -1 : 1))
    .filter(wire => wire.startsWith("z"));

  const bitPattern = reversedWires.reduce((acum, wire) => {
    acum += wires.get(wire);
    return acum;
  }, "");

  console.log(parseInt(bitPattern, 2));
};

(async () => await part1())();
