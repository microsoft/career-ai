import React from "react";
import "./button.scss";
import { ButtonProps } from "./button.types";

export function PrimaryButton(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const { onClick, children } = props;

  return (
    <button className="primary-button button" onClick={onClick}>
      {children}
    </button>
  );
}
