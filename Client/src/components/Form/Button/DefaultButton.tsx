import React from "react";
import "./button.scss";
import { ButtonProps } from "./button.types";
import { BaseButton } from "./BaseButton";

export function DefaultButton(props: ButtonProps): React.ReactElement {
  return <BaseButton {...props} classNames="default-button button" />;
}
