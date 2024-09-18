import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Form/Button";
import { ButtonBar } from "../../components/Form/Button/ButtonBar";
import { DefaultButton } from "../../components/Form/Button/DefaultButton";
import { Spinner } from "../../components/Spinner";
import { H1 } from "../../components/Typography";
import { H2 } from "../../components/Typography";
import { useCareerGame } from "../../hooks/useCareerGame";
import { IAppContext } from "../../models/IAppContext";
import { AppContext } from "../../context/AppContext";
import { usePageTracking } from "../../hooks/usePageTracking";
import { GameProgress } from "../../components/GameProgress";

const cleanOption = (option: string): string => {
  let cleaned = option.trim();
  cleaned = cleaned.replace(/[-•●○•—]/g, '');
  cleaned = cleaned.replace(/^\d+\.?\s?|^\w+\:?\s?/i, '');
  return cleaned.trim();
};

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

  React.useEffect(() => {
    if (!isLoading && !gameId) {
      navigate("/");
    }
  }, [gameId, navigate, isLoading]);

  const handleOptionSelected = async (option: string) => {
    const optionIndex = round.options.indexOf(option);
    const cleanedOption = cleanOption(option);

    if (optionIndex !== -1) {
      await completeRound(selectedRound, optionIndex);
      await continueGame(gameId!, cleanedOption);
      if (selectedRound < numberOfRounds - 1) {
        selectRound(selectedRound + 1);
      } else {
        navigate("/career-game/results");
      }
    } else {
      console.error("Option not found in round options");
    }
  };

  const handlePreviousRoundButtonClicked = () => {
    selectRound(selectedRound - 1);
  };

  const handleNextRoundButtonClicked = () => {
    selectRound(selectedRound + 1);
  };

  const handleCompleteGameButtonClicked = async () => {
    const firstOption = round.options[0];
    const cleanedOption = cleanOption(firstOption);
    await completeRound(selectedRound, 0);
    await continueGame(gameId!, cleanedOption);
    navigate("/career-game/results");
  };

  const isRoundCompleted = round?.optionSelected !== null;
  const isLastRound = selectedRound === numberOfRounds - 1;

  return (
    <div className="game-screen-margin-top">
      <H1>Round {selectedRound + 1}</H1>

      <GameProgress />

      <div  className="game-screen-center">
        <div>
          <H2>Scenario</H2>
          <p>{round.scenario}</p>
        </div>

        <div className="game-screen-content-margin">
          <H2>Options</H2>
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

            {!isLastRound && round.options.map((option, index) => (
              <PrimaryButton
                key={index}
                onClick={() => handleOptionSelected(option)}
                title={`Select ${option}`}
                label={option}
                disabled={isRoundCompleted}
              />
            ))}

            {isRoundCompleted && (
              <DefaultButton
                onClick={handleNextRoundButtonClicked}
                title="Go to next round"
                label="Next round"
              />
            )}
          </ButtonBar>
        </div>
      </div>

      <Spinner show={isLoading} />
    </div>
  );
}
