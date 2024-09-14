import React, { PropsWithChildren } from "react";
import "./Typography.scss";

type TypographyProps = {};

export function H1(
  props: PropsWithChildren<TypographyProps>
): React.ReactElement {
  return <h1 className="h1">{props.children}</h1>;
}
