import React from "react";
import { IAppContext } from "../models/IAppContext";
import { useScreenRouting } from "../hooks/useScreenRouting";

// @ts-ignore
export const AppContext = React.createContext<IAppContext>({});

export function AppContextProvider(
  props: React.PropsWithChildren<{}>
): React.ReactElement {
  const { currentScreen, go } = useScreenRouting();

  return (
    <AppContext.Provider value={{ currentScreen, go }}>
      {props.children}
    </AppContext.Provider>
  );
}
