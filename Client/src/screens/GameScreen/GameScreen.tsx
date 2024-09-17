import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Form/Button";
import { ButtonBar } from "../../components/Form/Button/ButtonBar";
import { DefaultButton } from "../../components/Form/Button/DefaultButton";
import { Spinner } from "../../components/Spinner";
import { H1 } from "../../components/Typography";
import { useCareerGame } from "../../hooks/useCareerGame";
import { IAppContext } from "../../models/IAppContext";
import { AppContext } from "../../context/AppContext";
import { usePageTracking } from "../../hooks/usePageTracking";
import { GameProgress } from "../../components/GameProgress";

export function GameScreen(): React.ReactElement {
  usePageTracking("GameScreen");

  const navigate = useNavigate();
  const { continueGame, isLoading } = useCareerGame();
  const {
    rounds,
    selectRound,
    selectedRound,
    completeRound,
    numberOfRounds,
    gameId,
  } = React.useContext<IAppContext>(AppContext);
  const round = rounds[selectedRound];

  const handlePreviousRoundButtonClicked = () => {
    selectRound(selectedRound - 1);
  };

  const handleNextRoundbuttonClicked = () => {
    selectRound(selectedRound + 1);
  };

  const handleCompleteAndGoToNextRoundButtonClicked = async () => {
    selectRound(selectedRound + 1);
    completeRound(selectedRound, 0);
    await continueGame(gameId!, round.options[0]);
  };

  const handleCompleteGameButtonClicked = async () => {
    navigate("/career-game/results");
    await continueGame(gameId!, round.options[0]);
  };

  const isRoundCompleted = round?.optionSelected !== null;
  const isLastRound = selectedRound === numberOfRounds - 1;

  return (
    <div>
      <H1>Game Screen</H1>
      <p>This is the game screen</p>

      <GameProgress />

      <pre style={{ whiteSpace: "pre-wrap" }}>
        <code>{JSON.stringify(round, null, 4)}</code>
      </pre>

      <ButtonBar>
        {selectedRound !== 0 && (
          <DefaultButton
            onClick={handlePreviousRoundButtonClicked}
            title="Go to previous round"
            label="Previous round"
          />
        )}

        {isLastRound && (
          <PrimaryButton
            onClick={handleCompleteGameButtonClicked}
            title="Complete game"
            label="Complete game"
          />
        )}

        {!isRoundCompleted && !isLastRound && (
          <PrimaryButton
            onClick={handleCompleteAndGoToNextRoundButtonClicked}
            title="Go to next round"
            label="Select random option and move on for testing"
          />
        )}

        {isRoundCompleted && (
          <DefaultButton
            onClick={handleNextRoundbuttonClicked}
            title="Go to next round"
            label="Next round"
          />
        )}
      </ButtonBar>

      <Spinner show={isLoading} />
    </div>
  );
}
