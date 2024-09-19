import React, { useState, useEffect } from "react";
import { H1 } from "../../components/Typography";
import { H2 } from "../../components/Typography";
import { AppContext } from "../../context/AppContext";
import { usePageTracking } from "../../hooks/usePageTracking";
import { IAppContext } from "../../models/IAppContext";
import { ConfettiComponent } from "../../components/Confetti/Confetti";
import { ButtonBar } from "../../components/Form/Button/ButtonBar";
import { PrimaryButton } from "../../components/Form/Button";

export function ResultScreen(): React.ReactElement {
  usePageTracking("ResultScreen");
  const { finalMessage, userName } = React.useContext<IAppContext>(AppContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiOpacity, setConfettiOpacity] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Set timer to start fading confetti after 6 seconds
    const fadeTimer = setTimeout(() => {
      setShowConfetti(false);
      setConfettiOpacity(0); // Start fading out
    }, 15000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <div className="start-screen-center">
      <div className="start-screen-center">
        <img
          src="/AwardRibbon.png"
          alt="Award Ribbon"
          className="careercraft-award-logo"
        />
        <H1>Great work, {userName}!</H1>
        <H2>{finalMessage}</H2>
        <button
          onClick={() => {
            const link = document.createElement('a');
            link.href = '/career_craft_certificate.png';
            link.download = 'career_craft_certificate.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="download-button"
        >
          Download Certificate
        </button>
        <ButtonBar>
          <PrimaryButton
            onClick={() => {
              window.location.href = "/";
            }}
            title="Start game"
            label="Explore another career!"
          />
        </ButtonBar>
      </div>

      {showConfetti && (
        <div style={{ opacity: confettiOpacity }} className="confetti-fade">
          <ConfettiComponent
            width={windowWidth}
            height={windowHeight}
            run={showConfetti}
          />
        </div>
      )}
    </div>
  );
}

