import React from "react";
import { IAppContext } from "../../models/IAppContext";
import { AppContext } from "../../context/AppContext";
import { DefaultButton } from "../../components/Form/Button/DefaultButton";
import { useNavigate } from "react-router-dom";

export function GameScreen(): React.ReactElement {
  const navigate = useNavigate();
  const { gameScenarios } = React.useContext<IAppContext>(AppContext);

  const handleEndButtonClicked = () => {
    navigate(`/career-game/something/results`);
  };

  return (
    <div>
      <h1>Game Screen</h1>
      <p>This is the game screen</p>

      <pre>
        <code>{JSON.stringify(gameScenarios, null, 4)}</code>
      </pre>

      <DefaultButton onClick={handleEndButtonClicked} title="End game">
        End
      </DefaultButton>
    </div>
  );
}
