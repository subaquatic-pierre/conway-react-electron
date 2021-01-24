import React from "react";

import "./style.scss";

interface ICellProps {
  width: number;
  height: number;
  text: string;
}

export const Cell: React.FC<ICellProps> = ({
  width,
  height,
  text,
}: ICellProps) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "pink",
        border: "1px solid black",
        margin: "-1px",
      }}
    ></div>
  );
};
