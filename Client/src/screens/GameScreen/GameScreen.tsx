import React from "react";
import { ScreenType } from "../../models/ScreenType";
import { IAppContext } from "../../models/IAppContext";
import { AppContext } from "../../context/AppContext";
import { DefaultButton } from "../../components/Form/Button/DefaultButton";

export function GameScreen(): React.ReactElement {
  const { go, gameScenarios } = React.useContext<IAppContext>(AppContext);

  const handleEndButtonClicked = () => {
    go(ScreenType.ResultScreen);
  };

  return (
    <div>
      <h1>Game Screen</h1>
      <p>This is the game screen</p>

      <pre>
        <code>{JSON.stringify(gameScenarios, null, 4)}</code>
      </pre>

      <DefaultButton onClick={handleEndButtonClicked}>End</DefaultButton>
    </div>
  );
}
