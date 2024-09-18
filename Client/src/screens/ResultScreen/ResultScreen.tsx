import React from "react";
import { H1 } from "../../components/Typography";
import { AppContext } from "../../context/AppContext";
import { usePageTracking } from "../../hooks/usePageTracking";
import { IAppContext } from "../../models/IAppContext";

export function ResultScreen(): React.ReactElement {
  usePageTracking("ResultScreen");
  const { finalMessage, userName } = React.useContext<IAppContext>(AppContext);

  return (
    <div>
      <H1>Great work, {userName}!</H1>

      {finalMessage}
    </div>
  );
}
