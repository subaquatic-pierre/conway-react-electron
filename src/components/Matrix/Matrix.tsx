import React from "react";
import { BotContext } from "../../App";
import { Matrix as MatrixModel } from "../../models/Matrix";
import { BotManager } from "../BotManager";
import { Row } from "./Row";
import "./style.scss";

export const Matrix: React.FC = ({ children }) => {
  const { botState } = React.useContext(BotContext);
  const matrixModel = new MatrixModel(botState.mapDimension);

  const matrix = matrixModel.getMatrix();

  return (
    <div>
      <h1>Matrix</h1>
      <div className="matrix">
        {matrix.map((tileRow, index) => (
          <Row key={index} row={tileRow} />
        ))}
        <BotManager />
      </div>
    </div>
  );
};
