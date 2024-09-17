import React from "react";
import "./SkipToMain.scss";

export function SkipToMain(): React.ReactElement {
  const handleSkipToMainClicked = () => {
    document.getElementById("main")?.focus();
  };

  return (
    <button onClick={handleSkipToMainClicked} className="skip-to-main-root">
      Skip to main content
    </button>
  );
}
