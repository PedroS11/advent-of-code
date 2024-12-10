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

const getUnorderedUpdates = (): string[] => {
  let unordered: string[] = [];
  for (const update of updates) {
    const pages: string[] = update.split(",");

    const ordered: boolean = pages.every((page, index) => {
      let combinations: string[] = createOrders(page, pages);
      const existingCombinations = combinations.filter(comb =>
        orders.includes(comb),
      ).length;

      return combinations.length - existingCombinations === index;
    });

    if (!ordered) {
      unordered.push(update);
    }
  }

  return unordered;
};

const part2 = () => {
  let total = 0;
  const unordered: string[] = getUnorderedUpdates();

  for (const update of unordered) {
    const pages: string[] = update.split(",");

    const ordered: string[] = pages
      .map((page, index) => {
        let combinations: string[] = createOrders(page, pages);
        const existingCombinations = combinations.filter(comb =>
          orders.includes(comb),
        ).length;

        return {
          page,
          in: combinations.length - existingCombinations,
        };
      })
      .sort((a, b) => a.in - b.in)
      .map(e => e.page);

    console.log(ordered);
    total += Number(ordered[Math.floor(ordered.length / 2)]);
  }
  console.log(total);
};

part2();
