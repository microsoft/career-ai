import React from "react";
import { IAppContext } from "../../models/IAppContext";
import { AppContext } from "../../context/AppContext";
import { DefaultButton } from "../../components/Form/Button/DefaultButton";
import { useNavigate } from "react-router-dom";
import { usePageTracking } from "../../hooks/usePageTracking";
import { GameProgress } from "../../components/GameProgress";

export function GameScreen(): React.ReactElement {
  usePageTracking("GameScreen");

  const navigate = useNavigate();
  const { rounds, selectedRound } = React.useContext<IAppContext>(AppContext);
  const round = rounds[selectedRound];

  const handleEndButtonClicked = () => {
    navigate(`/career-game/something/results`);
  };

  return (
    <div>
      <h1>Game Screen</h1>
      <p>This is the game screen</p>

      <GameProgress />

      <pre>
        <code>{JSON.stringify(round, null, 4)}</code>
      </pre>

      <DefaultButton
        onClick={handleEndButtonClicked}
        title="End game"
        label="End"
      />
    </div>
  );
}
