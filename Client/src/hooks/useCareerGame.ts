import React from "react";
import { AppContext } from "../context/AppContext";
import { GameResponse } from "../models/GameResponse";
import { IAppContext } from "../models/IAppContext";
import { Http } from "../services/Http";

export function useCareerGame() {
  const { addRound, setGameId } = React.useContext<IAppContext>(AppContext);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const startGame = async (career: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await Http.getInstance().post<GameResponse>(
        "/api/career-game/start",
        {
          careerChoice: career,
        },
      );

      if (response.ok && response.data) {
        setGameId(response.data.conversationId)
        addRound({
          ...response.data.round,
          optionSelected: null,
        });
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const continueGame = async (gameId: string, userResponse: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await Http.getInstance().post<GameResponse>(
          "/api/career-game/continue",
          {
            conversationId: gameId,
            response: userResponse,
          },
      );

      if (response.ok && response.data) {
        addRound({
          ...response.data.round,
          optionSelected: null,
        });
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const completeGame = async (response: string): Promise<void> => {};

  return {
    startGame,
    continueGame,
    completeGame,
    isLoading,
  }
}
