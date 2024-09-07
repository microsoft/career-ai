import React from "react";
import { ScreenType } from "../models/ScreenType";

// Maybe we will change to something like react-router later if more complex routing is needed
export function useScreenRouting() {
  const [currentScreen, setCurrentSecreen] = React.useState<ScreenType>(
    ScreenType.StartScreen
  );

  const go = (screen: ScreenType) => {
    setCurrentSecreen(screen);
  };

  return { currentScreen, go };
}
