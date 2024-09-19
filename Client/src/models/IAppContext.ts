import React from "react";
import { GameRound } from "./GameRound";

export interface IAppContext {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;

  summary: string;
  setSummary: React.Dispatch<React.SetStateAction<string>>;

  lessons: string[];
  setLessons: React.Dispatch<React.SetStateAction<string[]>>;

  gameId: string | null;

  setGameId(gameId: string | null): void;

  selectedRound: number | 0;

  selectRound(selectedRound: number): void;

  numberOfRounds: number;

  setNumberOfRounds(numberOfRounds: number): void;

  rounds: GameRound[];

  addRound(round: GameRound): void;

  completeRound(roundIndex: number, selectedOptionIndex: number): void;

  resetGame(): void;
}
