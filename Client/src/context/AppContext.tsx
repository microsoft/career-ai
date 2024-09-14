import React from "react";
import { IAppContext } from "../models/IAppContext";
import { GameScenarios } from "../models/GameResponse";

// @ts-ignore
export const AppContext = React.createContext<IAppContext>({});

export function AppContextProvider(
  props: React.PropsWithChildren<{}>
): React.ReactElement {
  const [gameScenarios, setGameScenarios] =
    React.useState<GameScenarios | null>(null);

  return (
    <AppContext.Provider
      value={{ gameScenarios, setGameScenarios }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
