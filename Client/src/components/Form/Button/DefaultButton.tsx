import React from "react";
import "./button.scss";
import { ButtonProps } from "./button.types";

export function DefaultButton(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const { onClick, children } = props;

  return (
    <button className="default-button" onClick={onClick}>
      {children}
    </button>
  );
}
