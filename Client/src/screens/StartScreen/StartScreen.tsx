import React from "react";
import { IAppContext } from "../../models/IAppContext";
import { AppContext } from "../../context/AppContext";
import { PrimaryButton } from "../../components/Form/Button";
import { Http } from "../../services/Http";
import { ScreenType } from "../../models/ScreenType";
import { GameScenarios } from "../../models/GameResponse";

export function StartScreen(): React.ReactElement {
  const { go, setGameScenarios } = React.useContext<IAppContext>(AppContext);
  const [title, setTitle] = React.useState<string>("");

  const handleStartButtonClicked = async () => {
    const response = await Http.getInstance().post<GameScenarios>(
      "/api/career-game/start",
      {
        careerChoice: title,
      }
    );

    if (response.ok) {
      setGameScenarios(response.data);
      go(ScreenType.GameScreen);
    }
  };

  return (
    <div>
      <h1>Start Screen</h1>
      <p>This is the start screen</p>

      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />

      <PrimaryButton onClick={handleStartButtonClicked}>
        Start Game
      </PrimaryButton>
    </div>
  );
}
