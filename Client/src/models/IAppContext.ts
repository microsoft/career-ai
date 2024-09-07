import { ScreenType } from "./ScreenType";

export interface IAppContext {
  currentScreen: ScreenType;

  go: (screen: ScreenType) => void;
}
