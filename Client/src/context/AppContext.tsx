import React from "react";
import { IAppContext } from "../models/IAppContext";
import { useScreenRouting } from "../hooks/useScreenRouting";
import { GameScenarios } from "../models/GameResponse";

// @ts-ignore
export const AppContext = React.createContext<IAppContext>({});

export function AppContextProvider(
  props: React.PropsWithChildren<{}>
): React.ReactElement {
  const [gameScenarios, setGameScenarios] =
    React.useState<GameScenarios | null>(null);
  const { currentScreen, go } = useScreenRouting();

  return (
    <AppContext.Provider
      value={{ currentScreen, go, gameScenarios, setGameScenarios }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
