import React from "react";
import "./button.scss";
import { ButtonProps } from "./button.types";
import { BaseButton } from "./BaseButton";

export function PrimaryButton(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  return <BaseButton {...props} classNames="primary-button button" />;
}
