import React from "react";
import { AppContext } from "../context/AppContext";
import { GameResponse, GameResultResponse } from "../models/GameResponse";
import { IAppContext } from "../models/IAppContext";
import { Http } from "../services/Http";

export function useCareerGame() {
  const { addRound, setGameId, setCareerImageURL, setSummary, setLessons } =
    React.useContext<IAppContext>(AppContext);
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
        if (response.data.round?.options?.length === 0)
          throw new Error("InvalidCareerChoice");

        setGameId(response.data.conversationId);
        setCareerImageURL(response.data.careerImageURL);
        addRound({
          ...response.data.round,
          optionSelected: null,
        });
      }
    } catch (error: any) {
      throw new Error("FailedToStartGame");
    } finally {
      setLoading(false);
    }
  };

  const continueGame = async (
    gameId: string,
    userResponse: string,
  ): Promise<void> => {
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const completeGame = async (
    gameId: string,
    userResponse: string,
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await Http.getInstance().post<GameResultResponse>(
        "/api/career-game/complete",
        {
          conversationId: gameId,
          response: userResponse,
        },
      );

      if (response.ok && response.data) {
        console.log(response.data);
        setSummary(response.data.round.summary);
        setLessons(response.data.round.lessons);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    startGame,
    continueGame,
    completeGame,
    isLoading,
  };
}
