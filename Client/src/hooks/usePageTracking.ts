import React from "react";
import { Telemetry } from "../services/Telemetry";
import { IAppContext } from "../models/IAppContext";
import { AppContext } from "../context/AppContext";

export function usePageTracking() {
  // const { currentScreen } = React.useContext<IAppContext>(AppContext);

  React.useEffect(() => {
    const telemetry = Telemetry.getInstance();
    // telemetry.trackPageView(window.location.pathname);

    return () => {
      //   telemetry.stopTrackPageView(window.location.pathname);
    };
  }, []);
}
