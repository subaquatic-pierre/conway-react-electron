import React from "react";
import { Context } from "../../App";

import "./style.scss";

interface ICellProps {
  text: string;
  cleaned: boolean;
}

export const Cell: React.FC<ICellProps> = ({ text, cleaned }: ICellProps) => {
  const { state } = React.useContext(Context);
  return (
    <div
      style={{
        width: `${state.gameState.cellDimensions.width}px`,
        height: `${state.gameState.cellDimensions.height}px`,
        backgroundColor: cleaned ? "red" : "pink",
        border: "1px solid black",
        margin: "-1px",
      }}
    ></div>
  );
};
