import { Card, Rank } from "./card.js";

export class GameRules {
  static cardValue(rank: Rank): number {
    if (rank === "A") return 1;
    if (["10", "J", "Q", "K"].includes(rank)) return 0;
    return Number(rank);
  }

  static calculateScore(cards: Card[]): number {
    const total = cards.reduce(
      (sum, card) => sum + this.cardValue(card.rank),
      0
    );
    return total % 10;
  }
}
