import React from "react";
import { GamePrompts } from "../models/GamePrompts";
import { Http } from "../services/Http";

export function usePrompts(): [
  GamePrompts,
  React.Dispatch<React.SetStateAction<GamePrompts>>,
  (newPrompts: GamePrompts) => void,
  () => void
] {
  const [prompts, setPrompts] = React.useState<GamePrompts>({
    preGamePrompt: null,
    userResponsePrompt: null,
  });

  const loadGamePrompts = () => {
    Http.getInstance()
      .get<GamePrompts>("/api/career-game/admin/prompts")
      .then((response) => {
        if (response.ok) setPrompts(response.data as GamePrompts);
      });
  };

  const saveGamePrompts = (newPrompts: GamePrompts) => {
    Http.getInstance()
      .post<GamePrompts>("/api/career-game/admin/prompts", newPrompts)
      .then(loadGamePrompts);
  };

  React.useEffect(() => {
    loadGamePrompts();
  }, []);

  return [prompts, setPrompts, saveGamePrompts, loadGamePrompts];
}
