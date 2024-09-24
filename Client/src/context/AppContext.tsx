import React from "react";
import { IAppContext } from "../models/IAppContext";
import { GameRound } from "../models/GameRound";

// @ts-ignore
export const AppContext = React.createContext<IAppContext>({});

export function AppContextProvider(
  props: React.PropsWithChildren<{}>,
): React.ReactElement {
  const [userName, setUserName] = React.useState<string>("");
  const [summary, setSummary] = React.useState<string>("");
  const [lessons, setLessons] = React.useState<string[]>([]);
  const [numberOfRounds, setNumberOfRounds] = React.useState<number>(5);
  const [gameRounds, setGameRounds] = React.useState<GameRound[]>([]);
  const [selectedRound, setSelectedRound] = React.useState<number>(0);
  const [gameId, setGameId] = React.useState<string | null>(null);
  const [careerImageURL, setCareerImageURL] = React.useState<string | null>(null);

  const updateNumberOfRounds = React.useCallback((numberOfRounds: number) => {
    setNumberOfRounds(numberOfRounds);
  }, []);

  const addRound = React.useCallback((round: GameRound) => {
    setGameRounds((prev) => [...prev, round]);
  }, []);

  const selectRound = React.useCallback((selectedRound: number) => {
    setSelectedRound(selectedRound);
  }, []);

  const completeRound = React.useCallback(
    (roundIndex: number, selectedOptionIndex: number) => {
      setGameRounds((prev) => {
        const rounds: GameRound[] = [];
        prev.forEach((p: GameRound, i: number) => {
          rounds.push({
            ...p,
            optionSelected:
              i === roundIndex ? selectedOptionIndex : p.optionSelected,
          });
        });

        return rounds;
      });
    },
    [],
  );

  const resetGame = React.useCallback(() => {
    setGameRounds([]);
    setGameId(null);
    setCareerImageURL(null);
    selectRound(0);
  }, [selectRound]);

  return (
    <AppContext.Provider
      value={{
        summary,
        setSummary,
        lessons,
        setLessons,
        userName,
        setUserName,
        gameId,
        setGameId,
        careerImageURL,
        setCareerImageURL,
        numberOfRounds,
        setNumberOfRounds: updateNumberOfRounds,
        rounds: gameRounds,
        addRound,
        selectedRound,
        selectRound,
        completeRound,
        resetGame,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
