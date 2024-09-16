import React from "react";
import "./button.scss";
import { ButtonProps } from "./button.types";
import { Telemetry } from "../../../services/Telemetry";

export function BaseButton(props: ButtonProps): React.ReactElement {
  const { onClick, classNames } = props;

  const handleButtonClicked = () => {
    Telemetry.getInstance().event("ButtonClicked", {
      buttonName: props.label,
    });

    onClick();
  };

  return (
    <button className={classNames} onClick={handleButtonClicked}>
      {props.label}
    </button>
  );
}
