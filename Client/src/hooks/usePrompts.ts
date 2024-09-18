import React from "react";
import { GamePrompts } from "../models/GamePrompts";
import { Http } from "../services/Http";

export function usePrompts(): [
  GamePrompts,
  React.Dispatch<React.SetStateAction<GamePrompts>>,
  (newPrompts: GamePrompts) => void,
  () => void,
  boolean
] {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [prompts, setPrompts] = React.useState<GamePrompts>({
    preGamePrompt: null,
    userResponsePrompt: null,
    postGamePrompt: null,
  });

  const loadGamePrompts = () => {
    setLoading(true);
    Http.getInstance()
      .get<GamePrompts>("/api/career-game/admin/prompts")
      .then((response) => {
        if (response.ok) setPrompts(response.data as GamePrompts);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveGamePrompts = (newPrompts: GamePrompts) => {
    setLoading(true);

    Http.getInstance()
      .post<GamePrompts>("/api/career-game/admin/prompts", newPrompts)
      .then(loadGamePrompts)
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    loadGamePrompts();
  }, []);

  return [prompts, setPrompts, saveGamePrompts, loadGamePrompts, isLoading];
}
