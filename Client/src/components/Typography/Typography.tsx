import React, { PropsWithChildren } from "react";
import "./Typography.scss";

type TypographyProps = {};

export function H1(
  props: PropsWithChildren<TypographyProps>
): React.ReactElement {
  return <h1 className="h1" id="h1" tabIndex={-1}>{props.children}</h1>;
}

export function H2(
  props: PropsWithChildren<TypographyProps>
): React.ReactElement {
  return <h2 className="h2">{props.children}</h2>;
}

export function UL(
  props: PropsWithChildren<TypographyProps>
): React.ReactElement {
  return <ul className="ul">{props.children}</ul>;
}

export function LI(
  props: PropsWithChildren<TypographyProps>
): React.ReactElement {
  return <li className="li">{props.children}</li>;
}