import { Card, Deck, GameRules } from "../../../common/domain/index.js";

export class PokDengGame {
  playRound() {
    const deck = new Deck();

    const playerCards: Card[] = [deck.draw(), deck.draw()];
    const dealerCards: Card[] = [deck.draw(), deck.draw()];

    const playerScore = GameRules.calculateScore(playerCards);
    const dealerScore = GameRules.calculateScore(dealerCards);

    return {
      playerCards,
      dealerCards,
      playerScore,
      dealerScore,
    };
  }
}
