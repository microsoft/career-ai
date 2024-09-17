import React from "react";
import { IAppContext } from "../../models/IAppContext";
import { AppContext } from "../../context/AppContext";
import { PrimaryButton } from "../../components/Form/Button";
import { Http } from "../../services/Http";
import { useNavigate } from "react-router-dom";
import { H1 } from "../../components/Typography";
import { TextField } from "../../components/Form/TextField/TextField";
import { ButtonBar } from "../../components/Form/Button/ButtonBar";
import { usePageTracking } from "../../hooks/usePageTracking";
import { Spinner } from "../../components/Spinner";
import { Dropdown } from "../../components/Form/Dropdown";
import { GameRound } from "../../models/GameRound";

export function StartScreen(): React.ReactElement {
  usePageTracking("StartScreen");

  const [isSaving, setSaving] = React.useState<boolean>(false);
  const { addRound, numberOfRounds, setNumberOfRounds } =
    React.useContext<IAppContext>(AppContext);
  const [title, setTitle] = React.useState<string>("");
  const navigate = useNavigate();

  const handleStartButtonClicked = async (): Promise<void> => {
    setSaving(true);
    try {
      const response = await Http.getInstance().post<GameRound>(
        "/api/career-game/start",
        {
          careerChoice: title,
        }
      );

      if (response.ok && response.data) {
        addRound({
          ...response.data,
          optionSeleted: null,
        });
        navigate(`/career-game/${encodeURIComponent(title)}`);
      }
    } catch (error) {
      console.error("Failed to start game", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="start-screen-center">
      <img
        src="groundhog.png"
        alt="Groundhog character"
        className="groundhog-start"
      />
      <H1>Welcome!</H1>
      <H1>What career would you like to explore?</H1>

      <TextField
        label="Career"
        name="title"
        onChange={(name: string, value: string) => {
          setTitle(value);
        }}
        value={title}
        placeholder="Enter a career name"
      />

      <Dropdown
        label="Number of rounds"
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
          label="Start game"
        />
      </ButtonBar>

      <Spinner show={isSaving} />
    </div>
  );
}
