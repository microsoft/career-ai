import React, { useEffect } from "react";
import "./Spinner.scss";

export type SpinnerProps = {
  show: boolean;
};

export function Spinner(props: SpinnerProps): React.ReactElement {
  const { show } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [show]);

  if (!show) return <></>;

  return (
    <div className="spinner-full-screen-root">
      <div className="spinner-root" ref={ref} tabIndex={-1}>
        <div className="spinner-accessibility-text">Loading...</div>
      </div>
    </div>
  );
}
