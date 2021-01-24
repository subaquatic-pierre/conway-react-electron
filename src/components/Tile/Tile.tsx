import React from "react";
import "./style.scss";

interface ITileProps {
  width: number;
  height: number;
  text: string;
}

export const Tile: React.FC<ITileProps> = ({
  width,
  height,
  text,
}: ITileProps) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "pink",
        border: "solid 1px black",
      }}
    >
      {text}
    </div>
  );
};
