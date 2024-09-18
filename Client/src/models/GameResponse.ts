import { GameRound } from "./GameRound";

export type GameResponse = {
  conversationId: string;
  round: GameRound;
};

export type GameResultResponse = {
  conversationId: string;
  round: {
    outcome: string;
  }
}
