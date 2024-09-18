import React, { useState, useEffect } from "react";
import { H1 } from "../../components/Typography";
import { AppContext } from "../../context/AppContext";
import { usePageTracking } from "../../hooks/usePageTracking";
import { IAppContext } from "../../models/IAppContext";
import Confetti from 'react-confetti';

export function ResultScreen(): React.ReactElement {
  usePageTracking("ResultScreen");
  const { finalMessage, userName } = React.useContext<IAppContext>(AppContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <H1>Great work, {userName}!</H1>
      {finalMessage}
      <Confetti
        width={windowWidth}
        height={windowHeight}
      />
    </div>
  );
}