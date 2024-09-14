import React from "react";
import "./button-bar.scss";

export function ButtonBar(
  props: React.PropsWithChildren<{}>
): React.ReactElement {
  return <div className="button-bar">{props.children}</div>;
}
