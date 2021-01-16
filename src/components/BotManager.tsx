import React from "react";
import { BotContext } from "../App";
import { botActionTypes } from "../context/actionTypes";
import { Bot as BotComponent } from "./BotComponent";

export const BotManager: React.FC = () => {
  const { botState, botDispatch } = React.useContext(BotContext);

  window.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "ArrowRight":
        botDispatch({
          type: botActionTypes.MOVE_BOT,
          data: { direction: "right", distance: 10 },
        });
        break;

      case "ArrowLeft":
        botDispatch({
          type: botActionTypes.MOVE_BOT,
          data: { direction: "left", distance: 10 },
        });
        break;

      case "ArrowUp":
        botDispatch({
          type: botActionTypes.MOVE_BOT,
          data: { direction: "up", distance: 10 },
        });
        break;

      case "ArrowDown":
        botDispatch({
          type: botActionTypes.MOVE_BOT,
          data: { direction: "down", distance: 10 },
        });
        break;

      default:
        break;
    }
  });

  return (
    <>
      <h2>Bot manager</h2>
      <hr />
      <div style={{ position: "relative" }}>
        {botState.bots.map((bot: any, i: number) => (
          <BotComponent
            key={i}
            location={bot.getLocation()}
            name={bot.getName()}
          />
        ))}
      </div>
    </>
  );
};
