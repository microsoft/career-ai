import React from "react";
import { IAppContext } from "../../models/IAppContext";
import { AppContext } from "../../context/AppContext";
import { PrimaryButton } from "../../components/Form/Button";
import { Http } from "../../services/Http";
import { ScreenType } from "../../models/ScreenType";

export function StartScreen(): React.ReactElement {
  const { go } = React.useContext<IAppContext>(AppContext);
  const [title, setTitle] = React.useState<string>("");

  const handleStartButtonClicked = async () => {
    // const response = await Http.getInstance().get("/api/game/start");

    // if (response.ok) {
    go(ScreenType.GameScreen);
    // }
  };

  return (
    <div>
      <h1>Start Screen</h1>
      <p>This is the start screen</p>

      <PrimaryButton onClick={handleStartButtonClicked}>
        Start Game
      </PrimaryButton>
    </div>
  );
}
