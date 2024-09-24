import { GameRound } from "./GameRound";

export type GameResponse = {
  conversationId: string;
  round: GameRound;
  careerImageURL: string;
};

export type GameResultResponse = {
  conversationId: string;
  careerImageURL: string;
  round: {
    summary: string;
    lessons: string[];
  };
};
