import React from "react";
import { BotControls } from "./BotControls";
import { GameControls } from "./GameControls";
import { GameStats } from "./GameStats";
import "./style.scss";

export const ControlBox: React.FC = ({ children }) => {
  return (
    <div className="control-box-container">
      <GameStats />
      <BotControls />
      <GameControls />
    </div>
  );
};
