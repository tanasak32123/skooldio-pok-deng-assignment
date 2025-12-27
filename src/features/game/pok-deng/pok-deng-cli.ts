import { Card } from "../../../common/domain/index.js";
import { parseNumber } from "../../../common/utils/index.js";
import { PokDengGame } from "./pok-deng-game.js";
import promptSync from "prompt-sync";

const prompt = promptSync();

export class PokDengCLI {
  private chips = 0;
  private game = new PokDengGame();

  start() {
    this.chips = this.askNumber("Please put your total chips");

    while (this.chips > 0) {
      let bet = this.askNumber("Please put your bet");

      if (!this.validateBet(bet)) continue;

      const result = this.game.playRound();

      this.printCards("Player", result.playerCards);
      this.printCards("Dealer", result.dealerCards);

      if (result.playerScore > result.dealerScore) {
        console.log(`You won! You received ${bet} chips`);
        this.chips += bet;
      } else if (result.playerScore < result.dealerScore) {
        console.log(`You lost! You lost ${bet} chips`);
        this.chips -= bet;
      } else {
        console.log("It's a draw! Your chips stay the same");
      }

      console.log(`You got total ${this.chips} chips`);

      if (this.chips <= 0) break;
      if (!this.askContinue()) break;
    }

    console.log(`Game Ended | Final chips: ${this.chips}`);
  }

  private askContinue(): boolean {
    console.log("Wanna play more (Yes/No)?");
    while (true) {
      const answer = prompt("").toLowerCase();
      if (answer === "yes" || answer === "y") {
        return true;
      }

      if (answer === "no" || answer === "n") {
        return false;
      }

      console.log("❌ Invalid answer, please answer Yes or No.");
    }
  }

  private askNumber(question: string): number {
    while (true) {
      console.log(question);
      const input = prompt("");

      try {
        return parseNumber(input);
      } catch (error) {
        console.log("❌ Invalid number, please try again.");
      }
    }
  }

  private validateBet(bet: number): boolean {
    if (bet > this.chips) {
      console.log("Bet is greater than your chips, please try again.");
      return false;
    }

    if (bet <= 0) {
      console.log("Your bet must be greater than 0, please try again.");
      return false;
    }

    return true;
  }

  private printCards(title: string, cards: Card[]) {
    const text = cards.map((c) => `${c.rank}${c.suit}`).join(" ");
    console.log(`${title}: ${text}`);
  }
}
