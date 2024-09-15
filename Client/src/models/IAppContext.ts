import { GameScenarios } from "./GameResponse";

export interface IAppContext {
  gameScenarios: GameScenarios | null;
  setGameScenarios: React.Dispatch<React.SetStateAction<GameScenarios | null>>;
}
