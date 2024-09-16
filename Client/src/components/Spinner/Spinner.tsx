import React from "react";
import "./Spinner.scss";

export type SpinnerProps = {
  show: boolean;
};

export function Spinner(props: SpinnerProps): React.ReactElement {
  const { show } = props;
  if (!show) return <></>;

  return (
    <div className="spinner-full-screen-root">
      <div className="spinner-root" />
    </div>
  );
}
