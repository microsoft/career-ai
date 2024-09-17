import { GameRound } from "./GameRound";

export interface IAppContext {
  selectedRound: number | 0;
  selectRound(selectedRound: number): void;
  numberOfRounds: number;
  setNumberOfRounds(numberOfRounds: number): void;
  rounds: GameRound[];
  addRound: (round: GameRound) => void;
}
