import React, { useState, useEffect, useRef } from "react";
import { H1 } from "../../components/Typography";
import { H2 } from "../../components/Typography";
import { UL } from "../../components/Typography";
import { LI } from "../../components/Typography";
import { AppContext } from "../../context/AppContext";
import { usePageTracking } from "../../hooks/usePageTracking";
import { IAppContext } from "../../models/IAppContext";
import { ConfettiComponent } from "../../components/Confetti/Confetti";
import { ButtonBar } from "../../components/Form/Button/ButtonBar";
import { PrimaryButton } from "../../components/Form/Button";

export function ResultScreen(): React.ReactElement {
  usePageTracking("ResultScreen");
  const { summary, lessons, userName, careerImageURL } =
    React.useContext<IAppContext>(AppContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiOpacity, setConfettiOpacity] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const careerImageUrl = careerImageURL ?? undefined;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Set timer to start fading confetti after 6 seconds
    const fadeTimer = setTimeout(() => {
      setShowConfetti(false);
      setConfettiOpacity(0); // Start fading out
    }, 15000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(fadeTimer);
    };
  }, []);

  const handleDownloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const certificateImg = new Image();
    certificateImg.crossOrigin = "anonymous";
    certificateImg.src = "/career_craft_certificate_with_image.png";
    const careerImg = new Image();
    careerImg.crossOrigin = "anonymous";
    certificateImg.onload = () => {
      ctx.drawImage(certificateImg, 0, 0);
      if (careerImageURL) {
        careerImg.src = careerImageURL;
      }
      careerImg.onload = () => {
        ctx.drawImage(careerImg, 276, 225, 289, 165);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "custom_certificate.png";
        link.click();
      };
      careerImg.onerror = () => {
        console.error("Failed to load career image");
      };
    };
    certificateImg.onerror = () => {
      console.error("Failed to load certificate image");
    };
  };

  return (
    <div>
      <div className="start-screen-center">
        <img
          src="/AwardRibbon.png"
          alt="Award Ribbon"
          className="careercraft-award-logo"
        />
        <H1>Great work, {userName}!</H1>
        <H2>{summary}</H2>
        <img
          src={careerImageUrl}
          alt="Career"
          className="career-image"
        />
        <div className="game-screen-margin-top">
          <UL>
            <H2>Here is a recap of lessons learned</H2>
            {lessons.map((lesson, index) => (
              <LI key={index}>{lesson}</LI>
            ))}
          </UL>
        </div>

        <button
          onClick={handleDownloadCertificate}
          className="game-screen-margin-top"
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
      <canvas ref={canvasRef} width={842} height={595} style={{ display: "none" }}></canvas>
    </div>
  );
}
