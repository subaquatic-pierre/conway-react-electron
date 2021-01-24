import React from "react";
import { Bot } from "../../models/Bot";

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
        width: `${Bot.dimensions.width}px`,
        height: `${Bot.dimensions.height}px`,
        backgroundColor: "pink",
      }}
    ></div>
  );
};
