import fs from "fs";

const input: string = fs.readFileSync("./input", {
  encoding: "utf-8",
});

const lines = input.split("\n");

const part1 = async () => {
  const set = new Set();

  const map: { [key: string]: Set<string> } = {};
  for (const line of lines) {
    const [l, r] = line.split("-");
    if (!map[l]) {
      map[l] = new Set<string>();
    }
    map[l].add(r);

    if (!map[r]) {
      map[r] = new Set<string>();
    }
    map[r].add(l);
  }

  for (const [node, connections] of Object.entries(map)) {
    for (const conn of connections) {
      const newCons = map[conn];

      const inter = connections.intersection(newCons);

      if (inter.size > 0) {
        inter.forEach(value => {
          if ([node, conn, value].some(c => c.startsWith("t"))) {
            set.add([node, conn, value].sort().join(","));
          }
        });
      }
    }
  }
  console.log(set.size);
};

(async () => await part1())();
