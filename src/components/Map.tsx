import React from "react";
import { BotManager } from "./BotManager";
import { GameContext } from "../App";

export const Map: React.FC = () => {
  const { gameState } = React.useContext(GameContext);

  return (
    <div
      style={{
        height: "500px",
        width: "500px",
        position: "relative",
      }}
    >
      <h1>Map</h1>
      <hr />
      <p>Loop number: {gameState.loopCount}</p>
      <BotManager />
    </div>
  );
};
