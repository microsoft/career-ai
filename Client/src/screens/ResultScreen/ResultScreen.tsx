import React from "react";
import { usePageTracking } from "../../hooks/usePageTracking";

export function ResultScreen(): React.ReactElement {
  usePageTracking("ResultScreen");

  return (
    <div>
      <h1>Result Screen</h1>
      <p>This is the result screen</p>
    </div>
  );
}
