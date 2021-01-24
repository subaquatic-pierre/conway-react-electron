import React from "react";
import { BotContext } from "../App";
import { botActionTypes } from "../context/actionTypes";
import { Bot as BotComponent } from "./BotComponent";

export const BotManager: React.FC = () => {
  const { botState, botDispatch } = React.useContext(BotContext);

  React.useEffect(() => {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowRight":
          botDispatch({
            type: botActionTypes.MOVE_BOT,
            data: { direction: 0, distance: 10 },
          });
          break;

        case "ArrowLeft":
          botDispatch({
            type: botActionTypes.MOVE_BOT,
            data: { direction: 180, distance: 10 },
          });
          break;

        case "ArrowUp":
          botDispatch({
            type: botActionTypes.MOVE_BOT,
            data: { direction: 270, distance: 10 },
          });
          break;

        case "ArrowDown":
          botDispatch({
            type: botActionTypes.MOVE_BOT,
            data: { direction: 90, distance: 10 },
          });
          break;

        default:
          break;
      }
    });
  }, []);

  return (
    <>
      <h2>Bot manager</h2>
      <hr />
      <div
        id="map"
        style={{
          position: "relative",
          width: botState.mapDimension.width,
          height: botState.mapDimension.height,
          backgroundColor: "#d29bd4",
        }}
      >
        {botState.bots.map((bot: any, i: number) => (
          <BotComponent
            key={i}
            location={bot.getLocation()}
            name={bot.getName()}
            selected={bot.isSelected()}
            id={bot.getID()}
          />
        ))}
      </div>
    </>
  );
};
