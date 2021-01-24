import React from "react";
import { BotContext } from "../../App";
import { MapManager } from "../../models/MapManager";
import { Matrix as MatrixModel } from "../../models/Matrix";
import { BotManager } from "../BotManager";
import { Row } from "./Row";
import "./style.scss";

const mapManager = new MapManager();
const matrixModel = new MatrixModel(mapManager.getMapDimensions());

const matrix = matrixModel.getMatrix();

export const Matrix: React.FC = ({ children }) => {
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
