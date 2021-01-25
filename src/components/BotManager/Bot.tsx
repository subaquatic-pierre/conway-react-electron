import React from "react";
import { BotContext } from "../../App";
import { IDimensions } from "../../models/Bot";
import { ILocation } from "../../context/MapManager";
import { botActionTypes } from "../../context/actionTypes";

export interface IBotProps {
  location: ILocation;
  name: string;
  selected: boolean;
  id: number;
  dimensions: IDimensions;
}

const styles = (vars: any): any => {
  let bgColor: string;
  if (vars.selected === true) {
    bgColor = "red";
  } else {
    bgColor = "blue";
  }
  return {
    width: `${vars.width}px`,
    height: `${vars.height}px`,
    borderRadius: "50%",
    transition: "ease-in-out",
    boxShadow: "0.1rem 0.1rem 0.5rem gray",
    backgroundColor: bgColor,
    position: "absolute",
    top: `${vars.yPos}px`,
    left: `${vars.xPos}px`,
  };
};

export const Bot: React.FC<IBotProps> = ({
  name,
  selected,
  id,
  location: { xPos, yPos },
  dimensions: { height, width },
}: IBotProps) => {
  const { botDispatch } = React.useContext(BotContext);

  const handleClick = (botID: number) => {
    botDispatch({
      type: botActionTypes.SELECT_BOT,
      data: { id: botID },
    });
  };

  return (
    <div
      onClick={() => handleClick(id)}
      style={styles({ xPos, yPos, selected, width, height })}
    ></div>
  );
};
