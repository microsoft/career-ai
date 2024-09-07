import { GameScenarios } from "./GameResponse";
import { ScreenType } from "./ScreenType";

export interface IAppContext {
  currentScreen: ScreenType;
  gameScenarios: GameScenarios | null;

  go: (screen: ScreenType) => void;
  setGameScenarios: React.Dispatch<React.SetStateAction<GameScenarios | null>>;
}
