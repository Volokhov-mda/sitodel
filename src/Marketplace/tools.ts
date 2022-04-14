import { IMarketCard } from "./Marketplace";

export const balanceCards = (cards: IMarketCard[]): IMarketCard[][] => {
  let result: IMarketCard[][] = [[], [], []];
  cards.forEach((x) => {
    const sizesSums = result.map((t) =>
      t.reduce((y, z) => y + (z.size || 3), 0)
    );
    result[sizesSums.indexOf(Math.min(...sizesSums))].push(x);
  });
  return result;
};
