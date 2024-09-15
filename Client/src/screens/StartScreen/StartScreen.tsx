import React from "react";
import { IAppContext } from "../../models/IAppContext";
import { AppContext } from "../../context/AppContext";
import { PrimaryButton } from "../../components/Form/Button";
import { Http } from "../../services/Http";
import { GameScenarios } from "../../models/GameResponse";
import { useNavigate } from "react-router-dom";

export function StartScreen(): React.ReactElement {
  const { setGameScenarios } = React.useContext<IAppContext>(AppContext);
  const [title, setTitle] = React.useState<string>("");
  const navigate = useNavigate();

  const handleStartButtonClicked = async () => {
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
  };

  return (
    <div>
      <h1>Start Screen</h1>
      <p>This is the start screen</p>

      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />

      <PrimaryButton onClick={handleStartButtonClicked} title="Start game">
        Start Game
      </PrimaryButton>
    </div>
  );
}
