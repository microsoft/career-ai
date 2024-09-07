import "./App.scss";
import React from "react";
import { Layout } from "./components/Layout";
import { AppContext } from "./context/AppContext";
import { ScreenType } from "./models/ScreenType";
import { GameScreen } from "./screens/GameScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { StartScreen } from "./screens/StartScreen";
import { IAppContext } from "./models/IAppContext";

function App() {
  const { currentScreen } = React.useContext<IAppContext>(AppContext);

  return (
    <Layout>
      {currentScreen === ScreenType.StartScreen && <StartScreen />}
      {currentScreen === ScreenType.GameScreen && <GameScreen />}
      {currentScreen === ScreenType.ResultScreen && <ResultScreen />}
    </Layout>
  );
}

export default App;
