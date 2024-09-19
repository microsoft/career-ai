import React from "react";
import {usePreviousValue} from "./usePreviousValue";

export function useFocusMainOnLoadComplete(loading: boolean) {
  const prevLoadingValue = usePreviousValue(loading)

  React.useEffect(() => {
    if (!loading && !!prevLoadingValue) {
      document.querySelector("h1")?.focus();
    }
  }, [loading, prevLoadingValue]);
}
