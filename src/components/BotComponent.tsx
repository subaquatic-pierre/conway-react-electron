import React from "react";
import { IBotLocation } from "../classes/Bot";

export interface IBotProps {
  location: IBotLocation;
  name: string;
}

const styles = (vars: any): any => {
  return {
    width: "50px",
    height: "50px",
    backgroundColor: "red",
    position: "absolute",
    top: `${vars.yPos}px`,
    left: `${vars.xPos}px`,
  };
};

export const Bot: React.FC<IBotProps> = ({
  name,
  location: { xPos, yPos },
}: IBotProps) => {
  return <div style={styles({ xPos, yPos })}>{name}</div>;
};
