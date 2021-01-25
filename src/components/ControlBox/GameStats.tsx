import React from "react";
import { Context } from "../../App";

export const GameStats: React.FC = () => {
  const { state } = React.useContext(Context);

  return (
    <div>
      <h2>Game Stats</h2>
      <hr />
      <div className="control-panel">
        <ul>
          <li>Number of Loops: {state.gameState.loopCount}</li>
          <li>Number of Bots: {state.botState.numberOfBots}</li>
          <li>
            Random Walk activated:{" "}
            {state.botState.randomWalk ? "True" : "False"}
          </li>
          <li>Number cleaned Tiles: {state.gameState.cleanedCellCount}</li>
        </ul>
      </div>
    </div>
  );
};
