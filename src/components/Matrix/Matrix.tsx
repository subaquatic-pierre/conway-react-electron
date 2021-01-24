import React from "react";
import { GameContext } from "../../App";
import { Matrix as MatrixModel } from "../../models/Matrix";
import { Tile } from "../Tile";
import { Row } from "./Row";
import "./style.scss";

export const Matrix: React.FC = () => {
  const matrixModel = new MatrixModel();

  const matrix = matrixModel.getMatrix();

  return (
    <div>
      <h1>Matrix</h1>
      <div className="matrix">
        {matrix.map((tileRow) => (
          <Row row={tileRow} />
        ))}
      </div>
    </div>
  );
};
