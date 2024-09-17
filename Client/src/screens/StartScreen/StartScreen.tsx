import React from "react";
import { IAppContext } from "../../models/IAppContext";
import { AppContext } from "../../context/AppContext";
import { PrimaryButton } from "../../components/Form/Button";
import { Http } from "../../services/Http";
import { GameScenarios } from "../../models/GameResponse";
import { useNavigate } from "react-router-dom";
import { H1 } from "../../components/Typography";
import { TextField } from "../../components/Form/TextField/TextField";
import { ButtonBar } from "../../components/Form/Button/ButtonBar";
import { usePageTracking } from "../../hooks/usePageTracking";
import { Spinner } from "../../components/Spinner";

export function StartScreen(): React.ReactElement {
  usePageTracking("StartScreen");
  const [isSaving, setSaving] = React.useState<boolean>(false);
  const { setGameScenarios } = React.useContext<IAppContext>(AppContext);
  const [title, setTitle] = React.useState<string>("");
  const navigate = useNavigate();

  const handleStartButtonClicked = async () => {
    setSaving(true);
    const response = await Http.getInstance().post<GameScenarios>(
      "/api/career-game/start",
      {
        careerChoice: title,
      }
    );

    if (response.ok) {
      setGameScenarios(response.data);
      navigate(`/career-game/something`);
    }

    setSaving(false);
  };
  return (
    <div className="start-screen-center">
      <H1>Start Screen</H1>

      <TextField
        label="Title"
        name="title"
        onChange={(name, title: string) => {
          setTitle(title);
        }}
        value={title}
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
