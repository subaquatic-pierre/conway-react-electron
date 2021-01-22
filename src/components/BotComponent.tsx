import React from "react";
import { BotContext } from "../App";
import { IBotLocation } from "../context/Bot";
import { botActionTypes } from "../context/actionTypes";

export interface IBotProps {
  location: IBotLocation;
  name: string;
  selected: boolean;
  id: number;
}

const styles = (vars: any): any => {
  let bgColor: string;
  if (vars.selected === true) {
    bgColor = "red";
  } else {
    bgColor = "blue";
  }
  return {
    width: "50px",
    height: "50px",
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
}: IBotProps) => {
  const { botState, botDispatch } = React.useContext(BotContext);

  const handleClick = (botID: number) => {
    console.log(botState);
    botDispatch({
      type: botActionTypes.SELECT_BOT,
      data: { id: botID },
    });
  };

  return (
    <div
      onClick={() => handleClick(id)}
      style={styles({ xPos, yPos, selected })}
    >
      ID: {id}, Name: {name}
    </div>
  );
};
