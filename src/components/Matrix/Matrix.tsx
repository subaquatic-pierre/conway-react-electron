import React from "react";
import { Context } from "../../App";
import { BotManager } from "../BotManager";
import { Row } from "./Row";
import "./style.scss";

export const Matrix: React.FC = () => {
  const { state } = React.useContext(Context);

  const matrix = state.gameState.matrix;

  return (
    <div>
      <div id="map" className="matrix">
        {matrix.map((cellRow, index) => (
          <Row key={index} row={cellRow} />
        ))}
        <BotManager />
      </div>
    </div>
  );
};
