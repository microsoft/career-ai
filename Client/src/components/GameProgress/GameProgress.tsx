import React from "react";
import { IAppContext } from "../../models/IAppContext";
import { AppContext } from "../../context/AppContext";
import "./GameProgress.scss";

export function GameProgress(): React.ReactElement {
  const { rounds, selectedRound, numberOfRounds } =
    React.useContext<IAppContext>(AppContext);

  const completedRounds = rounds.filter(
    (round) => round.optionSeleted !== null
  ).length;

  const progressPercentage = (completedRounds / numberOfRounds) * 100;

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${progressPercentage}%` }}
      ></div>
      <span className="progress-bar-text">
        Round {selectedRound + 1} of {numberOfRounds}
      </span>
    </div>
  );
}
