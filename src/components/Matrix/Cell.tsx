import React from "react";
import { GameContext } from "../../App";

import "./style.scss";

interface ICellProps {
  text: string;
}

export const Cell: React.FC<ICellProps> = ({ text }: ICellProps) => {
  const { gameState } = React.useContext(GameContext);
  return (
    <div
      style={{
        width: `${gameState.cellDimensions.width}px`,
        height: `${gameState.cellDimensions.height}px`,
        backgroundColor: "pink",
        border: "1px solid black",
        margin: "-1px",
      }}
    ></div>
  );
};
