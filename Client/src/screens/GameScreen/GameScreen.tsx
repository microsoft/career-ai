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
  cleaned = cleaned.replace(/^\d+\.?\s?|^\w+:?\s?/i, '');
  return cleaned.trim();
};

export function GameScreen(): React.ReactElement {
  usePageTracking("GameScreen");
  const navigate = useNavigate();
  const { continueGame, completeGame, isLoading } = useCareerGame();
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
      completeRound(selectedRound, optionIndex);
      if (selectedRound < numberOfRounds - 1) {
        await continueGame(gameId!, cleanedOption);
        selectRound(selectedRound + 1);
      } else {
        await completeGame(gameId!, cleanedOption);
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

  const isRoundCompleted = round?.optionSelected !== null;

  return (
    <div className="game-screen-margin-top">
      <H1>Round {selectedRound + 1}</H1>

      <GameProgress />
      <ButtonBar>
        {selectedRound !== 0 && (
          <DefaultButton
            onClick={handlePreviousRoundButtonClicked}
            title="Go to previous round"
            label="Previous round"
          />
        )}

        {isRoundCompleted && (
          <DefaultButton
            onClick={handleNextRoundButtonClicked}
            title="Go to next round"
            label="Next round"
          />
        )}
      </ButtonBar>

      <div className="game-screen-margin-top">
        <div>
          <H2>Outcome</H2>
          <p>{round.outcome}</p>
        </div>

        <div className="game-screen-content-margin">
          <H2>Scenario</H2>
          <p>{round.scenario}</p>
        </div>

        <div className="game-screen-content-margin">
          <H2>Options</H2>
          <ButtonBar>
            {round.options.map((option, index) => (
              <PrimaryButton
                key={index}
                onClick={() => handleOptionSelected(option)}
                title={`Select ${option}`}
                label={option}
                disabled={isRoundCompleted}
              />
            ))}
          </ButtonBar>
        </div>
      </div>

      <Spinner show={isLoading} />
    </div>
  );
}
