import React from "react";
import { IAppContext } from "../models/IAppContext";
import { GameRound } from "../models/GameRound";

// @ts-ignore
export const AppContext = React.createContext<IAppContext>({});

export function AppContextProvider(
  props: React.PropsWithChildren<{}>
): React.ReactElement {
  const [numberOfRounds, setNumberOfRounds] = React.useState<number>(5);
  const [gameRounds, setGameRounds] = React.useState<GameRound[]>([]);
  const [selectedRound, setSelectedRound] = React.useState<number>(0);

  const updateNumberOfRounds = React.useCallback((numberOfRounds: number) => {
    setNumberOfRounds(numberOfRounds);
  }, []);

  const addRound = React.useCallback(
    (round: GameRound) => {
      setGameRounds([...gameRounds, round]);
    },
    [gameRounds]
  );

  const selectRound = React.useCallback((selectedRound: number) => {
    setSelectedRound(selectedRound);
  }, []);

  return (
    <AppContext.Provider
      value={{
        numberOfRounds,
        setNumberOfRounds: updateNumberOfRounds,
        rounds: gameRounds,
        addRound,
        selectedRound,
        selectRound,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
