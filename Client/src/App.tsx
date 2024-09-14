import "./App.scss";
import React from "react";
import { Layout } from "./components/Layout";
import { StartScreen } from "./screens/StartScreen";
import { Route, Routes } from "react-router-dom";
import { GameScreen } from "./screens/GameScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { AdminScreen } from "./screens/AdminScreen/AdminScreen";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/career-game/:conversation-id" element={<GameScreen />} />
        <Route
          path="/career-game/:conversation-id/results"
          element={<ResultScreen />}
        />
        <Route path="/admin" element={<AdminScreen />} />
      </Routes>
    </Layout>
  );
}

export default App;
