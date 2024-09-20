import "./App.scss";
import React from "react";
import { Layout } from "./components/Layout";
import { StartScreen } from "./screens/StartScreen";
import { Route, Routes } from "react-router-dom";
import { GameScreen } from "./screens/GameScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { AboutScreen } from "./screens/AboutScreen/AboutScreen";
import { PartnersScreen } from "./screens/PartnersScreen/PartnersScreen";
import { ContactUsScreen } from "./screens/ContactUsScreen/ContactUsScreen";
import { HowToPlayScreen } from "./screens/HowToPlayScreen";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/career-game" element={<GameScreen />} />
        <Route path="/howToPlay" element={<HowToPlayScreen />} />
        <Route path="/career-game/results" element={<ResultScreen />} />
        {/* <Route path="/admin" element={<AdminScreen />} /> */}
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/partners" element={<PartnersScreen />} />
        <Route path="/contact" element={<ContactUsScreen />} />
      </Routes>
    </Layout>
  );
}

export default App;
