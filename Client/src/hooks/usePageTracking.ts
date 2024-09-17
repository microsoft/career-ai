import React from "react";
import { Telemetry } from "../services/Telemetry";

export function usePageTracking(pageName: string) {
  React.useEffect(() => {
    const telemetry = Telemetry.getInstance();
    telemetry.startTrackPage(pageName);

    return () => {
      telemetry.stopTrackPage(pageName);
    };
  }, [pageName]);
}
