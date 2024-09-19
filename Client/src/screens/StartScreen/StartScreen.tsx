import React from "react";
import { ErrorAlert } from "../../components/Form/ErrorAlert";
import { useCareerGame } from "../../hooks/useCareerGame";
import { IAppContext } from "../../models/IAppContext";
import { AppContext } from "../../context/AppContext";
import { PrimaryButton } from "../../components/Form/Button";
import { useNavigate } from "react-router-dom";
import { H1 } from "../../components/Typography";
import { TextField } from "../../components/Form/TextField/TextField";
import { ButtonBar } from "../../components/Form/Button/ButtonBar";
import { usePageTracking } from "../../hooks/usePageTracking";
import { Spinner } from "../../components/Spinner";
import { Dropdown } from "../../components/Form/Dropdown";

export function StartScreen(): React.ReactElement {
  usePageTracking("StartScreen");
  const { startGame, isLoading } = useCareerGame();
  const {
    numberOfRounds,
    setNumberOfRounds,
    resetGame,
    userName,
    setUserName,
  } = React.useContext<IAppContext>(AppContext);
  const [title, setTitle] = React.useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const handleStartButtonClicked = async (): Promise<void> => {
    setError(null);
    if (!title || !userName) {
        setError("Name and career are required.");
        return;
    }


    try {
      await startGame(title);
      navigate(`/career-game`);
    } catch {
      setError("Please try again with a valid career choice.");
    }
  };

  React.useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="start-screen-center">
      <img
        src="/CC_Logo.png"
        alt="Career Craft Logo"
        className="careercraft-logo-start"
      />
      <H1>Welcome to CareerCraft!</H1>

      <ErrorAlert message={error} />

      <TextField
        label="What should we call you?"
        name="userName"
        onChange={(name: string, value: string) => {
          setUserName(value);
        }}
        value={userName}
        placeholder="Enter your name"
      />

      <TextField
        label="What career are you interested in?"
        name="title"
        onChange={(name: string, value: string) => {
          setTitle(value);
        }}
        value={title}
        placeholder="Enter a career name"
      />

      <Dropdown
        label="How many rounds would you like to play?"
        name="rounds"
        options={[
          {
            label: "1 round",
            value: 1,
          },
          {
            label: "2 rounds",
            value: 2,
          },
          {
            label: "3 rounds",
            value: 3,
          },
          {
            label: "4 rounds",
            value: 4,
          },
          {
            label: "5 rounds",
            value: 5,
          },
          {
            label: "10 rounds",
            value: 10,
          },
        ]}
        onChange={(name: string, value: string) => {
          setNumberOfRounds(parseInt(value));
        }}
        value={numberOfRounds}
      />

      <ButtonBar>
        <PrimaryButton
          onClick={handleStartButtonClicked}
          title="Start game"
          label="Let's go!"
        />
      </ButtonBar>

      <Spinner show={isLoading} />
    </div>
  );
}
