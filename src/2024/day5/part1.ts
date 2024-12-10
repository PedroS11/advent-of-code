import fs from "fs";

const input: string = fs.readFileSync("./src/2024/day5/input", {
  encoding: "utf-8",
});

const [ordersString, updatesString]: string[] = input.split(/\s+\n/);
const orders: string[] = ordersString.split("\n");
const updates: string[] = updatesString.split("\n");

const createOrders = (page: string, pages: string[]): string[] => {
  return pages.reduce((acum, nextPage) => {
    if (nextPage === page) {
      return acum;
    }
    return [...acum, `${page}|${nextPage}`];
  }, [] as string[]);
};

const part1 = () => {
  let total = 0;
  for (const update of updates) {
    const pages: string[] = update.split(",");

    const ordered: boolean = pages.every((page, index) => {
      let combinations: string[] = createOrders(page, pages);
      const existingCombinations = combinations.filter(comb =>
        orders.includes(comb),
      ).length;

      return combinations.length - existingCombinations === index;
    });

    if (ordered) {
      total += Number(pages[Math.floor(pages.length / 2)]);
    }
  }
  console.log(total);
};

part1();
